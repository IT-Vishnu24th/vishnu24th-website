import { adminDb } from "@/firebase/admin"
<<<<<<< HEAD

=======
import featureFlagsService from "@/services/featureFlagService"
>>>>>>> d327aee (add phase endpoints)
import type { Group, Vessel } from "@/types/group"
export type * from "@/types/group"

const groupCollection = adminDb.collection("groups").withConverter({
<<<<<<< HEAD
  fromFirestore: (snapshot) => {
    const data = snapshot.data() as Group
    return {
      ...data,
      score: typeof data.score === "number" ? data.score : 0,
    }
  },
=======
  fromFirestore: (snapshot) => snapshot.data() as Group,
>>>>>>> d327aee (add phase endpoints)
  toFirestore: (data: Group) => data,
})

const groupService = {
<<<<<<< HEAD
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
=======
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
>>>>>>> d327aee (add phase endpoints)
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
<<<<<<< HEAD
  mapToPublic(group: Group, showFullGroup: boolean | null): Group | Vessel {
    if (showFullGroup) return group
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { label, ...vessel } = group
    return vessel
  },
=======
>>>>>>> d327aee (add phase endpoints)
}

export default groupService
