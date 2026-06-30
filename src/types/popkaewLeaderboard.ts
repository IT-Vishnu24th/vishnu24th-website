import { popkaewVessel } from "./popkaewVessel"

export interface LeaderboardItem extends popkaewVessel {
  id: string
  rank: number
}

export interface LeaderboardResponse {
  success: boolean
  leaderboard: LeaderboardItem[]
}
