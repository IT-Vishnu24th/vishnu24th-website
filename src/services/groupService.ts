import { getAdminDb } from "@/firebase/admin"
import featureFlagsService from "@/services/featureFlagService"
import type { Group, Vessel } from "@/types/group"

const groupCollection = getAdminDb()
  .collection("groups")
  .withConverter({
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
        label: __label,
        ...vessel
      } = data
      return vessel satisfies Vessel
    }
  },
}

export default groupService
