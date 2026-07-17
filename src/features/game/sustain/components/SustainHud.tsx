"use client"

import Image from "next/image"

type SustainHudProps = {
  score: number
  timeLeft: number
}

export function SustainHud({ score, timeLeft }: SustainHudProps) {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-3 z-40 flex items-start justify-between px-4">
      <div className="relative h-[58px] w-[128px]">
        <Image src="/game/plaque-score.png" alt="" fill className="object-contain drop-shadow-md" />
        <div className="absolute inset-0 flex flex-col items-start justify-center pl-3.5">
          <span className="text-[10px] font-bold uppercase tracking-wide text-[#8a3a2c]">
            Score
          </span>
          <span className="font-mono text-xl font-bold leading-none text-[#7c3324]">
            {score.toString().padStart(6, "0")}
          </span>
        </div>
      </div>

      <div className="relative h-[58px] w-[94px]">
        <Image src="/game/plaque-time.png" alt="" fill className="object-contain drop-shadow-md" />
        <div className="absolute inset-0 flex flex-col items-end justify-center pr-3.5">
          <span className="text-[10px] font-bold uppercase tracking-wide text-[#8a3a2c]">Time</span>
          <span className="font-mono text-xl font-bold leading-none text-[#7c3324]">
            {timeLeft}
          </span>
        </div>
      </div>
    </div>
  )
}
