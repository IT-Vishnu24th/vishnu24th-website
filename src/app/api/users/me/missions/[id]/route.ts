import { NextRequest } from "next/server"
import { success, failure, protectRaw } from "@/utils/apiHelpers"
import { AppErrorCode } from "@/types/appErrorCode"
import userService from "@/services/userService"
import { QUESTIONS, evaluateAnswer } from "@/utils/questions"
import type { UserAnswers, UserAnswerHistoryItem } from "@/types/user"

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const [error, user] = await protectRaw("participant")
    if (error) return error

    const q = QUESTIONS[id]
    if (!q) {
      return failure(400, AppErrorCode.INVALID_QUESTION_ID, "Invalid question ID")
    }

    const userAnswers = userService.normalizeAnswers(user.answers)
    const userAnswer = userAnswers[id as keyof UserAnswers]

    if (userAnswer === null) {
      return failure(404, AppErrorCode.ANSWER_NOT_FOUND, "Answer not found for this question")
    }

    const currentTime =
      process.env.NODE_ENV === "development" && process.env.MOCK_CURRENT_TIME
        ? new Date(process.env.MOCK_CURRENT_TIME)
        : new Date()

    const isRevealed = currentTime >= new Date(q.revealsAt)

    return success<UserAnswerHistoryItem>({
      id,
      userAnswer,
      isRevealed,
      isCorrect: isRevealed ? evaluateAnswer(id, userAnswer) : null,
      correctAnswer: isRevealed ? q.correctAnswer : null,
    })
  } catch (error) {
    console.error(`Error in GET /api/users/me/missions/${id}:`, error)
    return failure(500, AppErrorCode.INTERNAL_ERROR, "Internal server error")
  }
}
