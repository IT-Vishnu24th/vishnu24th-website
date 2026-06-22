import { adminDb } from "@/firebase/admin"

import type { Group, Vessel } from "@/types/group"
export type * from "@/types/group"

const groupCollection = adminDb.collection("groups").withConverter({
  fromFirestore: (snapshot) => {
    const data = snapshot.data() as Group
    return {
      ...data,
      score: typeof data.score === "number" ? data.score : 0,
    }
  },
  toFirestore: (data: Group) => data,
})

const groupService = {
  /** exposes group label/details; internal/admin use only */
  async rawList(): Promise<Group[]> {
    const coll = await groupCollection.get()
    return coll.docs.map((doc) => doc.data())
  },
  async getById(id: string): Promise<Group | null> {
    const doc = await groupCollection.doc(id).get()
    const data = doc.data()
    if (!data) return null
    return data
  },

  async create(group: Group): Promise<Group | null> {
    const ref = groupCollection.doc(group.label)
    await ref.create(group)

    const result = await ref.get()
    const data = result.data()
    if (!data) return null
    return data
  },

  async update(id: string, group: Partial<Omit<Group, "label">>): Promise<Group | null> {
    const ref = groupCollection.doc(id)
    await ref.update(group)

    const result = await ref.get()
    const data = result.data()
    if (!data) return null
    return data
  },
  mapToPublic(group: Group, showFullGroup: boolean | null): Group | Vessel {
    if (showFullGroup) return group
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { label, ...vessel } = group
    return vessel
  },
}

export default groupService
