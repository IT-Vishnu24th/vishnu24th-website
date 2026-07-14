import type { MultiLang } from "@/types/util"

export interface LeaderboardEntry {
  group: string
  score: number
}

export interface LeaderboardResponse {
  top3: { vesselName?: MultiLang; score: number; rank: number }[]
  rank: number | null
  /** authenticated user's group score (null if group not found) */
  score: number | null
  /** authenticated user's group vessel name; omitted when the `reveal-vessel` flag is off */
  vesselName?: MultiLang
}
