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

  async create(popkaewVessel: popkaewVessel): Promise<popkaewVessel | null> {
    const ref = vesselCollection.doc(popkaewVessel.vesselName.en)

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

  async leaderboard(limit = 10) {
    const snapshot = await vesselCollection.orderBy("popkaewscore", "desc").limit(limit).get()

    return snapshot.docs.map((doc, index) => ({
      rank: index + 1,
      id: doc.id,
      ...doc.data(),
    }))
  },

  mapToPublic(vessel: popkaewVessel): popkaewVessel {
    return vessel
  },
}

export default popkaewVesselService
