import { adminDb } from "@/firebase/admin"
import { Timestamp } from "firebase-admin/firestore"
import type { StagePerformance, StagePerformanceStatus } from "@/types/stagePerformance"
import type { MultiLang } from "@/types/util"
export type * from "@/types/stagePerformance"

interface BaseStagePerformance {
  name: MultiLang
  description: MultiLang
  status: StagePerformanceStatus
  duration: number
}

interface NativeStagePerformance extends BaseStagePerformance {
  start: Timestamp
  end: Timestamp
}

export interface RawStagePerformance extends BaseStagePerformance {
  start: Date
  end: Date
}

const stageCollection = adminDb.collection("stage").withConverter({
  fromFirestore: (snapshot): RawStagePerformance => {
    const data = snapshot.data() as NativeStagePerformance
    return {
      ...data,
      start: data.start.toDate(),
      end: data.end.toDate(),
    }
  },
  toFirestore: (data: RawStagePerformance): NativeStagePerformance => ({
    ...data,
    start: Timestamp.fromDate(data.start),
    end: Timestamp.fromDate(data.end),
  }),
})

const serializeStage = (id: string, stage: RawStagePerformance): StagePerformance => ({
  id,
  ...stage,
  start: stage.start.toISOString(),
  end: stage.start.toISOString(),
})

const stageService = {
  async list(): Promise<StagePerformance[]> {
    const coll = await stageCollection.orderBy("start").get()
    return coll.docs.map((doc) => serializeStage(doc.id, doc.data()))
  },

  async getById(id: string): Promise<StagePerformance | null> {
    const doc = await stageCollection.doc(id).get()
    const data = doc.data()
    if (!data) return null
    return serializeStage(doc.id, data)
  },

  async create(stage: RawStagePerformance): Promise<string> {
    const ref = await stageCollection.add(stage)
    return ref.id
  },

  async update(id: string, stage: Partial<RawStagePerformance>): Promise<StagePerformance> {
    const ref = stageCollection.doc(id)
    await ref.update(stage)

    const result = await ref.get()
    const data = result.data()
    if (!data) throw new Error("Document should exist") // should never happen
    return serializeStage(ref.id, data)
  },

  async delete(id: string): Promise<void> {
    await stageCollection.doc(id).delete()
  },

  async setSoleActive(targetId: string) {
    adminDb.runTransaction(async (tx) => {
      const currentLive = await tx.get(
        stageCollection.where("status", "==", "live" satisfies StagePerformanceStatus)
      )
      const currentLiveIds = currentLive.docs.map((doc) => doc.id)
      for (const id of currentLiveIds) {
        if (id === targetId) continue
        tx.update(stageCollection.doc(id), {
          status: "complete" satisfies StagePerformanceStatus,
        })
      }

      const targetIsLive = currentLiveIds.includes(targetId)
      if (!targetIsLive) {
        tx.update(stageCollection.doc(targetId), {
          status: "live" satisfies StagePerformanceStatus,
        })
      }
    })
  },
}

export default stageService
