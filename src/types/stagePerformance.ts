export type StagePerformanceStatus = "complete" | "live" | "upcoming" | "delayed"

export interface StagePerformance {
  name: string
  description: string
  status: StagePerformanceStatus
  duration: number // minutes
  // ISO 8601 timestamps
  start: string
  end: string
}
