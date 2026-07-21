import { z } from "zod"
import { click } from "@/services/popkaewClickService"
import { success, failure, protectRaw, requireFlag, parseBody } from "@/utils/apiHelpers"
import { AppErrorCode } from "@/types/appErrorCode"
import { NextRequest } from "next/server"
import { POPKAEW_BUCKET_CAPACITY } from "@/services/popkaewConstants"

const clickSchema = z.object({
  click: z.number().int().positive().max(POPKAEW_BUCKET_CAPACITY),
})

export async function POST(req: NextRequest) {
  try {
    const [error, user] = await protectRaw("participant")
    if (error) return error

    const [flagErr] = await requireFlag("game-popkaew")
    if (flagErr) return flagErr

    const [parseErr, body] = await parseBody(req, clickSchema)
    if (parseErr) return parseErr

    const playerId = user.id
    const result = await click(playerId, body.click)

    return success(result)
  } catch (error) {
    if (error instanceof Error) {
      switch (error.message) {
        case "Player not found":
          return failure(404, AppErrorCode.PLAYER_NOT_FOUND, "Player not found")

        case "Rate limit exceeded":
          return failure(429, AppErrorCode.RATE_LIMIT_EXCEEDED, "Too many clicks")
      }
    }
    console.error(error)

    return failure(500, AppErrorCode.INTERNAL_ERROR, "Internal server error")
  }
}
