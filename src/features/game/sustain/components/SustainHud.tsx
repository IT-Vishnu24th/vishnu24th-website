type SustainHudProps = {
  score: number
  timeLeft: number
}

export function SustainHud({ score, timeLeft }: SustainHudProps) {
  return (
    <div className="absolute left-0 right-0 top-0 z-40 flex items-start justify-between px-5 pt-3 text-black">
      <div className="leading-none">
        <p className="text-xs font-bold text-black/60">Score</p>
        <p className="mt-1 font-mono text-base font-bold">{score.toString().padStart(6, "0")}</p>
      </div>

      <div className="text-right leading-none">
        <p className="text-xs font-bold text-black/60">Time</p>
        <p className="mt-1 font-mono text-base font-bold">{timeLeft}</p>
      </div>
    </div>
  )
}
