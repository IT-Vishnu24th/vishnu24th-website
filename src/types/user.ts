import type { Vessel } from "@/types/group"
import type { MultiLang } from "@/types/util"

export interface Name {
  title: string
  firstName: string
  middleName?: string
  surname: string
  nickname: string
}

// staff = year 2 (68x) ; participant = year 1 (69x)
export type UserRole = "admin" | "staff" | "participant"

export interface UserAnswers {
  q1: string | null
  q2: string | null
  q3: string | null
  q4: string[] | null
  q5: string | null
  q6: string | null
  q7: string | null
}

export interface User {
  id: string // student id
  role: UserRole
  name: MultiLang<Name>
  group: Vessel
  department: MultiLang
  prefLanguage: keyof MultiLang
  /** missing on old docs = false */
  yarnAccepted: boolean
}

export type AuthUser = Pick<User, "id" | "name" | "role" | "prefLanguage" | "yarnAccepted">

export interface UserAnswerHistoryItem {
  id: string
  userAnswer: string | string[] | null
  isRevealed: boolean
  isCorrect: boolean | null
  correctAnswer: string | string[] | null
}

export interface UserAnswersResponse {
  answers: UserAnswerHistoryItem[]
}
