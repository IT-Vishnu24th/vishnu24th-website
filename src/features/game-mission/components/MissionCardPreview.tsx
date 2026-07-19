"use client"

import Link from "next/link"
import type { MissionQuestion } from "@/types/mission"
import { getMissionStatus } from "../utils/schedule"
import { MissionHeaderBanner } from "./MissionHeaderBanner"

interface MissionCardPreviewProps {
  question: MissionQuestion
}

const STATUS_LABEL = {
  locked: "ยังไม่เปิดให้ตอบ",
  open: "เปิดรับคำตอบอยู่",
  "awaiting-reveal": "ปิดรับคำตอบแล้ว รอเฉลย",
  revealed: "เฉลยแล้ว",
} as const

export function MissionCardPreview({ question }: MissionCardPreviewProps) {
  const status = getMissionStatus(question)

  return (
    <Link href={`/game/${question.id}`} className="block">
      <MissionHeaderBanner question={question} compact />
      <p
        className={`mt-2 text-center font-fc-quantum text-sm ${
          question.period === "morning" ? "text-brownie" : "text-midnight-light"
        }`}
      >
        {STATUS_LABEL[status]}
      </p>
    </Link>
  )
}
