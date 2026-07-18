"use client"

import type { MissionPeriod } from "@/types/mission"
import Image from "next/image"

/**
 * The two side illustrations, meant to be
 * placed *inside* the question-body wrapper (not the whole page) so they
 * line up vertically with the answer box, matching the Figma.
 */
export function BackgroundIllustration({ period }: { period: MissionPeriod }) {
  return (
    <div className="pointer-events-none top-8 absolute inset-0 z-0" aria-hidden>
      <div className="absolute -left-8 h-80 w-32 md:h-72 md:w-40">
        <Image
          src={`/game/deco-left-${period}.png`}
          alt=""
          fill
          className="object-contain object-top-left"
        />
      </div>

      <div className="absolute -right-8 h-80 w-32 md:h-72 md:w-40">
        <Image
          src={`/game/deco-right-${period}.png`}
          alt=""
          fill
          className="object-contain object-top-right"
        />
      </div>
    </div>
  )
}
