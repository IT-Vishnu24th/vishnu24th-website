import { NextResponse } from "next/server"
import { getAuthenticatedRawUser } from "@/lib/auth"
import groupService from "@/services/groupService"
import featureFlagsService from "@/services/featureFlagService"
import type { RankingResponse } from "@/types/group"

export async function GET() {
  try {
    const user = await getAuthenticatedRawUser()
    if (!user) {
      return NextResponse.json({ error: "unauthorized", message: "Unauthorized" }, { status: 401 })
    }

    const groups = await groupService.rawList()

    // Sort by score desc, then by label asc to keep order deterministic
    const sorted = [...groups].sort((a, b) => b.score - a.score || a.label.localeCompare(b.label))

    const showFullGroup = await featureFlagsService.getFlag("show-group")

    const getRank = (score: number) => sorted.findIndex((g) => g.score === score) + 1

    const top3 = sorted.slice(0, 3).map((g) => ({
      ...groupService.mapToPublic(g, showFullGroup),
      rank: getRank(g.score),
    }))

    const userGroup = user.group ? sorted.find((g) => g.label === user.group) : null
    const userYaan = userGroup
      ? {
          ...groupService.mapToPublic(userGroup, showFullGroup),
          rank: getRank(userGroup.score),
        }
      : null

    return NextResponse.json<RankingResponse>({ top3, userYaan }, { status: 200 })
  } catch (error) {
    console.error("Failed to fetch ranking:", error)
    return NextResponse.json(
      { error: "internal-server-error", message: "Failed to fetch ranking" },
      { status: 500 }
    )
  }
}
