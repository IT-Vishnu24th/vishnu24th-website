import { NextRequest } from "next/server"
import groupService from "@/services/groupService"
import { success, failure, protectRaw } from "@/utils/apiHelpers"

export interface GroupStatsResponse {
  label: string
  vesselName: string
  scanScore: number
  score: number
}

export async function GET(_req: NextRequest) {
  try {
    const [error] = await protectRaw("admin")
    if (error) return error

    const groups = await groupService.rawList()

    // sorted by label
    const sortedGroups = [...groups].sort((a, b) => a.label.localeCompare(b.label))

    const stats: GroupStatsResponse[] = sortedGroups.map((g) => ({
      label: g.label,
      vesselName: g.vesselName.th,
      scanScore: typeof g.scanScore === "number" ? g.scanScore : 0,
      score: typeof g.score === "number" ? g.score : 0,
    }))

    return success<GroupStatsResponse[]>(stats)
  } catch (error) {
    console.error("Error in GET /api/admin/stats/groups:", error)
    return failure(500, "Internal server error")
  }
}
