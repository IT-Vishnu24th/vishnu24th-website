"use client"

import type { MissionPeriod, UserAnswerHistoryItem } from "@/types/mission"
import { RevealFooter } from "./RevealFooter"

interface NumberAnswerInputProps {
  value: string
  onChange: (value: string) => void
  maxLength: number
  period: MissionPeriod
  historyItem: UserAnswerHistoryItem | null
  disabled: boolean
}

export function NumberAnswerInput({
  value,
  onChange,
  maxLength,
  period,
  historyItem,
  disabled,
}: NumberAnswerInputProps) {
  const displayValue = historyItem ? (historyItem.userAnswer as string) : value
  const borderClass =
    period === "morning" ? "border-brick-orange text-brownie-dark" : "border-turqoise text-midnight"

  return (
    <div className="flex flex-col items-center">
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
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
      <RevealFooter historyItem={historyItem} />
    </div>
  )
}
