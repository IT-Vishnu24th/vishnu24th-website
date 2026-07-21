import { NextRequest } from "next/server"
import { z } from "zod"
import { success, failure, protectRaw, requireFlag, parseBody } from "@/utils/apiHelpers"
import { AppErrorCode } from "@/types/appErrorCode"
import wasteSortPlayerService, { MAX_PLAYS_PER_DAY } from "@/services/wasteSortPlayerService"

// game caps at 1 point per caught item, 90s round can spawn at most 57
// (spawnInterval decays 1700ms -> 1400ms floor, frame-rate independent)
const MAX_SCORE = 57

const roundSchema = z.object({
  score: z.number().int().min(0).max(MAX_SCORE),
})

// GET /api/wasteSortPlayer/me/round
// Check how many rounds the player has left today, without playing one.
export async function GET() {
  const [error, user] = await protectRaw("participant")
  if (error) return error

  const [flagErr] = await requireFlag("game-sustain")
  if (flagErr) return flagErr

  // missing player doc = hasn't played yet = full quota (doc is created on first round)
  const playsToday = await wasteSortPlayerService.getPlaysToday(user.id)

  return success({
    playsToday,
    maxPlaysPerDay: MAX_PLAYS_PER_DAY,
    playsRemaining: Math.max(0, MAX_PLAYS_PER_DAY - playsToday),
    canPlay: playsToday < MAX_PLAYS_PER_DAY,
  })
}

export async function POST(req: NextRequest) {
  const [error, user] = await protectRaw("participant")
  if (error) return error

  const [flagErr] = await requireFlag("game-sustain")
  if (flagErr) return flagErr

  const [parseErr, body] = await parseBody(req, roundSchema)
  if (parseErr) return parseErr

  const { score } = body

  try {
    const player = await wasteSortPlayerService.recordRound(user.id, score)

    if (!player) {
      return failure(404, AppErrorCode.PLAYER_NOT_FOUND, "Player not found")
    }

    return success({ player: wasteSortPlayerService.mapToPublic(player) })
  } catch (err) {
    if (err instanceof Error && err.message === "DAILY_LIMIT_REACHED") {
      return failure(
        429,
        AppErrorCode.DAILY_LIMIT_REACHED,
        `Already played ${MAX_PLAYS_PER_DAY} times today`
      )
    }

    console.error("Record round error:", err)
    return failure(
      500,
      AppErrorCode.INTERNAL_ERROR,
      err instanceof Error ? err.message : "Failed to record round"
    )
  }
}
