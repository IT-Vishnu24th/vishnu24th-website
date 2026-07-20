"use client"

import type { MissionPeriod } from "@/types/mission"
import Image from "next/image"

/**
 * The gear-globe artwork, pinned to the bottom of the whole
 * page (above the fixed bottom nav), independent of question-body height.
 */
export function PageBottomGlobe({ period }: { period: MissionPeriod }) {
  return (
    <div
      className="pointer-events-none absolute bottom-0 left-1/2 z-0 h-56 w-full max-w-lg -translate-x-1/2"
      aria-hidden
    >
      <Image
        src={`/game/deco-bottom-${period}.png`}
        alt=""
        fill
        className="object-contain object-bottom"
      />
    </div>
  )
}
