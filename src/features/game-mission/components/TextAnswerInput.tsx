"use client"

import Image from "next/image"
import type { MissionPeriod, UserAnswerHistoryItem } from "@/types/mission"
import { RevealFooter } from "./RevealFooter"

interface TextAnswerInputProps {
  value: string
  onChange: (value: string) => void
  maxLength?: number
  period: MissionPeriod
  imageSrc?: string
  historyItem: UserAnswerHistoryItem | null
  disabled: boolean
}

export function TextAnswerInput({
  value,
  onChange,
  maxLength = 60,
  period,
  imageSrc,
  historyItem,
  disabled,
}: TextAnswerInputProps) {
  const displayValue = historyItem ? (historyItem.userAnswer as string) : value
  const borderClass =
    period === "morning" ? "border-brick-orange text-brownie-dark" : "border-turqoise text-midnight"

  return (
    <div className="flex flex-col items-center gap-6">
      {imageSrc && (
        <div className="relative h-64 w-40 overflow-hidden rounded-2xl border-4 border-white shadow-lg">
          <Image src={imageSrc} alt="" fill className="object-cover" />
        </div>
      )}

      <input
        type="text"
        placeholder="XXX"
        maxLength={maxLength}
        value={displayValue ?? ""}
        disabled={disabled || !!historyItem}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full max-w-xs rounded-2xl border-2 bg-transparent px-6 py-4 text-center text-xl font-fc-quantum outline-none disabled:opacity-70 ${borderClass}`}
      />
      <RevealFooter historyItem={historyItem} />
    </div>
  )
}
