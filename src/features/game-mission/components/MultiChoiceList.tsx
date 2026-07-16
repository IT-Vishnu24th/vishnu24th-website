"use client"

import { ChoiceOption, type ChoiceVisualState } from "./ChoiceOption"
import type { MissionOption, MissionPeriod, UserAnswerHistoryItem } from "@/types/mission"

interface MultiChoiceListProps {
  options: MissionOption[]
  period: MissionPeriod
  /** Locally-picked values, before saving */
  selectedValues: string[]
  onToggle: (value: string) => void
  historyItem: UserAnswerHistoryItem | null
  isLocked: boolean
}

export function MultiChoiceList({
  options,
  period,
  selectedValues,
  onToggle,
  historyItem,
  isLocked,
}: MultiChoiceListProps) {
  const hasSubmitted = !!historyItem
  const isRevealed = historyItem?.isRevealed ?? false
  const correctValues = isRevealed ? ((historyItem?.correctAnswer as string[] | null) ?? []) : []
  const submittedValues = hasSubmitted ? ((historyItem?.userAnswer as string[] | null) ?? []) : []

  return (
    <div className="flex flex-col gap-3 rounded-3xl border-2 p-3 border-current/10">
      {options.map((option) => {
        let state: ChoiceVisualState = "default"
        const wasSubmitted = submittedValues.includes(option.value)
        const isCorrectOption = correctValues.includes(option.value)

        if (isRevealed) {
          if (isCorrectOption) state = "correct"
          else if (wasSubmitted) state = "incorrect"
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
            period={period}
            disabled={disabled}
            onClick={() => !disabled && onToggle(option.value)}
          />
        )
      })}
    </div>
  )
}
