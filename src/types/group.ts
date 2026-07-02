import type { MultiLang } from "@/types/util"
import { RegistrationPoint, GroupRoom } from "./registrationPoint"

export interface Group {
  label: string
  vesselName: MultiLang
  registrationPoint: RegistrationPoint
  room: GroupRoom | ""
}

export type Vessel = Omit<Group, "label">
