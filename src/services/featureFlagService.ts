import { adminDb } from "@/firebase/admin"
import type { FeatureFlag } from "@/types/featureFlag"

const featureFlagCollection = adminDb.collection("featureFlags").withConverter({
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
  async create(id: string, enabled: boolean = false): Promise<string> {
    await featureFlagCollection.doc(id).set({ id, enabled })
    return id
  },
}

export default featureFlagsService
