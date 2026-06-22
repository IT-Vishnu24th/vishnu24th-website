import { success, failure, protect } from "@/utils/apiHelpers"
import groupService from "@/services/groupService"
import featureFlagsService from "@/services/featureFlagService"
import type { RankingResponse } from "@/types/group"

export async function GET() {
  try {
    const [error] = await protect()
    if (error) return error

    const groups = await groupService.rawList()

    // Sort by score desc, then by label asc to keep order deterministic
    const sorted = [...groups].sort((a, b) => b.score - a.score || a.label.localeCompare(b.label))

    const showFullGroup = await featureFlagsService.getFlag("show-group")

    const getRank = (score: number) => sorted.findIndex((g) => g.score === score) + 1

    const top3 = sorted.slice(0, 3).map((g) => ({
      ...groupService.mapToPublic(g, showFullGroup),
      rank: getRank(g.score),
    }))

    return success<RankingResponse>({ top3 })
  } catch (error) {
    console.error("Failed to fetch ranking:", error)
    return failure(500, "Internal server error")
  }
}
