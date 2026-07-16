"use client"

import { PopkaewCharacter } from "./PopkaewCharacter"
import type { PopkaewVesselScore } from "../types"
import { formatPopkaewScore } from "../utils"
import { PopkaewArtwork } from "./PopkaewArtwork"
import { Header2 } from "@/components/Headers"

type ViewMode = "game" | "leaderboard"

const PRESS_ANIMATION_MS = 130

const fallbackLeaderboard: PopkaewVesselScore[] = Array.from({ length: 18 }, (_, index) => ({
  rank: index + 1,
  vesselName: {
    th: `ยานอนาคอนด้า ${index + 1}`,
    en: `Anaconda ${index + 1}`,
  },
  popkaewscore: 0,
}))

export function PopkaewGame() {
  return (
    <section className="relative h-218.5 overflow-x-hidden">
      <PopkaewArtwork />
      <Header2 title="เกมส์" url="/game" />

      {true && (
        <>
          <p className="font-sov-yeehor absolute inset-x-0 top-[276px] z-20 text-center text-[64px] font-normal leading-[0.69] tracking-[1.28px] text-[#3c2927] tabular-nums">
            {formatPopkaewScore(0)}
          </p>

          <div className="absolute inset-x-0 top-[318px] z-20">
            <PopkaewCharacter disabled={true} isPressed={true} onPop={() => {}} />
          </div>
        </>
      )}
    </section>
  )
}
