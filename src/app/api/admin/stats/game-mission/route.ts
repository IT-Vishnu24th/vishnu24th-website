import { NextRequest } from "next/server"
import userService from "@/services/userService"
import groupService from "@/services/groupService"
import { success, failure, protectRaw } from "@/utils/apiHelpers"
import { QUESTIONS, evaluateAnswer } from "@/utils/questions"
import type { UserAnswers } from "@/types/user"

type QuizStatsResponse = Record<string, Record<string, number>>

export async function GET(req: NextRequest) {
  try {
    const [error] = await protectRaw("admin")
    if (error) return error

    const id = req.nextUrl.searchParams.get("id") || undefined

    if (id && !QUESTIONS[id]) {
      return failure(400, "Invalid question ID")
    }

    const [users, groups] = await Promise.all([userService.rawList(), groupService.rawList()])

    const vesselNameMap: Record<string, string> = {}
    groups.forEach((g) => {
      vesselNameMap[g.label] = g.vesselName.th
    })

    const groupNames = groups.map((g) => vesselNameMap[g.label] || g.label)

    const report: QuizStatsResponse = {}
    const questionIds = id ? [id] : Object.keys(QUESTIONS)

    questionIds.forEach((qId) => {
      report[qId] = {}
      groupNames.forEach((name) => {
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

    return success<QuizStatsResponse>(report)
  } catch (error) {
    console.error("Error in GET /api/admin/stats/game-mission:", error)
    return failure(500, "Internal server error")
  }
}
