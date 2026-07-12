import popkaewPlayerService from "@/services/popKaewPlayerServices"

import { success, failure, protectRaw, requireFlag } from "@/utils/apiHelpers"
import { AppErrorCode } from "@/types/appErrorCode"

export async function GET() {
  try {
    const [error, user] = await protectRaw("participant")
    if (error) return error

    const [flagErr] = await requireFlag("game-popkaew")
    if (flagErr) return flagErr

    const player = await popkaewPlayerService.getById(user.id)

    if (!player) {
      return failure(404, AppErrorCode.PLAYER_NOT_FOUND, "Player not found")
    }

    // player.group (label) stays server-side
    return success({
      vesselName: player.vesselName,
      popkaewscore: player.popkaewscore,
      lastClickAt: player.lastClickAt?.toDate().toISOString() ?? null,
    })
  } catch (error) {
    console.error("Get player error:", error)
    return failure(500, AppErrorCode.INTERNAL_ERROR, "Internal server error")
  }
}
