import { adminDb } from "@/firebase/admin"
import type { phase} from "@/types/phase"
export type * from "@/types/phase"

const phaseCollection = adminDb.collection("phase").withConverter({
  fromFirestore: (snapshot) => snapshot.data() as phase,
  toFirestore: (data: phase) => data,
})

const phaseService = {
  async getPhase(id: string): Promise<phase | null> {
    const doc = await phaseCollection.doc(id).get()
    const data = doc.data()
    if (!data) return null
    return data
  },

  async setPhase(id: string, enabled: boolean = false): Promise<phase> {
    const ref = phaseCollection.doc(id)
    await ref.set({ id, enabled })

    const result = await ref.get()
    const data = result.data()
    if (!data) throw new Error("Unknown error ; document should exist") // should never happen
    return data
  },
}

export default phaseService
