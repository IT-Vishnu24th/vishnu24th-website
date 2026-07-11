import { NextRequest } from "next/server"
import z from "zod"
import scanService from "@/services/scanService"
import { ScanResponse } from "@/types/scan"
import { protectRaw, success, failure, parseBody } from "@/utils/apiHelpers"
import { AppErrorCode } from "@/types/appErrorCode"

const scanPayloadSchema = z.object({
  clubId: z.string(),
})

export async function POST(req: NextRequest) {
  try {
    const [error, user] = await protectRaw("participant")
    if (error) return error

    const [parseErr, payload] = await parseBody(req, scanPayloadSchema)
    if (parseErr) return parseErr

    const { clubId } = payload

    if (!user.group) {
      return failure(404, AppErrorCode.GROUP_NOT_FOUND, "User group not found")
    }

    const result = await scanService.scan(user.id, user.group, clubId)
    if (!result.success) {
      if (result.error === AppErrorCode.GAME_NOT_ACTIVE) {
        return failure(403, AppErrorCode.GAME_NOT_ACTIVE, "Club scanning game is not active")
      }
      if (result.error === AppErrorCode.CLUB_NOT_FOUND) {
        return failure(404, AppErrorCode.CLUB_NOT_FOUND, "Club not found")
      }
      if (result.error === AppErrorCode.GROUP_NOT_FOUND) {
        return failure(404, AppErrorCode.GROUP_NOT_FOUND, "User group not found")
      }
      if (result.error === AppErrorCode.ALREADY_SCANNED) {
        return failure(409, AppErrorCode.ALREADY_SCANNED, "You have already scanned this club")
      }
      return failure(500, AppErrorCode.INTERNAL_ERROR, "Internal server error")
    }

    return success<ScanResponse>({
      createdAt: result.createdAt,
      club: result.club,
      score: result.score,
    })
  } catch (error) {
    console.error("Club scan error:", error)
    return failure(500, AppErrorCode.INTERNAL_ERROR, "Internal server error")
  }
}
