import { FieldValue } from "firebase-admin/firestore"
import { adminDb } from "@/firebase/admin"

import type { wasteSortPlayer } from "@/types/wasteSort"

export type * from "@/types/wasteSort"

export const MAX_PLAYS_PER_DAY = 3
/** Returns today's date key in YYYY-MM-DD (Asia/Bangkok). */
function todayKey(): string {
  const now = new Date()
  const bkk = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Bangkok" }))
  return bkk.toISOString().slice(0, 10)
}

const wasteSortPlayerCollection = adminDb.collection("wasteSortPlayer").withConverter({
  fromFirestore: (snapshot) => {
    return snapshot.data() as wasteSortPlayer
  },

  toFirestore: (data: wasteSortPlayer) => data,
})

const groupsCollectionRaw = adminDb.collection("groups")

const wasteSortPlayerService = {
  async getById(uid: string): Promise<wasteSortPlayer | null> {
    const doc = await wasteSortPlayerCollection.doc(uid).get()

    const data = doc.data()
    if (!data) return null

    return data
  },

  /** strips `group` (group label) — never expose it in API responses */
  mapToPublic(player: wasteSortPlayer): Omit<wasteSortPlayer, "group"> {
    return {
      name: player.name,
      playCount: player.playCount,
      vesselName: player.vesselName,
      sustainScore: player.sustainScore,
      playsToday: player.playsToday,
      lastPlayDate: player.lastPlayDate,
    }
  },

  /**
   * How many rounds this player has played so far today (Asia/Bangkok).
   * Does not mutate anything — safe to call just to display "2/3 plays used"
   * in the UI.
   */
  async getPlaysToday(uid: string): Promise<number> {
    const player = await this.getById(uid)
    if (!player) return 0

    return player.lastPlayDate === todayKey() ? player.playsToday : 0
  },

  async canPlayToday(uid: string): Promise<boolean> {
    const playsToday = await this.getPlaysToday(uid)
    return playsToday < MAX_PLAYS_PER_DAY
  },

  /**
   * Call this once a round ends. Atomically:
   *  - creates the player doc on first-ever round (no separate create endpoint)
   *  - checks the player hasn't already used today's MAX_PLAYS_PER_DAY rounds
   *    (throws "DAILY_LIMIT_REACHED" if they have)
   *  - bumps the player's lifetime playCount by 1, and their playsToday
   *    counter (resetting it first if it's a new day)
   *  - adds the (floored-at-0) round score to the player's own sustainScore
   *  - adds the same amount to groups/{group}.scoreSources.sustainScore
   *
   * All writes happen in a single transaction so the player's score/play
   * count and the group's rollup can never drift out of sync.
   */
  async recordRound(uid: string, roundScore: number): Promise<wasteSortPlayer | null> {
    const safeScore = Math.max(0, roundScore)

    const playerRef = wasteSortPlayerCollection.doc(uid)
    const today = todayKey()

    await adminDb.runTransaction(async (tx) => {
      const playerSnap = await tx.get(playerRef)
      const player = playerSnap.data()
      const userDoc = await tx.get(adminDb.collection("users").doc(uid))
      const playerGroup = userDoc.get("group")
      const groupRef = groupsCollectionRaw.doc(playerGroup)

      if (!player) {
        // first round ever: init player doc inline, seeded with this round
        const groupDoc = await tx.get(groupRef)
        if (!groupDoc.exists) {
          throw new Error(`Group "${playerGroup}" does not exist`)
        }

        tx.set(playerRef, {
          name: userDoc.get("name")?.en?.firstName ?? "",
          group: playerGroup,
          vesselName: groupDoc.get("vesselName"),
          playCount: 1,
          sustainScore: safeScore,
          playsToday: 1,
          lastPlayDate: today,
        })

        tx.update(groupRef, {
          "scoreSources.sustainScore": FieldValue.increment(safeScore),
        })
        return
      }

      const playsToday = player.lastPlayDate === today ? player.playsToday : 0

      if (playsToday >= MAX_PLAYS_PER_DAY) {
        throw new Error("DAILY_LIMIT_REACHED")
      }

      tx.update(playerRef, {
        playCount: FieldValue.increment(1),
        sustainScore: FieldValue.increment(safeScore),
        playsToday: playsToday + 1,
        lastPlayDate: today,
      } as unknown as Partial<wasteSortPlayer>)

      tx.update(groupRef, {
        "scoreSources.sustainScore": FieldValue.increment(safeScore),
      })
    })

    const result = await playerRef.get()
    return result.data() ?? null
  },
}

export default wasteSortPlayerService
