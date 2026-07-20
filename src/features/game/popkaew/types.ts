import type { MultiLang } from "@/types/util"
import type { User } from "@/types/user"

export type PopkaewVesselScore = {
  rank: number
  vesselName: MultiLang
  popkaewscore: number
}

export type PopkaewLeaderboardResponse = {
  vessels: PopkaewVesselScore[]
  vesselIndex: number | null
}

export type PopkaewMeResponse = {
  vesselName: MultiLang
  popkaewscore: number
  lastClickAt: string | null
}

export type PopkaewClickResponse = {
  score: number
  amount: number
}

export type PopkaewCurrentUser = Pick<User, "id" | "name" | "prefLanguage" | "role">
