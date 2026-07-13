import { adminDb } from "@/firebase/admin"

import type { popkaewPlayer } from "@/types/popkaewPlayer"
import type { popkaewVessel } from "@/types/popkaewVessel"

export type * from "@/types/popkaewPlayer"

const popkaewPlayerCollection = adminDb.collection("popkaewPlayer").withConverter({
  fromFirestore: (snapshot) => {
    return snapshot.data() as popkaewPlayer
  },

  toFirestore: (data: popkaewPlayer) => data,
})

const popkaewVesselCollection = adminDb.collection("popkaewVessel")
const userCollectionRaw = adminDb.collection("users")
const groupCollectionRaw = adminDb.collection("groups")

const popkaewPlayerService = {
  async getById(uid: string): Promise<popkaewPlayer | null> {
    const doc = await popkaewPlayerCollection.doc(uid).get()

    const data = doc.data()
    if (!data) return null

    return data
  },

  async ensureForUser(uid: string): Promise<popkaewPlayer | null> {
    const playerRef = popkaewPlayerCollection.doc(uid)

    await adminDb.runTransaction(async (tx) => {
      const playerDoc = await tx.get(playerRef)
      const existingPlayer = playerDoc.data()
      let group = existingPlayer?.group
      let vesselName = existingPlayer?.vesselName

      if (!existingPlayer) {
        const userDoc = await tx.get(userCollectionRaw.doc(uid))
        if (!userDoc.exists) {
          throw new Error("User not found")
        }

        group = userDoc.get("group")
        if (!group || typeof group !== "string") {
          throw new Error(`User "${uid}" has no group`)
        }

        const groupDoc = await tx.get(groupCollectionRaw.doc(group))
        if (!groupDoc.exists) {
          throw new Error(`Group "${group}" does not exist`)
        }

        vesselName = groupDoc.get("vesselName") as popkaewPlayer["vesselName"] | undefined
        if (!vesselName) {
          throw new Error(`Group "${group}" has no vesselName`)
        }
      }

      if (!group || !vesselName) {
        throw new Error(`Player "${uid}" has invalid Popkaew data`)
      }

      const vesselRef = popkaewVesselCollection.doc(group)
      const vesselDoc = await tx.get(vesselRef)

      if (!vesselDoc.exists) {
        tx.set(vesselRef, {
          group,
          vesselName,
          popkaewscore: 0,
        } satisfies popkaewVessel)
      }

      if (!existingPlayer) {
        tx.set(playerRef, {
          group,
          vesselName,
          popkaewscore: 0,
        } satisfies popkaewPlayer)
      }
    })

    const result = await playerRef.get()
    return result.data() ?? null
  },

  async create(uid: string, player: popkaewPlayer): Promise<popkaewPlayer | null> {
    const ref = popkaewPlayerCollection.doc(uid)

    await ref.create(player)

    const result = await ref.get()
    return result.data() ?? null
  },

  async update(uid: string, player: Partial<popkaewPlayer>): Promise<popkaewPlayer | null> {
    const ref = popkaewPlayerCollection.doc(uid)

    await ref.update(player)

    const result = await ref.get()
    return result.data() ?? null
  },

  async delete(uid: string): Promise<void> {
    await popkaewPlayerCollection.doc(uid).delete()
  },

  async list(): Promise<popkaewPlayer[]> {
    const snapshot = await popkaewPlayerCollection.get()

    return snapshot.docs.map((doc) => doc.data())
  },
}

export default popkaewPlayerService
