import type { LeaderboardResponse } from "@/types/leaderboard"

export const MOCK_LEADERBOARD: LeaderboardResponse = {
  top3: [
    {
      rank: 1,
      vesselName: {
        th: "อนาคอนด้า",
        en: "Anaconda",
      },
      score: 67000000,
    },
    {
      rank: 2,
      vesselName: {
        th: "อริฮานา",
        en: "Arihana",
      },
      score: 6767,
    },
    {
      rank: 3,
      vesselName: {
        th: "อมองกุส",
        en: "Amejungs",
      },
      score: 67,
    },
  ],
  rank: 18,
  score: 6767,
  vesselName: {
    th: "อนาคอนด้า",
    en: "Anaconda",
  },
}
//ไม่มีใน type
export const MOCK_MY_VESSEL = {
  vesselName: "อนาคอนด้า",
  score: 6767,
}
