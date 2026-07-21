import { success, failure } from "@/utils/apiHelpers"
import { AppErrorCode } from "@/types/appErrorCode"
import type { WasteSortGameState } from "@/types/wasteSort"

const WINDOWS: WasteSortGameState[] = [
  { opensAt: "2026-07-21T11:50:00+07:00", closesAt: "2026-07-21T12:30:00+07:00" },
  { opensAt: "2026-07-21T17:45:00+07:00", closesAt: "2026-07-21T18:25:00+07:00" },
  { opensAt: "2026-07-22T12:10:00+07:00", closesAt: "2026-07-22T12:50:00+07:00" },
  { opensAt: "2026-07-22T19:30:00+07:00", closesAt: "2026-07-22T20:00:00+07:00" },
  { opensAt: "2026-07-23T12:45:00+07:00", closesAt: "2026-07-23T13:30:00+07:00" },
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
    return failure(409, AppErrorCode.GAME_NOT_ACTIVE, "Sustain game is not active")
  }

  return success<WasteSortGameState>(active)
}
