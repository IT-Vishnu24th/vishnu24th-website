import { FieldValue } from "firebase-admin/firestore"
import { adminDb } from "@/firebase/admin"

import type { wasteSortPlayer } from "@/types/wasteSort"
import type { wasteSortGroup } from "@/types/wasteSort"

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

// `groups` already exists and is shared by several mini-games. We read it
// through a converter (typed to just the fields we care about) but write to
// it through the raw, un-converted reference so we can safely do dot-path
// updates like "scoreSources.sustainScore" without needing to know — or
// risk overwriting — the rest of the document's fields.
const groupsCollectionRaw = adminDb.collection("groups")
const groupsCollection = groupsCollectionRaw.withConverter({
  fromFirestore: (snapshot) => {
    return snapshot.data() as wasteSortGroup
  },

  toFirestore: (data: wasteSortGroup) => data,
})

const wasteSortPlayerService = {
  async getById(uid: string): Promise<wasteSortPlayer | null> {
    const doc = await wasteSortPlayerCollection.doc(uid).get()

    const data = doc.data()
    if (!data) return null

    return data
  },

  /**
   * Create a new player document. `uid` should be a stable id you control
   * (e.g. an auth uid, or a slug generated at signup) — the doc is created
   * with exactly the fields you pass in `player`.
   */
  async create(uid: string, player: wasteSortPlayer): Promise<wasteSortPlayer | null> {
    const ref = wasteSortPlayerCollection.doc(uid)

    await ref.create(player)

    const result = await ref.get()
    return result.data() ?? null
  },

  /**
   * Convenience helper for signup flows: looks up the group's vesselName so
   * you don't have to pass it in manually, and fills in the zeroed defaults
   * (playCount / sustainScore). Returns the existing player instead of
   * erroring if `uid` is already registered.
   */
  async createNewPlayer(
    uid: string,
    input: { name: string; group: string }
  ): Promise<wasteSortPlayer | null> {
    const existing = await this.getById(uid)
    if (existing) return existing

    const groupDoc = await groupsCollection.doc(input.group).get()
    const groupData = groupDoc.data()

    if (!groupData) {
      throw new Error(`Group "${input.group}" does not exist in the groups collection`)
    }

    const player: wasteSortPlayer = {
      name: input.name,
      vesselName: groupData.vesselName,
      group: input.group,
      playCount: 0,
      sustainScore: 0,
      playsToday: 0,
      lastPlayDate: "",
    }

    return this.create(uid, player)
  },

  async update(uid: string, player: Partial<wasteSortPlayer>): Promise<wasteSortPlayer | null> {
    const ref = wasteSortPlayerCollection.doc(uid)

    await ref.update(player)

    const result = await ref.get()
    return result.data() ?? null
  },

  async delete(uid: string): Promise<void> {
    await wasteSortPlayerCollection.doc(uid).delete()
  },

  async list(): Promise<wasteSortPlayer[]> {
    const snapshot = await wasteSortPlayerCollection.get()

    return snapshot.docs.map((doc) => doc.data())
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
   * Get the player's group document (from the shared `groups` collection).
   */
  async getGroup(uid: string): Promise<wasteSortGroup | null> {
    const player = await this.getById(uid)
    if (!player) return null

    const doc = await groupsCollection.doc(player.group).get()
    return doc.data() ?? null
  },

  /**
   * Call this once a round ends. Atomically:
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

      if (!player) {
        throw new Error(`Player "${uid}" does not exist`)
      }

      const playsToday = player.lastPlayDate === today ? player.playsToday : 0
      if (playsToday >= MAX_PLAYS_PER_DAY) {
        throw new Error("DAILY_LIMIT_REACHED")
      }

      const groupRef = groupsCollectionRaw.doc(player.group)

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
