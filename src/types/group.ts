import type { MultiLang } from "@/types/util"
import { RegistrationPoint, GroupRoom } from "./registrationPoint"

export interface Group {
  label: string
  vesselName: MultiLang
  registrationPoint: RegistrationPoint
  room: GroupRoom
}

/** Public shape of a group: never exposes `label`; `vesselName` only when the `reveal-vessel` flag is on */
export type Vessel = Omit<Group, "label" | "vesselName"> & { vesselName?: MultiLang }

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
