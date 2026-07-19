"use client"

import { useState } from "react"
import { Eye, Save } from "lucide-react"
import NavigationFooter from "@/components/NavigationFooter"
import { useModalStore } from "@/stores/modalStore"
import type { MissionQuestion } from "@/types/mission"
import { getMissionStatus, formatBangkokTime } from "../utils/schedule"
import { useMissionHistoryItem } from "../hooks/useMissionHistory"
import { useSubmitMissionAnswer } from "../hooks/useSubmitMissionAnswer"
import { MissionHeaderBanner } from "./MissionHeaderBanner"
import { HowToPlayModal } from "./HowToPlayModal"
import { HistoryModal } from "./HistoryModal"
import { SaveConfirmModal } from "./SaveConfirmModal"
import { SingleChoiceList } from "./SingleChoiceList"
import { MultiChoiceList } from "./MultiChoiceList"
import { NumberAnswerInput } from "./NumberAnswerInput"
import { TextAnswerInput } from "./TextAnswerInput"
import { BackgroundIllustration } from "./BackgroundIllustration"
import { PageBottomGlobe } from "./PageBottomGlobe"
import { RevealAnswerModal } from "@/features/game-mission/components/RevealAnswerModal"
import useAuth from "@/hooks/useAuth"

interface MissionQuestionScreenProps {
  question: MissionQuestion
}

const BODY_BG = {
  morning: "bg-cream-tanned",
  evening: "bg-mint",
} as const

const BODY_TEXT = {
  morning: "text-brick-orange",
  evening: "text-midnight",
} as const

const EMPHASIS_TEXT = {
  morning: "text-brownie",
  evening: "text-midnight-light",
} as const

export function MissionQuestionScreen({ question }: MissionQuestionScreenProps) {
  const open = useModalStore((s) => s.open)
  const status = getMissionStatus(question)
  const { item: historyItem, isPending } = useMissionHistoryItem(question.id)
  const submitMutation = useSubmitMissionAnswer()

  const { user, loading } = useAuth()
  const [singleValue, setSingleValue] = useState<string | null>(null)
  const [multiValues, setMultiValues] = useState<string[]>([])
  const [textValue, setTextValue] = useState("")
  const [isRevealed, setRevealed] = useState(false)

  const isLoggedIn = !loading && !!user
  const notLoggedIn = !loading && !user
  const hasSubmitted = !!historyItem?.userAnswer
  const isLocked = status !== "open" || hasSubmitted || notLoggedIn

  const currentAnswer: string | string[] | null =
    question.type === "single"
      ? singleValue
      : question.type === "multi"
        ? multiValues
        : textValue.trim() || null

  const correctAnswer =
    question.id === "q4"
      ? "ถูกทุกข้อ"
      : historyItem?.correctAnswer
        ? question.type === "single" || question.type === "multi"
          ? Array.isArray(historyItem.correctAnswer)
            ? historyItem.correctAnswer
                .map((ans) => question.options.find((o) => o.value === ans)!)
                .map((o) => o.label)
                .join(", ")
            : question.options.find((o) => o.value === historyItem.correctAnswer)!.label
          : Array.isArray(historyItem.correctAnswer)
            ? historyItem.correctAnswer[0]
            : historyItem.correctAnswer
        : null

  const canSave =
    status === "open" &&
    isLoggedIn &&
    !hasSubmitted &&
    (question.type === "multi" ? multiValues.length > 0 : !!currentAnswer)

  const canReveal =
    status === "revealed" &&
    correctAnswer &&
    // situations without modal - if revealed, disable button
    !(isRevealed && (question.type === "single" || question.type === "multi" || !hasSubmitted))

  function handleSaveClick() {
    if (!canSave || currentAnswer === null) return

    open(
      <SaveConfirmModal
        period={question.period}
        isSubmitting={submitMutation.isPending}
        onConfirm={() => {
          submitMutation.mutate(
            { id: question.id, answer: currentAnswer },
            {
              onSuccess: () => useModalStore.getState().close(),
            }
          )
        }}
      />
    )
  }

  function handleRevealClick() {
    if (hasSubmitted && (question.type === "number" || question.type === "text")) {
      setTimeout(() => setRevealed(true), 50)
      open(
        <RevealAnswerModal
          question={question}
          historyItem={historyItem}
          correctAnswer={correctAnswer}
        />
      )
    } else {
      setRevealed(true)
    }
  }

  return (
    <div
      className={`relative min-h-screen pb-56 ${BODY_BG[question.period]} ${BODY_TEXT[question.period]}`}
    >
      <PageBottomGlobe period={question.period} />

      <div className="relative z-10">
        <MissionHeaderBanner
          question={question}
          showTopBar
          onHistoryClick={() => open(<HistoryModal period={question.period} />)}
          onHelpClick={() => open(<HowToPlayModal period={question.period} />)}
        />

        <div className="relative mt-8 flex flex-col items-center gap-6 px-24">
          <BackgroundIllustration period={question.period} />

          <div className="relative mx-auto z-10 flex flex-col items-center gap-2">
            {status === "revealed" && (
              <div
                className={`mb-4 text-center text-xl font-fc-quantum ${EMPHASIS_TEXT[question.period]}`}
              >
                เฉลยมาแล้ว!
              </div>
            )}

            {/* Answer section */}
            <>
              {question.type === "single" && (
                <SingleChoiceList
                  question={question}
                  selectedValue={singleValue}
                  onSelect={setSingleValue}
                  historyItem={historyItem}
                  isRevealed={isRevealed}
                  isLocked={isLocked}
                />
              )}

              {question.type === "multi" && (
                <MultiChoiceList
                  question={question}
                  selectedValues={multiValues}
                  onToggle={(value) =>
                    setMultiValues((prev) =>
                      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
                    )
                  }
                  historyItem={historyItem}
                  isRevealed={isRevealed}
                  isLocked={isLocked}
                />
              )}

              {question.type === "number" && (
                <NumberAnswerInput
                  value={textValue}
                  onChange={setTextValue}
                  question={question}
                  status={status}
                  historyItem={historyItem}
                  correctAnswer={correctAnswer}
                  isRevealed={isRevealed}
                  disabled={isLocked}
                />
              )}

              {question.type === "text" && (
                <TextAnswerInput
                  value={textValue}
                  onChange={setTextValue}
                  question={question}
                  status={status}
                  historyItem={historyItem}
                  correctAnswer={correctAnswer}
                  isRevealed={isRevealed}
                  disabled={isLocked}
                />
              )}
            </>

            {status === "revealed" && hasSubmitted && (
              <div
                className={`mt-4 text-center text-lg font-fc-quantum ${EMPHASIS_TEXT[question.period]}`}
              >
                <p>
                  เป็นคำตอบที่
                  {isRevealed ? (
                    historyItem.isCorrect ? (
                      <span className="font-bold text-status-green-dark">ถูกต้อง!</span>
                    ) : (
                      <span className="font-bold text-status-red-dark">ผิด...</span>
                    )
                  ) : (
                    "..."
                  )}
                </p>
                {isRevealed && !historyItem.isCorrect && correctAnswer && (
                  <p>
                    เฉลย: <span className="font-semibold">{correctAnswer}</span>
                  </p>
                )}
              </div>
            )}

            <div className="mt-2 text-center font-fc-quantum opacity-80">
              <div className={`font-medium ${EMPHASIS_TEXT[question.period]}`}>
                {status === "open" && notLoggedIn && <p className="mb-2">กรุณาเข้าสู่ระบบ</p>}
                {status !== "revealed" && hasSubmitted && (
                  <p className="mb-2">บันทึกคำตอบเรียบร้อย!</p>
                )}
                {status === "locked" && <p>เปิดให้ตอบ {formatBangkokTime(question.opensAt)}</p>}
                {status === "open" && !hasSubmitted && (
                  <p>ปิดรับคำตอบ {formatBangkokTime(question.closesAt)}</p>
                )}
                {status === "awaiting-reveal" && ((!isPending && !hasSubmitted) || notLoggedIn) && (
                  <p>ปิดรับคำตอบแล้ว</p>
                )}
                {status === "revealed" && ((!isPending && !hasSubmitted) || notLoggedIn) && (
                  <p>คุณไม่ได้ตอบ</p>
                )}
              </div>

              {(status === "awaiting-reveal" || (status === "open" && hasSubmitted)) && (
                <p className="text-sm mt-2">
                  รอเฉลยคำตอบพร้อมกัน
                  <br />
                  {formatBangkokTime(question.revealsAt)} ได้เลย
                </p>
              )}
              <p className="text-sm mt-2 text-balance">
                นับคะแนนที่ได้จากจำนวนน้องทั้งหมดที่ทายถูกในยาน
              </p>
            </div>
          </div>
        </div>
      </div>

      {status === "open" && !isPending && !hasSubmitted && (
        <div className="fixed z-100 bottom-28 left-1/2 -translate-x-1/2">
          <button
            type="button"
            onClick={handleSaveClick}
            disabled={!canSave}
            className={`items-center gap-2 rounded-full px-6 pb-4 font-sov-yeehor text-5xl shadow-xl enabled:cursor-pointer transition-opacity opacity-95 disabled:opacity-80 ${BODY_BG[question.period]}`}
          >
            <Save className="inline size-7 align-middle" /> บันทึก
          </button>
        </div>
      )}

      {status === "revealed" && (
        <div className="fixed z-100 bottom-28 left-1/2 -translate-x-1/2">
          <button
            type="button"
            onClick={handleRevealClick}
            disabled={!canReveal}
            className={`items-center gap-2 rounded-full px-6 pb-4 font-sov-yeehor text-5xl shadow-xl enabled:cursor-pointer transition-opacity opacity-95 disabled:opacity-80 ${BODY_BG[question.period]}`}
          >
            <Eye className="inline size-7 align-middle" /> ดูเฉลย
          </button>
        </div>
      )}

      {status === "locked" && (
        <p className="mt-6 px-24 text-center font-fc-quantum opacity-70">
          คำถามนี้ยังไม่เปิดให้ตอบ
          <br />
          กลับมาใหม่ตามเวลาที่กำหนด
        </p>
      )}

      <NavigationFooter />
    </div>
  )
}
