import { adminDb } from "@/firebase/admin"
import featureFlagsService from "@/services/featureFlagService"
import type { Group, Vessel } from "@/types/group"

const groupCollection = adminDb.collection("groups").withConverter({
  fromFirestore: (snapshot) => snapshot.data() as Group,
  toFirestore: (data: Group) => data,
})

const groupService = {
  async getById(id: string): Promise<Group | Vessel | null> {
    const doc = await groupCollection.doc(id).get()
    const data = doc.data()
    if (!data) return null
    const showFullGroup = await featureFlagsService.getFlag("show-group")
    if (showFullGroup) {
      return data satisfies Group
    } else {
      const {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars -- removing hidden info
        label: _label,
        ...vessel
      } = data
      return vessel satisfies Vessel
    }
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
}

export default groupService
