import { click } from "@/services/popkaewClickService"
import { success, failure, protectRaw, requireFlag } from "@/utils/apiHelpers"
import { AppErrorCode } from "@/types/appErrorCode"

export async function POST() {
  try {
    const [error, user] = await protectRaw("participant")
    if (error) return error

    const [flagErr] = await requireFlag("game-popkaew")
    if (flagErr) return flagErr

    const playerId = user.id

    const result = await click(playerId)

    return success(result)
  } catch (error) {
    if (error instanceof Error && error.message === "Player not found") {
      return failure(404, AppErrorCode.PLAYER_NOT_FOUND, "Player not found")
    }

    console.error(error)

    return failure(500, AppErrorCode.INTERNAL_ERROR, "Internal server error")
  }
}
