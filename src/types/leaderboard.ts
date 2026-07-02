import type { MultiLang } from "@/types/util"

export interface LeaderboardEntry {
  group: string
  score: number
}

export interface LeaderboardResponse {
  top3: { vesselName: MultiLang; score: number; rank: number }[]
  rank: number | null
}
