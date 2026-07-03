import { NextRequest } from "next/server"
import groupService from "@/services/groupService"
import { success, failure, protectRaw } from "@/utils/apiHelpers"
import type { GroupStatsResponse } from "@/types/group"

export async function GET(req: NextRequest) {
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

    const format = req.nextUrl.searchParams.get("format")
    if (format === "csv") {
      const headers = ["label", "vesselName", "scanScore", "score"]
      const csvRows = [headers.join(",")]

      stats.forEach((row) => {
        const escapedVesselName = `"${row.vesselName.replace(/"/g, '""')}"`
        const line = [row.label, escapedVesselName, row.scanScore, row.score].join(",")
        csvRows.push(line)
      })

      // Add UTF-8 BOM (\ufeff) to make Excel parse Thai characters correctly
      const csvContent = "\ufeff" + csvRows.join("\r\n")

      return new Response(csvContent, {
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": 'attachment; filename="groups_stats.csv"',
        },
      })
    }

    return success<GroupStatsResponse[]>(stats)
  } catch (error) {
    console.error("Error in GET /api/admin/stats/groups:", error)
    return failure(500, "Internal server error")
  }
}
