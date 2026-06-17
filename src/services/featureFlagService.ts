import { getAdminDb } from "@/firebase/admin"
import type { FeatureFlag } from "@/types/featureFlag"

const featureFlagCollection = getAdminDb()
  .collection("featureFlags")
  .withConverter({
    fromFirestore: (snapshot) => snapshot.data() as FeatureFlag,
    toFirestore: (data: FeatureFlag) => data,
  })

const featureFlagsService = {
  async getFlag(id: string): Promise<boolean | null> {
    const doc = await featureFlagCollection.doc(id).get()
    const data = doc.data()
    if (!data) return null
    return data.enabled
  },
}

export default featureFlagsService
