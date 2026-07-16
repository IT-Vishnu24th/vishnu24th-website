"use client"

import { Check, X } from "lucide-react"
import type { UserAnswerHistoryItem } from "@/types/mission"

interface RevealFooterProps {
  historyItem: UserAnswerHistoryItem | null
}

/** Shown under number/text inputs once submitted, matching the history-card layout (Image 9) */
export function RevealFooter({ historyItem }: RevealFooterProps) {
  if (!historyItem) return null

  const userAnswer = historyItem.userAnswer as string | null
  const correctAnswer = historyItem.correctAnswer as string | null

  if (!historyItem.isRevealed) {
    return (
      <p className="mt-3 text-center text-sm opacity-70 font-fc-quantum">
        ส่งคำตอบแล้ว
        <br />
        รอเฉลยตามเวลาที่กำหนด
      </p>
    )
  }

  return (
    <div className="mt-3 flex items-center justify-center gap-2 font-fc-quantum">
      {historyItem.isCorrect ? (
        <Check className="text-status-green" size={20} strokeWidth={3} />
      ) : (
        <X className="text-status-red" size={20} strokeWidth={3} />
      )}
      <span className="text-sm">
        คำตอบของคุณ: {userAnswer ?? "-"}
        {!historyItem.isCorrect && correctAnswer ? ` · เฉลย: ${correctAnswer}` : ""}
      </span>
    </div>
  )
}
