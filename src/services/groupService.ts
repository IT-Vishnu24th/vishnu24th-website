import { adminDb } from "@/firebase/admin"
import featureFlagsService from "@/services/featureFlagService"
import type { Group, Vessel } from "@/types/group"

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
  async getById(id: string): Promise<Group | Vessel | null> {
    const doc = await groupCollection.doc(id).get()
    const data = doc.data()
    if (!data) return null
    const showFullGroup = await featureFlagsService.getFlag("show-group")
    return this.mapToPublic(data, showFullGroup)
  },
  async create(group: Group): Promise<string> {
    await groupCollection.doc(group.label).set(group)
    return group.label
  },
  mapToPublic(group: Group, showFullGroup: boolean | null): Group | Vessel {
    if (showFullGroup) {
      return group
    } else {
      const {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars -- removing hidden info
        label: __label,
        ...vessel
      } = group
      return vessel
    }
  },
}

export default groupService
