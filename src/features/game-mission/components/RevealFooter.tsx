"use client"

import { Check, X } from "lucide-react"
import type { MissionQuestion, UserAnswerHistoryItem } from "@/types/mission"
import { formatBangkokTime, getMissionStatus } from "@/features/game-mission/utils/schedule"

interface RevealFooterProps {
  historyItem: UserAnswerHistoryItem | null
  question: MissionQuestion
}

/** Shown under number/text inputs once submitted, matching the history-card layout (Image 9) */
export function RevealFooter({ historyItem, question }: RevealFooterProps) {
  if (!historyItem) return null

  const userAnswer = historyItem.userAnswer as string | null
  const correctAnswer = historyItem.correctAnswer as string | null

  if (getMissionStatus(question) === "revealed") {
    return null
  }

  if (!historyItem.isRevealed) {
    return (
      <div className="mt-3 text-center font-fc-quantum">
        <p
          className={`font-medium ${question.period === "morning" ? "text-brownie" : "text-midnight-light"}`}
        >
          บันทึกคำตอบเรียบร้อย!
        </p>
        <p className="text-sm">
          รอเฉลยคำตอบพร้อมกัน
          <br />
          {formatBangkokTime(question.revealsAt)} ได้เลย
        </p>
      </div>
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
