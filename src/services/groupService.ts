import { adminDb } from "@/firebase/admin"

import type { CommitScanBonusResult, Group, Vessel } from "@/types/group"
export type * from "@/types/group"

// prettier-ignore
const scanScoreBonuses = [
  /* 1-3 */ 2000, 1800, 1500,
  /* 4-8 */ 1300, 1300, 1300, 1300, 1300,
  /* 9-18 */ 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000
]

export interface RawGroup extends Group {
  scanScore: number
  scoreSources: {
    scanRankBonus: number
    igMissionScore: number
    questionMissionScore: number
    waterScore: number
    sustainScore: number
    day1Score: number
    day2AMScore: number
    day2PMScore: number
  }
}

const groupCollection = adminDb.collection("groups").withConverter({
  fromFirestore: (snapshot) => snapshot.data() as RawGroup,
  toFirestore: (data: RawGroup) => data,
})

/** exposes group label/details; internal/admin use only */
const groupService = {
  async rawList(): Promise<RawGroup[]> {
    const coll = await groupCollection.get()
    return coll.docs.map((doc) => doc.data())
  },

  async getById(id: string): Promise<RawGroup | null> {
    const doc = await groupCollection.doc(id).get()
    const data = doc.data()
    if (!data) return null
    return data
  },

  async create(group: Group): Promise<RawGroup | null> {
    const ref = groupCollection.doc(group.label)
    await ref.create({
      ...group,

      // starting scores
      scanScore: 0,
      scoreSources: {
        scanRankBonus: 0,
        igMissionScore: 0,
        questionMissionScore: 0,
        waterScore: 0,
        sustainScore: 0,
        day1Score: 0,
        day2AMScore: 0,
        day2PMScore: 0,
      },
    })

    const result = await ref.get()
    const data = result.data()
    if (!data) return null
    return data
  },

  async update(id: string, group: Partial<Omit<RawGroup, "label">>): Promise<RawGroup | null> {
    const ref = groupCollection.doc(id)
    await ref.update(group)

    const result = await ref.get()
    const data = result.data()
    if (!data) return null
    return data
  },

  async setScanBonuses(): Promise<CommitScanBonusResult[]> {
    const coll = await groupCollection.get()

    const result: CommitScanBonusResult[] = await adminDb.runTransaction(async (tx) => {
      const docs = await tx.getAll(...coll.docs.map((doc) => doc.ref))
      const groups = await Promise.all(docs.map((doc) => doc.data()!))

      // Sort by score desc, then by label asc to keep order deterministic
      const sorted = [...groups].sort(
        (a, b) => b.scanScore - a.scanScore || a.label.localeCompare(b.label)
      )

      // Normal ranking (eg. 1224), zero-based
      const ranked = sorted.map((group) => {
        const rank = sorted.filter((g) => g.scanScore > group.scanScore).length
        return {
          ...group,
          scanRank: rank + 1,
          scanRankBonus: scanScoreBonuses[rank],
        }
      })

      return ranked.map(({ label, scoreSources, scanScore, scanRank, scanRankBonus }) => {
        tx.update(groupCollection.doc(label), {
          scoreSources: { ...scoreSources, scanRankBonus },
        })

        return {
          group: label,
          scanScore,
          scanRank,
          scanRankBonus,
        }
      })
    })

    return result
  },

  mapToPublic(group: RawGroup, showFullGroup: boolean | null): Group | Vessel {
    const { label, vesselName, registrationPoint, room } = group
    return {
      vesselName,
      registrationPoint,
      room,
      ...(showFullGroup ? { label } : {}),
    }
  },

  totalScore(group: RawGroup): number {
    let total = 0
    for (const value in Object.values(group.scoreSources)) {
      if (typeof value === "number") {
        total += value
      }
    }
    return total
  },
}

export default groupService
