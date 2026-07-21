"use client"

import { ChoiceOption, type ChoiceVisualState } from "./ChoiceOption"
import type { MissionQuestion, MissionStatus, UserAnswerHistoryItem } from "@/types/mission"

interface MultiChoiceListProps {
  question: Extract<MissionQuestion, { type: "single" | "multi" }>
  status: MissionStatus
  /** Locally-picked values, before saving */
  selectedValues: string[]
  onToggle: (value: string) => void
  historyItem: UserAnswerHistoryItem | null
  isRevealed: boolean
  isLocked: boolean
}

export function MultiChoiceList({
  question,
  status,
  selectedValues,
  onToggle,
  historyItem,
  isRevealed,
  isLocked,
}: MultiChoiceListProps) {
  const hasSubmitted = !!historyItem?.userAnswer
  const correctValues = isRevealed ? ((historyItem?.correctAnswer as string[] | null) ?? []) : []
  const submittedValues = hasSubmitted ? ((historyItem?.userAnswer as string[] | null) ?? []) : []

  return (
    <div className="flex flex-col gap-3 rounded-3xl border-2 p-3 border-current/10">
      {question.options.map((option) => {
        let state: ChoiceVisualState = "default"
        const wasSubmitted = submittedValues.includes(option.value)
        const isCorrectOption = correctValues.includes(option.value)

        if (isRevealed) {
          if (isCorrectOption && (wasSubmitted || !hasSubmitted)) state = "correct"
          else if (isCorrectOption !== wasSubmitted) state = "incorrect"
          else state = "muted"
        } else if (hasSubmitted) {
          state = wasSubmitted ? "locked" : "muted"
        } else if (selectedValues.includes(option.value)) {
          state = "active"
        }

        const disabled = hasSubmitted || isLocked

        return (
          <ChoiceOption
            key={option.value}
            label={option.label}
            state={state}
            hidden={status === "locked"}
            period={question.period}
            disabled={disabled}
            onClick={() => !disabled && onToggle(option.value)}
          />
        )
      })}
    </div>
  )
}
