"use client"

import Image from "next/image"

/**
 * The two side illustrations ("graphics.png" / "graphics2.png"), meant to be
 * placed *inside* the question-body wrapper (not the whole page) so they
 * line up vertically with the answer box, matching the Figma.
 */
export function BackgroundIllustration() {
  return (
    <div className="pointer-events-none top-8 absolute inset-0 z-0" aria-hidden>
      <div className="absolute left-0 h-64 w-32 md:h-72 md:w-40">
        <Image src="/game/graphics.png" alt="" fill className="object-contain object-top-left" />
      </div>

      <div className="absolute right-0 h-64 w-32 md:h-72 md:w-40">
        <Image src="/game/graphics2.png" alt="" fill className="object-contain object-top-right" />
      </div>
    </div>
  )
}
