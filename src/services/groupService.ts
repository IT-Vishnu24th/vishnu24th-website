import { adminDb } from "@/firebase/admin"

import type { Group, Vessel } from "@/types/group"
export type * from "@/types/group"

export interface RawGroup extends Group {
  scanScore: number
  scoreSources: {
    scanRankBonus: number
    igMissionScore: number
    questionMissionScore: number
    waterScore: number
    sustainScore: number
    day1Score: number
    day2AMScore: number
    day2PMScore: number
  }
}

const groupCollection = adminDb.collection("groups").withConverter({
  fromFirestore: (snapshot) => snapshot.data() as RawGroup,
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

      // starting scores
      scanScore: 0,
      scoreSources: {
        scanRankBonus: 0,
        igMissionScore: 0,
        questionMissionScore: 0,
        waterScore: 0,
        sustainScore: 0,
        day1Score: 0,
        day2AMScore: 0,
        day2PMScore: 0,
      },
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
