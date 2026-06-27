import type { MultiLang } from "@/types/util"

export interface Group {
  label: string
  vesselName: MultiLang
  score: number
  scanScore: number
  registrationPoint: {
    firstdate: string
    vishnu: string
  }
}

export type Vessel = Omit<Group, "label">
