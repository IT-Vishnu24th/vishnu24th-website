import { success, failure } from "@/utils/apiHelpers"
import { AppErrorCode } from "@/types/appErrorCode"
import type { MissionGameState } from "@/types/mission"

const WINDOWS: MissionGameState[] = [
  { opensAt: "2026-07-21T08:00:00+07:00", closesAt: "2026-07-21T12:00:00+07:00" },
  { opensAt: "2026-07-21T14:00:00+07:00", closesAt: "2026-07-21T18:00:00+07:00" },
  { opensAt: "2026-07-22T08:00:00+07:00", closesAt: "2026-07-22T12:00:00+07:00" },
  { opensAt: "2026-07-22T14:00:00+07:00", closesAt: "2026-07-22T18:00:00+07:00" },
  { opensAt: "2026-07-23T08:00:00+07:00", closesAt: "2026-07-23T12:00:00+07:00" },
  { opensAt: "2026-07-23T14:00:00+07:00", closesAt: "2026-07-23T18:00:00+07:00" },
  { opensAt: "2026-07-24T08:00:00+07:00", closesAt: "2026-07-24T12:00:00+07:00" },
]

export function GET() {
  const currentTime =
    process.env.NODE_ENV === "development" && process.env.MOCK_CURRENT_TIME
      ? new Date(process.env.MOCK_CURRENT_TIME)
      : new Date()

  const active = WINDOWS.find(
    (w) => currentTime >= new Date(w.opensAt) && currentTime < new Date(w.closesAt)
  )

  if (!active) {
    return failure(409, AppErrorCode.GAME_NOT_ACTIVE, "Missions are not active")
  }

  return success<MissionGameState>(active)
}
