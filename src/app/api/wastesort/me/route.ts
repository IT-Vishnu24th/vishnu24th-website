import { success, failure, protectRaw, requireFlag } from "@/utils/apiHelpers"
import wasteSortPlayerService from "@/services/wasteSortPlayerService"
import { AppErrorCode } from "@/types/appErrorCode"

export async function GET() {
  try {
    const [error, user] = await protectRaw("participant")
    if (error) return error

    const [flagErr] = await requireFlag("game-sustain")
    if (flagErr) return flagErr

    const player = await wasteSortPlayerService.getById(user.id)

    if (!player) {
      return failure(404, AppErrorCode.PLAYER_NOT_FOUND, "Player not found")
    }

    return success(wasteSortPlayerService.mapToPublic(player))
  } catch (error) {
    console.error("Get player error:", error)
    return failure(500, AppErrorCode.INTERNAL_ERROR, "Internal server error")
  }
}
