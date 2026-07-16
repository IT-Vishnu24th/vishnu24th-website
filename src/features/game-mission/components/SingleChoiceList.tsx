"use client"

import { RevealFooter } from "@/features/game-mission/components/RevealFooter"
import { ChoiceOption, type ChoiceVisualState } from "./ChoiceOption"
import type { MissionQuestion, UserAnswerHistoryItem } from "@/types/mission"

interface SingleChoiceListProps {
  question: Extract<MissionQuestion, { type: "single" | "multi" }>
  /** Locally-picked value, before saving */
  selectedValue: string | null
  onSelect: (value: string) => void
  /** Server-truth submission, once one exists */
  historyItem: UserAnswerHistoryItem | null
  /** true once the question window has closed (locks picking) */
  isLocked: boolean
}

export function SingleChoiceList({
  question,
  selectedValue,
  onSelect,
  historyItem,
  isLocked,
}: SingleChoiceListProps) {
  const hasSubmitted = !!historyItem
  const isRevealed = historyItem?.isRevealed ?? false
  const correctValue = isRevealed ? (historyItem?.correctAnswer as string | null) : null
  const submittedValue = hasSubmitted ? (historyItem?.userAnswer as string | null) : null

  return (
    <div className="flex flex-col gap-3 rounded-3xl border-2 p-3 border-current/10">
      {question.options.map((option) => {
        let state: ChoiceVisualState = "default"

        if (isRevealed) {
          if (option.value === correctValue) state = "correct"
          else if (option.value === submittedValue) state = "incorrect"
          else state = "muted"
        } else if (hasSubmitted) {
          state = option.value === submittedValue ? "locked" : "muted"
        } else if (option.value === selectedValue) {
          state = "active"
        }

        const disabled = hasSubmitted || isLocked

        return (
          <ChoiceOption
            key={option.value}
            label={option.label}
            state={state}
            period={question.period}
            disabled={disabled}
            onClick={() => !disabled && onSelect(option.value)}
          />
        )
      })}
      <RevealFooter historyItem={historyItem} question={question} />
    </div>
  )
}
