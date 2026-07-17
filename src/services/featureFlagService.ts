import { adminDb } from "@/firebase/admin"
import type { FeatureFlag } from "@/types/featureFlag"
export type * from "@/types/featureFlag"

const featureFlagCollection = adminDb.collection("featureFlags").withConverter({
  fromFirestore: (snapshot) => snapshot.data() as FeatureFlag,
  toFirestore: (data: FeatureFlag) => data,
})

// Per-instance TTL cache
const CACHE_TTL_MS = Number(process.env.FLAG_CACHE_TTL_MS ?? 10000)
const cache = new Map<string, { flag: FeatureFlag | null; expires: number }>()

const featureFlagsService = {
  async listFlags(): Promise<FeatureFlag[]> {
    const coll = await featureFlagCollection.get()
    return coll.docs.map((doc) => doc.data())
  },

  async getFlag(id: string): Promise<FeatureFlag | null> {
    if (CACHE_TTL_MS > 0) {
      const hit = cache.get(id)
      if (hit && hit.expires > Date.now()) return hit.flag ? { ...hit.flag } : null
    }
    const doc = await featureFlagCollection.doc(id).get()
    const data = doc.data() ?? null
    if (CACHE_TTL_MS > 0) cache.set(id, { flag: data, expires: Date.now() + CACHE_TTL_MS })
    return data ? { ...data } : null
  },

  async createFlag(flag: FeatureFlag): Promise<FeatureFlag> {
    const ref = featureFlagCollection.doc(flag.id)
    await ref.create(flag)
    cache.delete(flag.id)

    const result = await ref.get()
    const data = result.data()
    if (!data) throw new Error("Unknown error ; document should exist") // should never happen
    return data
  },

  /** missing flag doc counts as disabled */
  async isEnabled(id: string): Promise<boolean> {
    const flag = await this.getFlag(id)
    return flag?.enabled ?? false
  },

  async setFlag(id: string, enabled: boolean = false): Promise<FeatureFlag> {
    const ref = featureFlagCollection.doc(id)
    await ref.update({ id, enabled })
    cache.delete(id)

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
    for (const id in flags) cache.delete(id)
  },
}

export default featureFlagsService
