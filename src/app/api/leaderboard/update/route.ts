import groupService from "@/services/groupService"
import leaderboardService from "@/services/leaderboardService"
import { failure, protectRaw, success } from "@/utils/apiHelpers"

export async function PUT() {
  try {
    const [error] = await protectRaw("admin")
    if (error) return error

    const groups = await groupService.rawList()

    const scores: Record<string, number> = {}
    for (const group of groups) {
      // add new score fields here
      scores[group.label] = group.scanScore + group.score
    }

    await leaderboardService.updateAll(scores)
    return success<boolean>(true)
  } catch (error) {
    console.error("Error in PUT /api/leaderboard/update:", error)
    return failure(500, "Internal server error")
  }
}
