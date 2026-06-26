import type { MultiLang } from "@/types/util"

export interface Group {
  label: string
  vesselName: MultiLang
  score: number
  scanScore: number
}

export type Vessel = Omit<Group, "label">
