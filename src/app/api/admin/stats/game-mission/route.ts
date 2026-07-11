import { NextRequest } from "next/server"
import userService from "@/services/userService"
import groupService from "@/services/groupService"
import { success, failure, protectRaw } from "@/utils/apiHelpers"
import { AppErrorCode } from "@/types/appErrorCode"
import { QUESTIONS, evaluateAnswer } from "@/utils/questions"
import type { UserAnswers } from "@/types/user"

type MissionStatsResponse = Record<string, Record<string, number>>

export async function GET(req: NextRequest) {
  try {
    const [error] = await protectRaw("admin")
    if (error) return error

    const id = req.nextUrl.searchParams.get("id") || undefined

    if (id && !QUESTIONS[id]) {
      return failure(400, AppErrorCode.INVALID_QUESTION_ID, "Invalid question ID")
    }

    const [users, groups] = await Promise.all([userService.rawList(), groupService.rawList()])

    // sorted by label
    const sortedGroups = [...groups].sort((a, b) => a.label.localeCompare(b.label))

    const vesselNameMap: Record<string, string> = {}
    sortedGroups.forEach((g) => {
      vesselNameMap[g.label] = g.vesselName.th
    })

    const report: MissionStatsResponse = {}
    const questionIds = id ? [id] : Object.keys(QUESTIONS)

    questionIds.forEach((qId) => {
      report[qId] = {}
      sortedGroups.forEach((g) => {
        const name = g.vesselName.th
        report[qId][name] = 0
      })
    })

    users.forEach((user) => {
      const groupId = user.group
      if (!groupId) return

      const groupKey = vesselNameMap[groupId] || groupId
      const answers = user.answers

      if (!answers) return

      for (const qId of questionIds) {
        const answer = answers[qId as keyof UserAnswers]
        if (answer !== null && answer !== undefined) {
          const isCorrect = evaluateAnswer(qId, answer)
          if (isCorrect) {
            report[qId][groupKey] = (report[qId][groupKey] || 0) + 1
          }
        }
      }
    })

    const format = req.nextUrl.searchParams.get("format")
    if (format === "csv") {
      const headers = ["label", "vesselName", ...questionIds]
      const csvRows = [headers.join(",")]

      sortedGroups.forEach((g) => {
        const name = g.vesselName.th
        const row = [
          g.label,
          `"${name.replace(/"/g, '""')}"`,
          ...questionIds.map((qId) => report[qId][name] ?? 0),
        ]
        csvRows.push(row.join(","))
      })

      // Add UTF-8 BOM (\ufeff) to make Excel parse Thai characters correctly
      const csvContent = "\ufeff" + csvRows.join("\r\n")

      const filename = `game_mission_stats${(id && `_${id}`) || ""}.csv`

      return new Response(csvContent, {
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="${filename}"`,
        },
      })
    }

    return success<MissionStatsResponse>(report)
  } catch (error) {
    console.error("Error in GET /api/admin/stats/game-mission:", error)
    return failure(500, AppErrorCode.INTERNAL_ERROR, "Internal server error")
  }
}
