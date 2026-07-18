"use client"

import { Check, Sun, Moon, X } from "lucide-react"
import { useMissionHistory } from "../hooks/useMissionHistory"
import { MISSION_QUESTIONS } from "../constants/questions"
import Image from "next/image"
import { useModalStore } from "@/stores/modalStore"
import type { MissionPeriod } from "@/types/mission"

const DAY_PILL = {
  morning: "bg-brick-orange text-cream",
  evening: "bg-midnight-light text-turqoise",
} as const

const THEME = {
  morning: {
    bg: "bg-cream-tanned",
    text: "text-brownie-dark",
    accent: "text-brick-orange",
    button: "bg-brick-orange text-cream",
  },
  evening: {
    bg: "bg-mint",
    text: "text-midnight",
    accent: "text-turqoise",
    button: "bg-midnight text-mint",
  },
} as const

export function HistoryModal({ period }: { period: MissionPeriod }) {
  const close = useModalStore((s) => s.close)
  const { data: history, isLoading, isError } = useMissionHistory()
  const answers = history?.filter((item) => item.userAnswer)
  const theme = THEME[period]

  return (
    <div className="absolute bottom-0 flex max-h-[95vh] w-full max-w-md pt-16 px-6 pb-20 flex-col rounded-3xl">
      <Image src="/game/game-history.png" alt="" fill className="-z-10 object-fill" />

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
        {!isLoading && !isError && (answers?.length ?? 0) === 0 && (
          <p className="py-8 text-center font-fc-quantum text-brownie-dark/70">
            ยังไม่มีคำตอบที่ส่งไป
          </p>
        )}

        <div className="flex flex-col gap-4">
          {answers?.map((entry) => {
            const question = MISSION_QUESTIONS.find((q) => q.id === entry.id)
            if (!question) return null

            const PeriodIcon = question.period === "morning" ? Sun : Moon

            const userAnswer = entry.userAnswer
              ? question.type === "single" || question.type === "multi"
                ? Array.isArray(entry.userAnswer)
                  ? entry.userAnswer
                      .map((ans) => question.options.find((o) => o.value === ans)!)
                      .map((o) => o.label)
                      .join(", ")
                  : question.options.find((o) => o.value === entry.userAnswer)!.label
                : Array.isArray(entry.userAnswer)
                  ? entry.userAnswer.join(", ")
                  : entry.userAnswer
              : "-"

            const correctAnswer =
              question.id === "q4"
                ? "ถูกทุกข้อ"
                : entry.correctAnswer
                  ? question.type === "single" || question.type === "multi"
                    ? Array.isArray(entry.correctAnswer)
                      ? entry.correctAnswer
                          .map((ans) => question.options.find((o) => o.value === ans)!)
                          .map((o) => o.label)
                          .join(", ")
                      : question.options.find((o) => o.value === entry.correctAnswer)!.label
                    : Array.isArray(entry.correctAnswer)
                      ? entry.correctAnswer[0]
                      : entry.correctAnswer
                  : "-"

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
                {question.imageSrc && (
                  <div
                    className={`my-2 h-32 w-full p-2 overflow-hidden rounded-2xl ${THEME[question.period].bg}`}
                  >
                    <div className="relative h-full w-full">
                      <Image src={question.imageSrc} alt="" fill className="object-contain" />
                    </div>
                  </div>
                )}
                <p className="mt-2 font-fc-quantum text-lg text-brownie-dark">{userAnswer}</p>

                {entry.isRevealed ? (
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-fc-quantum text-sm text-brownie">
                      เฉลย: {correctAnswer}
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

      <button
        type="button"
        onClick={close}
        className={`mt-6 self-center rounded-full px-10 py-2.5 font-fc-quantum text-lg ${theme.button}`}
      >
        ปิด
      </button>
    </div>
  )
}
