import { NextRequest } from "next/server"
import popkaewPlayerService from "@/services/popKaewPlayerServices"
import { success, failure, protectRaw } from "@/utils/apiHelpers"
import { AppErrorCode } from "@/types/appErrorCode"

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const [error] = await protectRaw("participant")
    if (error) return error

    const { id } = await params
    const player = await popkaewPlayerService.getById(id)

    if (!player) {
      return failure(404, AppErrorCode.PLAYER_NOT_FOUND, "Player not found")
    }

    return success({
      id,
      name: player.name,
      vesselName: player.vessel,
      popkaewscore: player.popkaewscore,
      lastClickAt: player.lastClickAt?.toDate().toISOString() ?? null,
    })
  } catch (error) {
    console.error("Get player error:", error)
    return failure(500, AppErrorCode.INTERNAL_ERROR, "Internal server error")
  }
}
