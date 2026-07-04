import { adminDb } from "@/firebase/admin"

import type { Group, Vessel } from "@/types/group"
export type * from "@/types/group"

export interface RawGroup extends Group {
  score: number
  scanScore: number
}

const groupCollection = adminDb.collection("groups").withConverter({
  fromFirestore: (snapshot) => {
    const data = snapshot.data() as RawGroup
    return {
      ...data,
      score: typeof data.score === "number" ? data.score : 0,
    }
  },
  toFirestore: (data: RawGroup) => data,
})

/** exposes group label/details; internal/admin use only */
const groupService = {
  async rawList(): Promise<RawGroup[]> {
    const coll = await groupCollection.get()
    return coll.docs.map((doc) => doc.data())
  },

  async getById(id: string): Promise<RawGroup | null> {
    const doc = await groupCollection.doc(id).get()
    const data = doc.data()
    if (!data) return null
    return data
  },

  async create(group: Group): Promise<RawGroup | null> {
    const ref = groupCollection.doc(group.label)
    await ref.create({
      ...group,
      score: 0,
      scanScore: 0,
    })

    const result = await ref.get()
    const data = result.data()
    if (!data) return null
    return data
  },

  async update(id: string, group: Partial<Omit<RawGroup, "label">>): Promise<RawGroup | null> {
    const ref = groupCollection.doc(id)
    await ref.update(group)

    const result = await ref.get()
    const data = result.data()
    if (!data) return null
    return data
  },

  mapToPublic(group: RawGroup, showFullGroup: boolean | null): Group | Vessel {
    const { label, vesselName, registrationPoint, room } = group
    return {
      vesselName,
      registrationPoint,
      room,
      ...(showFullGroup ? { label } : {}),
    }
  },
}

export default groupService
