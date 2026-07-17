"use client"

import type { MissionQuestion, UserAnswerHistoryItem } from "@/types/mission"

interface NumberAnswerInputProps {
  value: string
  onChange: (value: string) => void
  question: MissionQuestion
  historyItem: UserAnswerHistoryItem | null
  disabled: boolean
}

export function NumberAnswerInput({
  value,
  onChange,
  question,
  historyItem,
  disabled,
}: NumberAnswerInputProps) {
  const displayValue = historyItem ? (historyItem.userAnswer as string) : value
  const borderClass =
    question.period === "morning"
      ? "border-brick-orange text-brownie-dark"
      : "border-turqoise text-midnight"

  const maxLength = question.maxLength ?? 3

  return (
    <div className="flex flex-col items-center">
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
        className={`w-40 rounded-2xl border-2 bg-transparent px-6 py-4 text-center text-3xl font-fc-quantum tracking-widest outline-none disabled:opacity-70 ${borderClass}`}
      />
    </div>
  )
}
