"use client"

import { Sparkles } from "lucide-react"
import type { MissionPeriod } from "@/types/mission"
import { useModalStore } from "@/stores/modalStore"

interface HowToPlayModalProps {
  period: MissionPeriod
}

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
} satisfies Record<MissionPeriod, { bg: string; text: string; accent: string; button: string }>

export function HowToPlayModal({ period }: HowToPlayModalProps) {
  const close = useModalStore((s) => s.close)
  const theme = THEME[period]

  return (
    <div
      className={`w-full max-w-md rounded-3xl ${theme.bg} ${theme.text} px-6 py-8 text-center shadow-2xl`}
    >
      <Sparkles className={`mx-auto mb-2 ${theme.accent}`} size={28} />
      <h2 className="font-sov-yeehor text-3xl">ปริศนาฟ้าลิขิต</h2>

      <div className="mt-6 text-left">
        <h3 className="font-sov-yeehor text-xl">เล่นยังไง</h3>
        <p className="mt-2 font-fc-quantum text-sm leading-relaxed">
          ในแต่ละวัน จะมีคำถามช่วงเช้าและช่วงเย็น หน้าที่ของน้องคือการเขียนคำตอบสั้น ๆ เป็นคำทำนาย
          ก่อนเวลาที่กำหนด
        </p>

        <div className="mt-4 space-y-1 font-fc-quantum text-sm">
          <p>✅ 67</p>
          <p>❌ ผมขอตอบว่า 67 ครั้งครับ!!!</p>
        </div>

        <p className="mt-4 font-fc-quantum text-sm leading-relaxed">
          น้อง ๆ แต่ละคนสามารถทายตามที่ตัวเองชอบได้เลย โดยไม่ต้องตอบเหมือนกันทั้งยาน
        </p>

        <h3 className="mt-6 font-sov-yeehor text-xl">ให้คะแนนยังไง</h3>
        <p className="mt-2 font-fc-quantum text-sm leading-relaxed">
          จะนับคะแนนจากอันดับของจำนวนน้องที่ทายถูกในยาน
        </p>
        <p className="mt-2 font-fc-quantum text-sm leading-relaxed">
          ยานที่มีคนตอบถูกมากที่สุด ก็จะได้คะแนนสูงสุด
        </p>
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
