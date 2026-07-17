"use client"

import type { MissionQuestion, UserAnswerHistoryItem } from "@/types/mission"
import { cn } from "@/utils/cn"

interface NumberAnswerInputProps {
  value: string
  onChange: (value: string) => void
  question: MissionQuestion
  historyItem: UserAnswerHistoryItem | null
  isRevealed: boolean
  disabled: boolean
}

export function NumberAnswerInput({
  value,
  onChange,
  question,
  historyItem,
  isRevealed,
  disabled,
}: NumberAnswerInputProps) {
  const displayValue = historyItem ? (historyItem.userAnswer as string) : value
  const borderClass =
    question.period === "morning"
      ? "border-brick-orange text-brownie-dark"
      : "border-turqoise text-midnight"

  const maxLength = question.maxLength ?? 3

  return (
    <div className="w-full flex flex-col items-center">
      <div
        className={cn(
          isRevealed &&
            !!historyItem &&
            `rounded-3xl border-4 p-2 ${historyItem.isCorrect ? "border-status-green" : "border-status-red"}`
        )}
      >
        <input
          type="text"
          inputMode="numeric"
          pattern="\d*"
          placeholder="XXX"
          maxLength={maxLength}
          value={displayValue ?? ""}
          disabled={disabled || !!historyItem}
          onChange={(e) => {
            const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, maxLength)
            onChange(digitsOnly)
          }}
          className={`w-40 max-w-full rounded-2xl border-2 bg-transparent px-6 py-4 text-center text-3xl font-fc-quantum tracking-widest outline-none disabled:opacity-70 ${borderClass}`}
        />
      </div>
    </div>
  )
}
