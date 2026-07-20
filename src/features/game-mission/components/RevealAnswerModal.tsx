"use client"

import { ReceiptText } from "lucide-react"
import type { MissionPeriod, MissionQuestion, UserAnswerHistoryItem } from "@/types/mission"
import { useModalStore } from "@/stores/modalStore"

interface RevealAnswerModalProps {
  question: MissionQuestion
  historyItem: UserAnswerHistoryItem
  correctAnswer: string | null
}

const THEME = {
  morning: {
    bg: "bg-cream-tanned",
    text: "text-brownie",
    accent: "text-brick-orange",
    button: "bg-brick-orange text-cream",
  },
  evening: {
    bg: "bg-mint",
    text: "text-midnight-light",
    accent: "text-turqoise",
    button: "bg-midnight text-mint",
  },
} satisfies Record<MissionPeriod, { bg: string; text: string; accent: string; button: string }>

export function RevealAnswerModal({
  question,
  historyItem,
  correctAnswer,
}: RevealAnswerModalProps) {
  const close = useModalStore((s) => s.close)
  const theme = THEME[question.period]

  return (
    <div
      className={`w-full max-w-md rounded-3xl ${theme.bg} ${theme.text} px-6 py-8 text-center shadow-2xl`}
    >
      <ReceiptText className={`mx-auto mb-2 ${theme.accent}`} size={28} />
      <h2 className="font-sov-yeehor text-5xl">เฉลยปริศนา</h2>

      <div className="mt-6 flex flex-col items-center gap-4">
        <p className="font-fc-quantum text-balance">{question.prompt}</p>
        <p className={`font-sov-yeehor text-7xl -mt-7 py-1 ${theme.accent}`}>
          {historyItem.userAnswer}
        </p>
        <p className="font-fc-quantum">เป็นคำตอบที่...</p>
        <div className="flex flex-col items-center gap-1">
          <p className="rounded-xl overflow-clip font-sov-yeehor text-5xl">
            {historyItem.isCorrect ? (
              <span className="relative -top-2 px-4 py-1 text-status-green-dark bg-status-green">
                ถูกต้องงง!
              </span>
            ) : (
              <span className="relative -top-2 px-4 py-1 text-status-red bg-status-red-dark">
                อาจจะยังน้า
              </span>
            )}
          </p>
          {!historyItem.isCorrect && correctAnswer && (
            <p className="mt-2 font-fc-quantum">เฉลย: {correctAnswer}</p>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={close}
        className={`mt-6 rounded-full px-10 py-2.5 font-fc-quantum text-lg ${theme.button}`}
      >
        ปิด
      </button>
    </div>
  )
}
