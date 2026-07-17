"use client"

import Image from "next/image"

/**
 * The real game-history.png asset, sized to its own natural aspect ratio
 * (not stretched full-width) since it isn't a wide banner shape.
 */
export function HistoryTornPaperEdge() {
  return (
    <div className="relative mx-auto h-20 w-24" aria-hidden>
      <Image src="/game/game-history.png" alt="" fill className="object-contain" />
    </div>
  )
}
