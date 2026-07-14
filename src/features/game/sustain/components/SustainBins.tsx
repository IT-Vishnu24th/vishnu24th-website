import type { SustainBin } from "../types/sustain"

type SustainBinsProps = {
  bins: SustainBin[]
}

export function SustainBins({ bins }: SustainBinsProps) {
  return (
    <>
      {bins.map((bin) => (
        <div
          key={bin.type}
          className="absolute flex items-center justify-center bg-[#9f9f9f] px-1 text-center text-xs font-semibold leading-4 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]"
          style={{
            left: `${(bin.x / 360) * 100}%`,
            top: `${(bin.y / 600) * 100}%`,
            width: `${(bin.width / 360) * 100}%`,
            height: `${(bin.height / 600) * 100}%`,
          }}
        >
          {bin.label}
        </div>
      ))}
    </>
  )
}
