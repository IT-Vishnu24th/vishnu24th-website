import { GrpcStatus } from "firebase-admin/firestore"
import { NextRequest } from "next/server"
import z from "zod"
import { success, failure, protectRaw, parseBody } from "@/utils/apiHelpers"
import { AppErrorCode } from "@/types/appErrorCode"
import userService from "@/services/userService"
import { getMissionPhase } from "@/services/phaseService"
import type { UserAnswers, UserAnswersResponse } from "@/types/user"
import { QUESTIONS, evaluateAnswer } from "@/utils/questions"
import { getAuthenticatedRawUser } from "@/lib/auth"

// even if not logged in, should give correct answers to revealed questions
export async function GET() {
  try {
    const user = await getAuthenticatedRawUser()

    const userAnswers = userService.normalizeAnswers(user?.answers)
    const currentTime =
      process.env.NODE_ENV === "development" && process.env.MOCK_CURRENT_TIME
        ? new Date(process.env.MOCK_CURRENT_TIME)
        : new Date()

    const historyList = Object.keys(QUESTIONS).map((qId) => {
      const q = QUESTIONS[qId]
      const userAnswer = userAnswers[qId as keyof UserAnswers] ?? null
      const isRevealed = currentTime >= new Date(q.revealsAt)

      return {
        id: qId,
        userAnswer,
        isRevealed,
        isCorrect: userAnswer && isRevealed ? evaluateAnswer(qId, userAnswer) : null,
        correctAnswer: isRevealed ? q.correctAnswer : null,
      }
    })

    return success<UserAnswersResponse>({ answers: historyList })
  } catch (error) {
    console.error("Error in GET /api/users/me/missions:", error)
    return failure(500, AppErrorCode.INTERNAL_ERROR, "Internal server error")
  }
}

const submitAnswerSchema = z.object({
  id: z.string(),
  answer: z.union([z.string(), z.array(z.string()).min(1)]),
})

export async function POST(req: NextRequest) {
  try {
    const [error, user] = await protectRaw("participant")
    if (error) return error

    const [parseErr, payload] = await parseBody(req, submitAnswerSchema)
    if (parseErr) return parseErr

    const currentTime =
      process.env.NODE_ENV === "development" && process.env.MOCK_CURRENT_TIME
        ? new Date(process.env.MOCK_CURRENT_TIME)
        : new Date()

    const { id, answer } = payload
    const question = QUESTIONS[id]
    if (!question) {
      return failure(400, AppErrorCode.INVALID_QUESTION_ID, "Invalid question ID")
    }

    if (question.type === "multi-choice") {
      if (!Array.isArray(answer)) {
        return failure(
          400,
          AppErrorCode.INVALID_ANSWER_FORMAT,
          "Answer must be an array of strings for multi-choice questions"
        )
      }
    } else {
      if (typeof answer !== "string") {
        return failure(
          400,
          AppErrorCode.INVALID_ANSWER_FORMAT,
          "Answer must be a single string for this question type"
        )
      }
    }

    const missionPhase = await getMissionPhase()
    if (!missionPhase) {
      return failure(
        500,
        AppErrorCode.INTERNAL_ERROR,
        "Mission phase configuration not found in DB"
      )
    }

    if (
      missionPhase.current !== question.phaseId ||
      currentTime < new Date(question.opensAt) ||
      currentTime >= new Date(question.closesAt)
    ) {
      return failure(
        403,
        AppErrorCode.SUBMISSION_CLOSED,
        "The submission window for this question is currently closed"
      )
    }

    const userAnswers = userService.normalizeAnswers(user.answers)
    if (userAnswers[id as keyof UserAnswers] !== null) {
      return failure(
        409,
        AppErrorCode.ANSWER_ALREADY_SUBMITTED,
        "You have already submitted an answer for this question"
      )
    }

    await userService.submitAnswer(user.id, id, answer)

    return success({ message: "Answer submitted successfully" })
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === GrpcStatus.NOT_FOUND) {
      return failure(404, AppErrorCode.USER_NOT_FOUND, "User profile not found")
    }

    console.error("Error in POST /api/users/me/missions:", error)
    return failure(500, AppErrorCode.INTERNAL_ERROR, "Internal server error")
  }
}
