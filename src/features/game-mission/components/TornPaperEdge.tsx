"use client"

const STROKE = {
  morning: "#F0865C",
  evening: "#74DDCF",
} as const

const FILL_BELOW = {
  morning: "#F0DCC4",
  evening: "#DAF7F3",
} as const

type Period = "morning" | "evening"

/**
 * Hand-drawn torn-paper edge under the gradient banner on question pages.
 * Pure SVG (no external asset) so it always renders as a full-width jagged
 * strip regardless of screen width — unlike a fixed-aspect image asset.
 */
export function TornPaperEdge({ period }: { period: Period }) {
  return (
    <div className="relative -mt-1 h-6 w-full" aria-hidden>
      <svg viewBox="0 0 400 24" preserveAspectRatio="none" className="h-full w-full">
        <path
          d="M0,10 L20,14 L40,8 L60,16 L80,6 L100,13 L120,9 L140,17 L160,7 L180,12
             L200,8 L220,15 L240,10 L260,6 L280,14 L300,9 L320,16 L340,8 L360,13
             L380,7 L400,11 L400,24 L0,24 Z"
          fill={FILL_BELOW[period]}
        />
        <path
          d="M0,10 L20,14 L40,8 L60,16 L80,6 L100,13 L120,9 L140,17 L160,7 L180,12
             L200,8 L220,15 L240,10 L260,6 L280,14 L300,9 L320,16 L340,8 L360,13
             L380,7 L400,11"
          fill="none"
          stroke={STROKE[period]}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
