import { GrpcStatus } from "firebase-admin/firestore"
import { NextRequest } from "next/server"
import z from "zod"
import { success, failure, protectRaw, parseBody } from "@/utils/apiHelpers"
import userService from "@/services/userService"
import { getMissionPhase } from "@/services/phaseService"
import type { UserAnswers, UserAnswersResponse } from "@/types/user"
import { QUESTIONS, evaluateAnswer } from "@/utils/questions"

export async function GET() {
  try {
    const [error, user] = await protectRaw("participant")
    if (error) return error

    const userAnswers = await userService.getUserAnswers(user.id)
    const currentTime =
      process.env.NODE_ENV === "development" && process.env.MOCK_CURRENT_TIME
        ? new Date(process.env.MOCK_CURRENT_TIME)
        : new Date()

    const historyList = Object.keys(QUESTIONS)
      .filter((qId) => userAnswers[qId as keyof UserAnswers] !== null)
      .map((qId) => {
        const q = QUESTIONS[qId]
        const userAnswer = userAnswers[qId as keyof UserAnswers]!
        const isRevealed = currentTime >= new Date(q.revealTime)

        return {
          id: qId,
          userAnswer,
          isRevealed,
          isCorrect: isRevealed ? evaluateAnswer(qId, userAnswer) : null,
          correctAnswer: isRevealed ? q.correctAnswer : null,
        }
      })

    return success<UserAnswersResponse>({ answers: historyList })
  } catch (error) {
    console.error("Error in GET /api/users/me/missions:", error)
    return failure(500, "Internal server error")
  }
}

const submitAnswerSchema = z.object({
  id: z.string(),
  answer: z.union([z.string(), z.array(z.string())]),
})

export async function POST(req: NextRequest) {
  try {
    const [error, user] = await protectRaw("participant")
    if (error) return error

    const [parseErr, payload] = await parseBody(req, submitAnswerSchema)
    if (parseErr) return parseErr

    const { id, answer } = payload
    const question = QUESTIONS[id]
    if (!question) {
      return failure(400, "Invalid question ID")
    }

    const missionPhase = await getMissionPhase()
    if (!missionPhase) {
      return failure(500, "Mission phase configuration not found in DB")
    }

    if (missionPhase.current !== question.phaseId) {
      return failure(403, "The submission window for this question is currently closed")
    }

    const userAnswers = await userService.getUserAnswers(user.id)
    if (userAnswers[id as keyof UserAnswers] !== null) {
      return failure(409, "You have already submitted an answer for this question")
    }

    await userService.submitAnswer(user.id, id, answer)

    return success({ message: "Answer submitted successfully" })
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === GrpcStatus.NOT_FOUND) {
      return failure(404, "User profile not found")
    }

    console.error("Error in POST /api/users/me/missions:", error)
    return failure(500, "Internal server error")
  }
}
