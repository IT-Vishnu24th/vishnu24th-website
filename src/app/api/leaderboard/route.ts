import { success, failure } from "@/utils/apiHelpers"
import { AppErrorCode } from "@/types/appErrorCode"
import groupService from "@/services/groupService"
import leaderboardService from "@/services/leaderboardService"
import featureFlagsService from "@/services/featureFlagService"
import { getAuthenticatedRawUser } from "@/lib/auth"
import type { LeaderboardEntry, LeaderboardResponse } from "@/types/leaderboard"

export async function GET() {
  const unknownVessel = { en: "Unknown Vessel", th: "Unknown Vessel" }
  try {
    const [user, groups, clubScanFlag, revealVessel] = await Promise.all([
      getAuthenticatedRawUser(),
      groupService.rawList(),
      featureFlagsService.isEnabled("game-clubscan"),
      featureFlagsService.isEnabled("reveal-vessel"),
    ])

    // if club scan game is active, show live leaderboard from `scanScore`s
    const entries: LeaderboardEntry[] = clubScanFlag
      ? groups.map(({ label, scanScore }) => ({ group: label, score: scanScore }))
      : await leaderboardService.rawList()

    // Sort by score desc, then by label asc to keep order deterministic
    const sorted = [...entries].sort((a, b) => b.score - a.score || a.group.localeCompare(b.group))

    // Normal ranking (eg. 1224)
    const getRank = (score: number) => sorted.filter((g) => g.score > score).length + 1

    const top3 = sorted.slice(0, 3).map((e) => ({
      ...(revealVessel && {
        vesselName: groups.find(({ label }) => label === e.group)?.vesselName ?? unknownVessel,
      }),
      score: e.score,
      rank: getRank(e.score),
    }))

    const group = user && sorted.find((e) => e.group === user.group)
    const rank = group ? getRank(group.score) : null
    const userVesselName = user && groups.find(({ label }) => label === user.group)?.vesselName

    return success<LeaderboardResponse>({
      top3,
      rank,
      score: group ? group.score : null,
      ...(revealVessel && userVesselName && { vesselName: userVesselName }),
    })
  } catch (error) {
    console.error("Failed to fetch ranking:", error)
    return failure(500, AppErrorCode.INTERNAL_ERROR, "Internal server error")
  }
}
