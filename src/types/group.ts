import type { MultiLang } from "@/types/util"
import { RegistrationPoint, GroupRoom } from "./registrationPoint"

export interface Group {
  label: string
  vesselName: MultiLang
  score: number
  scanScore: number
  registrationPoint: RegistrationPoint
  room: GroupRoom | ""
}

export type Vessel = Omit<Group, "label">
