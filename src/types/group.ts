import type { MultiLang } from "@/types/util"
import { RegistrationPoint } from "./registrationPoint"

export interface Group {
  label: string
  vesselName: MultiLang
  score: number
  scanScore: number
  registrationPoint: RegistrationPoint
}

export type Vessel = Omit<Group, "label">
