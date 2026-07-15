import { StagePerformanceStatus } from "@/types/stagePerformance"

export const statusClasses: Record<StagePerformanceStatus, string> = {
  complete: "bg-status-green border-status-green-dark",
  upcoming: "bg-status-yellow border-status-yellow-dark",
  live: "bg-status-red border-status-red-dark",
  delayed: "bg-status-yellow border-status-yellow-dark",
}

export const cardClasses: Record<StagePerformanceStatus, string> = {
  complete: "bg-brownie bg-brick-orange text-cream",
  upcoming: "bg-brownie bg-brick-orange text-cream",
  live: "bg-midnight border-midnight text-turqoise",
  delayed: "bg-brownie bg-brick-orange text-cream",
}
