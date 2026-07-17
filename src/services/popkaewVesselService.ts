// src/services/popkaewVessel.ts

import { FieldValue } from "firebase-admin/firestore"

import { adminDb } from "@/firebase/admin"
import type { popkaewVessel } from "@/types/popkaewVessel"

export const vesselCollection = adminDb.collection("popkaewVessel").withConverter({
  fromFirestore(snapshot) {
    return snapshot.data() as popkaewVessel
  },
  toFirestore(data: popkaewVessel) {
    return data
  },
})

const popkaewVesselService = {
  async rawList(): Promise<popkaewVessel[]> {
    const snapshot = await vesselCollection.get()
    return snapshot.docs.map((doc) => doc.data())
  },

  async getById(id: string): Promise<popkaewVessel | null> {
    const doc = await vesselCollection.doc(id).get()

    if (!doc.exists) {
      return null
    }

    return doc.data()!
  },

  /** doc id = group label, matching the `groups` collection */
  async create(popkaewVessel: popkaewVessel): Promise<popkaewVessel | null> {
    const ref = vesselCollection.doc(popkaewVessel.group)

    await ref.create(popkaewVessel)

    const result = await ref.get()

    return result.data() ?? null
  },

  async update(id: string, data: Partial<popkaewVessel>): Promise<popkaewVessel | null> {
    const ref = vesselCollection.doc(id)

    await ref.update(data)

    const result = await ref.get()

    return result.data() ?? null
  },

  async incrementScore(id: string, amount = 1): Promise<void> {
    await vesselCollection.doc(id).update({
      popkaewscore: FieldValue.increment(amount),
    })
  },

  async ensureAllFromGroups(): Promise<void> {
    await adminDb.runTransaction(async (tx) => {
      const groupsSnapshot = await tx.get(adminDb.collection("groups"))
      const vesselRefs = groupsSnapshot.docs.map((groupDoc) => vesselCollection.doc(groupDoc.id))
      const vesselDocs = vesselRefs.length > 0 ? await tx.getAll(...vesselRefs) : []

      for (const [index, groupDoc] of groupsSnapshot.docs.entries()) {
        const vesselDoc = vesselDocs[index]
        if (vesselDoc.exists) continue

        const vesselName = groupDoc.get("vesselName") as popkaewVessel["vesselName"] | undefined
        if (!vesselName) continue

        tx.set(vesselRefs[index], {
          group: groupDoc.id,
          vesselName,
          popkaewscore: 0,
        })
      }
    })
  },

  /** all vessels sorted by score desc (vesselName.en asc tie-break), standard competition ranking (1224) */
  async leaderboard() {
    const snapshot = await vesselCollection.get()
    const vessels = snapshot.docs.map((doc) => doc.data())

    const sorted = [...vessels].sort(
      (a, b) => b.popkaewscore - a.popkaewscore || a.vesselName.en.localeCompare(b.vesselName.en)
    )
    const getRank = (score: number) => sorted.filter((v) => v.popkaewscore > score).length + 1

    return sorted.map((v) => ({
      rank: getRank(v.popkaewscore),
      ...this.mapToPublic(v),
    }))
  },

  /** strips `group` (group label) — never expose it in API responses */
  mapToPublic(vessel: popkaewVessel): Omit<popkaewVessel, "group"> {
    return {
      vesselName: vessel.vesselName,
      popkaewscore: vessel.popkaewscore,
    }
  },
}

export default popkaewVesselService
