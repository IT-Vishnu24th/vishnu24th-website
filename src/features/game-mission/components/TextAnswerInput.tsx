"use client"

import Image from "next/image"
import type { MissionQuestion, UserAnswerHistoryItem } from "@/types/mission"
import { RevealFooter } from "./RevealFooter"

interface TextAnswerInputProps {
  value: string
  onChange: (value: string) => void
  question: MissionQuestion
  historyItem: UserAnswerHistoryItem | null
  disabled: boolean
}

export function TextAnswerInput({
  value,
  onChange,
  question,
  historyItem,
  disabled,
}: TextAnswerInputProps) {
  const displayValue = historyItem ? (historyItem.userAnswer as string) : value
  const borderClass =
    question.period === "morning"
      ? "border-brick-orange text-brownie-dark"
      : "border-turqoise text-midnight"

  const maxLength = question.maxLength ?? 60

  return (
    <div className="flex flex-col items-center gap-6">
      {question.imageSrc && (
        <div className="relative h-60 w-24 overflow-hidden rounded-2xl border-4 border-white shadow-lg">
          <Image src={question.imageSrc} alt="" fill className="object-cover" />
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
      <RevealFooter historyItem={historyItem} question={question} />
    </div>
  )
}
