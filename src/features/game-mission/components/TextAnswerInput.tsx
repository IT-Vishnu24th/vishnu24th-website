"use client"

import Image from "next/image"
import type { MissionQuestion, MissionStatus, UserAnswerHistoryItem } from "@/types/mission"
import { cn } from "@/utils/cn"

interface TextAnswerInputProps {
  value: string
  onChange: (value: string) => void
  question: MissionQuestion
  status: MissionStatus
  historyItem: UserAnswerHistoryItem | null
  correctAnswer: string | null
  isRevealed: boolean
  disabled: boolean
}

export function TextAnswerInput({
  value,
  onChange,
  question,
  status,
  historyItem,
  correctAnswer,
  isRevealed,
  disabled,
}: TextAnswerInputProps) {
  const displayValue = historyItem?.userAnswer
    ? (historyItem.userAnswer as string)
    : isRevealed
      ? correctAnswer
      : status === "open"
        ? value
        : ""
  const borderClass =
    question.period === "morning"
      ? "border-brick-orange text-brownie-dark"
      : "border-turqoise text-midnight"

  const maxLength = question.maxLength ?? 60

  return (
    <div className="w-full flex flex-col items-center gap-6">
      {question.imageSrc && (
        <div className="relative h-60 w-24 overflow-hidden rounded-2xl border-4 border-white shadow-lg">
          <Image src={question.imageSrc} alt="" fill className="object-cover" />
        </div>
      )}

      <div
        className={cn(
          isRevealed &&
            historyItem?.userAnswer != null &&
            `rounded-3xl border-4 p-2 ${historyItem.isCorrect ? "border-status-green" : "border-status-red"}`
        )}
      >
        <input
          type="text"
          placeholder="XXX"
          maxLength={maxLength}
          value={displayValue ?? ""}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full max-w-xs rounded-2xl border-2 bg-transparent px-6 py-4 text-center text-xl font-fc-quantum outline-none disabled:opacity-70 ${borderClass}`}
        />
      </div>
    </div>
  )
}
