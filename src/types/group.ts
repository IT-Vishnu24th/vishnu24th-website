import type { MultiLang } from "@/types/util"
import { RegistrationPoint, GroupRoom } from "./registrationPoint"

export interface Group {
  label: string
  vesselName: MultiLang
  registrationPoint: RegistrationPoint
  room: GroupRoom
}

export type Vessel = Omit<Group, "label">

export interface GroupStatsResponse {
  label: string
  vesselName: string
  scanScore: number
  score: number
}

export interface CommitScanBonusResult {
  group: string
  scanScore: number
  scanRank: number
  scanRankBonus: number
}
