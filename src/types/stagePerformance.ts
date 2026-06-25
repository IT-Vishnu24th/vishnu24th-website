import type { MultiLang } from "@/types/util"

export type StagePerformanceStatus = "complete" | "live" | "upcoming" | "delayed"

export interface StagePerformance {
  name: MultiLang
  description: MultiLang
  status: StagePerformanceStatus
  duration: number // minutes
  // ISO 8601 timestamps
  start: string
  end: string
}
