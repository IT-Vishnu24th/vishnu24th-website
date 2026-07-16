"use client"

import { Check, Sun, Moon, X } from "lucide-react"
import { useMissionHistory } from "../hooks/useMissionHistory"
import { MISSION_QUESTIONS } from "../constants/questions"
import { HistoryTornPaperEdge } from "./HistoryTornPaperEdge"

const DAY_PILL = {
  morning: "bg-brick-orange text-cream",
  evening: "bg-midnight-light text-turqoise",
} as const

function formatAnswer(answer: string | string[] | null): string {
  if (answer == null) return "-"
  return Array.isArray(answer) ? answer.join(", ") : answer
}

export function HistoryModal() {
  const { data: history, isLoading, isError } = useMissionHistory()

  return (
    <div className="flex max-h-[80vh] w-full max-w-md flex-col overflow-hidden rounded-3xl bg-cream-tanned shadow-2xl">
      <HistoryTornPaperEdge />
      <h2 className="pt-4 pb-3 text-center font-sov-yeehor text-3xl text-brownie-dark">
        ประวัติการตอบ
      </h2>

      <div className="flex-1 overflow-y-auto px-5 pb-6">
        {isLoading && (
          <p className="py-8 text-center font-fc-quantum text-brownie-dark/70">กำลังโหลด...</p>
        )}
        {isError && (
          <p className="py-8 text-center font-fc-quantum text-status-red">โหลดประวัติไม่สำเร็จ</p>
        )}
        {!isLoading && !isError && (history?.length ?? 0) === 0 && (
          <p className="py-8 text-center font-fc-quantum text-brownie-dark/70">
            ยังไม่มีคำตอบที่ส่งไป
          </p>
        )}

        <div className="flex flex-col gap-4">
          {history?.map((entry) => {
            const question = MISSION_QUESTIONS.find((q) => q.id === entry.id)
            if (!question) return null

            const PeriodIcon = question.period === "morning" ? Sun : Moon

            return (
              <div
                key={entry.id}
                className="rounded-2xl border-2 border-brownie-light/30 bg-cream p-4"
              >
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-fc-quantum text-sm ${DAY_PILL[question.period]}`}
                >
                  <PeriodIcon size={14} />
                  DAY {question.day} {question.period === "morning" ? "ช่วงเช้า" : "ช่วงเย็น"}
                </span>

                <p className="mt-3 font-fc-quantum text-brownie-dark">{question.prompt}</p>
                <p className="mt-2 font-fc-quantum text-lg text-brownie-dark">
                  {formatAnswer(entry.userAnswer)}
                </p>

                {entry.isRevealed ? (
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-fc-quantum text-sm text-brownie">
                      เฉลย: {formatAnswer(entry.correctAnswer)}
                    </span>
                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded-full ${
                        entry.isCorrect ? "bg-status-green" : "bg-status-red"
                      }`}
                    >
                      {entry.isCorrect ? (
                        <Check size={16} className="text-status-green-dark" strokeWidth={3} />
                      ) : (
                        <X size={16} className="text-status-red-dark" strokeWidth={3} />
                      )}
                    </span>
                  </div>
                ) : (
                  <p className="mt-2 font-fc-quantum text-sm text-brownie-dark/60">รอการเฉลย</p>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
