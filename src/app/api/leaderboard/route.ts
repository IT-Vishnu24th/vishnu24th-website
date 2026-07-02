import { success, failure } from "@/utils/apiHelpers"
import groupService from "@/services/groupService"
import leaderboardService from "@/services/leaderboardService"
import { getAuthenticatedRawUser } from "@/lib/auth"
import type { LeaderboardResponse } from "@/types/leaderboard"

export async function GET() {
  const unknownVessel = { en: "Unknown Vessel", th: "Unknown Vessel" }
  try {
    const user = await getAuthenticatedRawUser()

    const entries = await leaderboardService.rawList()
    const groups = await groupService.rawList()

    // Sort by score desc, then by label asc to keep order deterministic
    const sorted = [...entries].sort((a, b) => b.score - a.score || a.group.localeCompare(b.group))

    // Normal ranking (eg. 1224)
    const getRank = (score: number) => sorted.filter((g) => g.score > score).length + 1

    const top3 = sorted.slice(0, 3).map((e) => ({
      vesselName: groups.find(({ label }) => label === e.group)?.vesselName ?? unknownVessel,
      score: e.score,
      rank: getRank(e.score),
    }))

    const group = user && sorted.find((e) => e.group === user.group)
    const rank = group ? getRank(group.score) : null

    return success<LeaderboardResponse>({ top3, rank })
  } catch (error) {
    console.error("Failed to fetch ranking:", error)
    return failure(500, "Internal server error")
  }
}
