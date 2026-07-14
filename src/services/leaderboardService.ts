import { adminDb } from "@/firebase/admin"
import type { LeaderboardEntry } from "@/types/leaderboard"
export type * from "@/types/leaderboard"

const leaderboardCollection = adminDb.collection("leaderboard").withConverter({
  fromFirestore: (snapshot) => snapshot.data() as LeaderboardEntry,
  toFirestore: (data: LeaderboardEntry) => data,
})

const leaderboardService = {
  async rawList(): Promise<LeaderboardEntry[]> {
    const coll = await leaderboardCollection.get()
    return coll.docs.map((doc) => doc.data())
  },

  async getById(id: string): Promise<LeaderboardEntry | null> {
    const doc = await leaderboardCollection.doc(id).get()
    const data = doc.data()
    if (!data) return null
    return data
  },

  async createAll(groups: string[]): Promise<void> {
    const batch = adminDb.batch()
    for (const group of groups) {
      batch.create(leaderboardCollection.doc(group), { group, score: 0 })
    }
    await batch.commit()
  },

  async updateAll(scores: Record<string, number>): Promise<void> {
    const batch = adminDb.batch()
    for (const group in scores) {
      batch.set(leaderboardCollection.doc(group), { group, score: scores[group] })
    }
    await batch.commit()
  },
}

export default leaderboardService
