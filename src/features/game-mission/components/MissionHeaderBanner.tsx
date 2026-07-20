"use client"

import { HelpCircle, History } from "lucide-react"
import type { MissionPeriod, MissionQuestion, MissionStatus } from "@/types/mission"
import { Header2 } from "@/components/Headers"
import { TornPaperEdge } from "./TornPaperEdge"

interface MissionHeaderBannerProps {
  question: MissionQuestion
  status: MissionStatus
  onHistoryClick?: () => void
  onHelpClick?: () => void
  /** Compact mode is used for the /game list preview cards */
  compact?: boolean
  /** Full mode only: renders the shared back-button/user-info bar inside the gradient */
  showTopBar?: boolean
}

const GRADIENTS: Record<MissionPeriod, string> = {
  morning: "bg-gradient-to-b from-midnight via-[#8a4a3a] to-brick-orange",
  evening: "bg-gradient-to-b from-midnight to-midnight-light",
}

const TITLE_COLOR: Record<MissionPeriod, string> = {
  morning: "text-cream-tanned",
  evening: "text-turqoise",
}

const ICON_BG: Record<MissionPeriod, string> = {
  morning: "bg-cream-tanned/90 text-brick-orange",
  evening: "bg-turqoise/20 text-turqoise",
}

export function MissionHeaderBanner({
  question,
  status,
  onHistoryClick,
  onHelpClick,
  compact = false,
  showTopBar = false,
}: MissionHeaderBannerProps) {
  const { title, prompt, hint, period, type } = question
  return (
    <div>
      <div className={`${GRADIENTS[period]} px-5 ${compact ? "py-2 pb-5" : "pb-10"}`}>
        {/* Rendered inside the gradient (not above it) so the color stretches
            all the way to the very top of the screen, behind the back button
            and user chip. */}
        {showTopBar && <Header2 url="/game" title="เกมส์" />}

        <div className={`flex items-center justify-center gap-3 ${showTopBar ? "" : "pt-6"}`}>
          {onHistoryClick && (
            <button
              type="button"
              onClick={onHistoryClick}
              className={`flex h-10 w-10 items-center justify-center rounded-full ${ICON_BG[period]}`}
              aria-label="ประวัติการตอบ"
            >
              <History size={18} strokeWidth={2.5} />
            </button>
          )}

          <h1 className={`font-sov-yeehor mb-2 text-4xl md:text-5xl ${TITLE_COLOR[period]}`}>
            {title}
          </h1>

          {onHelpClick && (
            <button
              type="button"
              onClick={onHelpClick}
              className={`flex h-10 w-10 items-center justify-center rounded-full ${ICON_BG[period]}`}
              aria-label="วิธีเล่น"
            >
              <HelpCircle size={18} strokeWidth={2.5} />
            </button>
          )}
        </div>

        {status !== "locked" ? (
          <>
            <p
              className={`mt-3 text-center font-fc-quantum text-base md:text-lg text-balance ${TITLE_COLOR[period]}`}
            >
              {prompt}
            </p>
            {hint && (
              <p
                className={`text-center font-fc-quantum text-sm opacity-80 ${TITLE_COLOR[period]}`}
              >
                ({hint})
              </p>
            )}
            {type === "multi" && (
              <p
                className={`text-center font-fc-quantum text-sm opacity-80 ${TITLE_COLOR[period]}`}
              >
                เลือกได้หลายข้อ
              </p>
            )}
          </>
        ) : (
          <p
            className={`mt-3 text-center font-fc-quantum text-base md:text-lg text-balance opacity-80 ${TITLE_COLOR[period]}`}
          >
            คำถามนี้ยังไม่เปิด
          </p>
        )}
      </div>
      {!compact && <TornPaperEdge period={period} />}
    </div>
  )
}
