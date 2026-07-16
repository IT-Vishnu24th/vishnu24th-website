"use client"

import Image from "next/image"
import { Save } from "lucide-react"
import type { MissionPeriod } from "@/types/mission"
import { useModalStore } from "@/stores/modalStore"

interface SaveConfirmModalProps {
  period: MissionPeriod
  onConfirm: () => void
  isSubmitting?: boolean
}

const THEME = {
  morning: {
    text: "text-brownie-dark",
    accent: "text-brick-orange",
    cancelBtn: "bg-cream text-brownie-dark",
    confirmBtn: "bg-brownie-dark text-cream",
  },
  evening: {
    text: "text-midnight",
    accent: "text-turqoise",
    cancelBtn: "bg-mint-tanned text-midnight",
    confirmBtn: "bg-midnight text-mint",
  },
} satisfies Record<
  MissionPeriod,
  { text: string; accent: string; cancelBtn: string; confirmBtn: string }
>

export function SaveConfirmModal({ period, onConfirm, isSubmitting }: SaveConfirmModalProps) {
  const close = useModalStore((s) => s.close)
  const theme = THEME[period]

  return (
    <div className={`relative w-full max-w-sm px-6 py-8 text-center ${theme.text}`}>
      <Image src="/game/save-box.png" alt="" fill className="-z-10 object-fill" />

      <Save className={`mx-auto mb-3 ${theme.accent}`} size={28} />
      <h2 className="font-fc-quantum text-2xl leading-snug">
        ต้องการบันทึก
        <br />
        คำตอบหรือไม่?
      </h2>
      <p className="mt-2 font-fc-quantum text-sm">
        มีโอกาสในการตอบคำถาม
        <br />
        <span className="underline underline-offset-2">ครั้งเดียวเท่านั้น!</span>
      </p>

      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={close}
          disabled={isSubmitting}
          className={`rounded-full px-6 py-2.5 font-fc-quantum text-lg enabled:cursor-pointer ${theme.cancelBtn}`}
        >
          ยกเลิก
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={isSubmitting}
          className={`rounded-full px-6 py-2.5 font-fc-quantum text-lg enabled:cursor-pointer disabled:opacity-60 ${theme.confirmBtn}`}
        >
          {isSubmitting ? "กำลังบันทึก..." : "บันทึก"}
        </button>
      </div>
    </div>
  )
}
