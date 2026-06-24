import { Group, Vessel } from "./group"

export interface LeaderboardResponse {
  top3: ((Group | Vessel) & { rank: number })[]
  rank: number | null
}
