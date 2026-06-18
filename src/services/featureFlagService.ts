import { adminDb } from "@/firebase/admin"
import type { FeatureFlag } from "@/types/featureFlag"

const featureFlagCollection = adminDb.collection("featureFlags").withConverter({
  fromFirestore: (snapshot) => snapshot.data() as FeatureFlag,
  toFirestore: (data: FeatureFlag) => data,
})

const featureFlagsService = {
  async getFlag(id: string): Promise<FeatureFlag | null> {
    const doc = await featureFlagCollection.doc(id).get()
    const data = doc.data()
    if (!data) return null
    return data
  },

  async create(id: string, enabled: boolean = false): Promise<FeatureFlag | null> {
    const ref = featureFlagCollection.doc(id)
    await ref.create({ id, enabled })

    const result = await ref.get()
    const data = result.data()
    if (!data) return null
    return data
  },

  async update(id: string, enabled: boolean): Promise<FeatureFlag | null> {
    const ref = featureFlagCollection.doc(id)
    await ref.update({ enabled })

    const result = await ref.get()
    const data = result.data()
    if (!data) return null
    return data
  },
}

export default featureFlagsService
