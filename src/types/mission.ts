export type MissionPeriod = "morning" | "evening"

export type MissionQuestionType = MissionQuestion["type"]

export interface MissionOption {
  value: string
  label: string
}

export type MissionQuestion = {
  /** Matches the backend mission id, e.g. "q1".."q7" */
  id: string
  day: 1 | 2 | 3 | 4
  period: MissionPeriod
  /** "ปริศนาช่วงเช้า" | "ปริศนาช่วงเย็น" */
  title: string
  prompt: string
  /** Extra small print under the prompt, e.g. "(ตอบแค่ตัวเลข เช่น 67)" */
  hint?: string
  /** Public path to an illustration shown above the input, e.g. "/game/ikyu.png" */
  imageSrc?: string
  /** Max character/digit length for number & text inputs */
  maxLength?: number
  /** Bangkok-local ISO date key, e.g. "2026-07-21" — used to find "today's" questions */
  dateKey: string
  /** ISO datetimes with +07:00 offset */
  opensAt: string
  closesAt: string
  revealsAt: string
} & (
  | {
      type: "number" | "text"
    }
  | {
      type: "single" | "multi"
      options: MissionOption[]
    }
)

export type MissionStatus = "locked" | "open" | "awaiting-reveal" | "revealed"

export interface UserAnswerHistoryItem {
  id: string
  userAnswer: string | string[] | null
  isRevealed: boolean
  isCorrect: boolean | null
  correctAnswer: string | string[] | null
}

export interface MissionApiError {
  code?: string
  message: string
}
