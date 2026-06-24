import { adminDb } from "@/firebase/admin"
import type { FeatureFlag } from "@/types/featureFlag"
export type * from "@/types/featureFlag"

const featureFlagCollection = adminDb.collection("featureFlags").withConverter({
  fromFirestore: (snapshot) => snapshot.data() as FeatureFlag,
  toFirestore: (data: FeatureFlag) => data,
})

const featureFlagsService = {
  async listFlags(): Promise<FeatureFlag[]> {
    const coll = await featureFlagCollection.get()
    return coll.docs.map((doc) => doc.data())
  },

  async getFlag(id: string): Promise<FeatureFlag | null> {
    const doc = await featureFlagCollection.doc(id).get()
    const data = doc.data()
    if (!data) return null
    return data
  },

  async createFlag(flag: FeatureFlag): Promise<FeatureFlag> {
    const ref = featureFlagCollection.doc(flag.id)
    await ref.create(flag)

    const result = await ref.get()
    const data = result.data()
    if (!data) throw new Error("Unknown error ; document should exist") // should never happen
    return data
  },

  async setFlag(id: string, enabled: boolean = false): Promise<FeatureFlag> {
    const ref = featureFlagCollection.doc(id)
    await ref.update({ id, enabled })

    const result = await ref.get()
    const data = result.data()
    if (!data) throw new Error("Unknown error ; document should exist") // should never happen
    return data
  },

  async updateFlags(flags: Record<string, boolean>): Promise<void> {
    const batch = adminDb.batch()
    for (const id in flags) {
      const enabled = flags[id]
      batch.update(featureFlagCollection.doc(id), { enabled })
    }
    await batch.commit()
  },
}

export default featureFlagsService
