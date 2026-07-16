"use client"

import { useState } from "react"
import { Save } from "lucide-react"
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

export function MissionQuestionScreen({ question }: MissionQuestionScreenProps) {
  const open = useModalStore((s) => s.open)
  const status = getMissionStatus(question)
  const { item: historyItem } = useMissionHistoryItem(question.id)
  const submitMutation = useSubmitMissionAnswer()

  const [singleValue, setSingleValue] = useState<string | null>(null)
  const [multiValues, setMultiValues] = useState<string[]>([])
  const [textValue, setTextValue] = useState("")

  const hasSubmitted = !!historyItem
  const isLocked = status !== "open" || hasSubmitted

  const currentAnswer: string | string[] | null =
    question.type === "single"
      ? singleValue
      : question.type === "multi"
        ? multiValues
        : textValue.trim() || null

  const canSave =
    status === "open" &&
    !hasSubmitted &&
    (question.type === "multi" ? multiValues.length > 0 : !!currentAnswer)

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

  return (
    <div
      className={`relative min-h-screen pb-32 ${BODY_BG[question.period]} ${BODY_TEXT[question.period]}`}
    >
      <PageBottomGlobe />

      <div className="relative z-10">
        <MissionHeaderBanner
          title={question.title}
          prompt={question.prompt}
          hint={question.hint}
          period={question.period}
          showTopBar
          onHistoryClick={() => open(<HistoryModal />)}
          onHelpClick={() => open(<HowToPlayModal period={question.period} />)}
        />

        <div className="relative mt-8 flex flex-col items-center gap-6 px-24">
          <BackgroundIllustration />

          <div className="relative mx-auto z-10 flex flex-col items-center gap-6">
            {question.type === "single" && (
              <SingleChoiceList
                options={question.options}
                period={question.period}
                selectedValue={singleValue}
                onSelect={setSingleValue}
                historyItem={historyItem}
                isLocked={isLocked}
              />
            )}

            {question.type === "multi" && (
              <MultiChoiceList
                options={question.options}
                period={question.period}
                selectedValues={multiValues}
                onToggle={(value) =>
                  setMultiValues((prev) =>
                    prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
                  )
                }
                historyItem={historyItem}
                isLocked={isLocked}
              />
            )}

            {question.type === "number" && (
              <NumberAnswerInput
                value={textValue}
                onChange={setTextValue}
                maxLength={question.maxLength ?? 3}
                period={question.period}
                historyItem={historyItem}
                disabled={isLocked}
              />
            )}

            {question.type === "text" && (
              <TextAnswerInput
                value={textValue}
                onChange={setTextValue}
                maxLength={question.maxLength}
                imageSrc={question.imageSrc}
                period={question.period}
                historyItem={historyItem}
                disabled={isLocked}
              />
            )}

            <div className="mt-2 text-center font-fc-quantum text-sm opacity-80">
              <p>ปิดรับคำตอบ {formatBangkokTime(question.closesAt)}</p>
              <p className="mt-1">นับคะแนนที่ได้จากจำนวนน้องทั้งหมดที่ทายถูกในยาน</p>
            </div>
          </div>
        </div>
      </div>

      {!hasSubmitted && status === "open" && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2">
          <button
            type="button"
            onClick={handleSaveClick}
            disabled={!canSave}
            className={`flex items-center gap-2 rounded-full px-8 py-3 font-fc-quantum text-xl shadow-xl transition-opacity disabled:opacity-50 ${
              question.period === "morning"
                ? "bg-brick-orange text-cream"
                : "bg-turqoise text-midnight"
            }`}
          >
            <Save size={20} strokeWidth={2.5} />
            บันทึก
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
