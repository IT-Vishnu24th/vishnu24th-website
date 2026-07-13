import { click } from "@/services/popkaewClickService"
import { success, failure, protectRaw, requireFlag } from "@/utils/apiHelpers"
import { AppErrorCode } from "@/types/appErrorCode"
import type { NextRequest } from "next/server"
import z from "zod"

const clickBodySchema = z.object({
  amount: z.coerce.number().int().min(1).max(500).default(1),
})

export async function POST(request: NextRequest) {
  try {
    const [error, user] = await protectRaw("participant")
    if (error) return error

    const [flagErr] = await requireFlag("game-popkaew")
    if (flagErr) return flagErr

    let amount = 1
    try {
      const rawBody = await request.json()
      const body = clickBodySchema.safeParse(rawBody)
      if (!body.success) {
        return failure(400, AppErrorCode.INVALID_BODY, "Invalid body")
      }
      amount = body.data.amount
    } catch {
      amount = 1
    }

    const playerId = user.id

    const result = await click(playerId, amount)

    return success(result)
  } catch (error) {
    if (error instanceof Error && error.message === "Player not found") {
      return failure(404, AppErrorCode.PLAYER_NOT_FOUND, "Player not found")
    }

    console.error(error)

    return failure(500, AppErrorCode.INTERNAL_ERROR, "Internal server error")
  }
}
