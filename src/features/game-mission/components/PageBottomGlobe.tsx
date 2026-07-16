"use client"

import Image from "next/image"

/**
 * The gear-globe artwork ("globe.png"), pinned to the bottom of the whole
 * page (above the fixed bottom nav), independent of question-body height.
 */
export function PageBottomGlobe() {
  return (
    <div
      className="pointer-events-none absolute bottom-0 left-1/2 z-0 h-56 w-full max-w-lg -translate-x-1/2"
      aria-hidden
    >
      <Image src="/game/globe.png" alt="" fill className="object-contain object-bottom" />
    </div>
  )
}
