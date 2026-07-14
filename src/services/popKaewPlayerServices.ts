import { adminDb } from "@/firebase/admin"

import type { popkaewPlayer } from "@/types/popkaewPlayer"

export type * from "@/types/popkaewPlayer"

const popkaewPlayerCollection = adminDb.collection("popkaewPlayer").withConverter({
  fromFirestore: (snapshot) => {
    return snapshot.data() as popkaewPlayer
  },

  toFirestore: (data: popkaewPlayer) => data,
})

const popkaewPlayerService = {
  async getById(uid: string): Promise<popkaewPlayer | null> {
    const doc = await popkaewPlayerCollection.doc(uid).get()

    const data = doc.data()
    if (!data) return null

    return data
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
