export type MissionPeriod = "morning" | "evening"

export type MissionQuestionType = "number" | "text" | "single" | "multi"

export interface MissionOption {
  value: string
  label: string
}

export interface MissionQuestion {
  /** Matches the backend mission id, e.g. "q1".."q7" */
  id: string
  day: 1 | 2 | 3 | 4
  period: MissionPeriod
  type: MissionQuestionType
  /** "ปริศนาช่วงเช้า" | "ปริศนาช่วงเย็น" */
  title: string
  prompt: string
  /** Extra small print under the prompt, e.g. "(ตอบแค่ตัวเลข เช่น 67)" */
  hint?: string
  /** Public path to an illustration shown above the input, e.g. "/game/ikyu.png" */
  imageSrc?: string
  options?: MissionOption[]
  /** Max character/digit length for number & text inputs */
  maxLength?: number
  /** Bangkok-local ISO date key, e.g. "2026-07-21" — used to find "today's" questions */
  dateKey: string
  /** ISO datetimes with +07:00 offset */
  opensAt: string
  closesAt: string
  revealsAt: string
}

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
