import type { LeaderboardResponse } from "@/types/leaderboard"

export const MOCK_LEADERBOARD: LeaderboardResponse = {
  top3: [
    {
      rank: 1,

      label: "A",

      vesselName: {
        th: "อนาคอนด้า",
        en: "Anaconda",
      },

      score: 67000000,

      scanScore: 230,

      registrationPoint: {
        firstdate: "EN100",
        vishnu: "Larngear",
      },
    },

    {
      rank: 2,

      label: "B",

      vesselName: {
        th: "อริฮานา",
        en: "Arihana",
      },

      score: 6767,

      scanScore: 150,

      registrationPoint: {
        firstdate: "ENG4",
        vishnu: "Plateau",
      },
    },

    {
      rank: 3,

      label: "C",

      vesselName: {
        th: "อมองกุส",
        en: "Amejungs",
      },

      score: 67,

      scanScore: 80,

      registrationPoint: {
        firstdate: "Larnsom",
        vishnu: "EN100",
      },
    },
  ],

  rank: 18,
}
//ไม่มีใน type
export const MOCK_MY_VESSEL = {
  vesselName: "อนาคอนด้า",
  score: 6767,
}
