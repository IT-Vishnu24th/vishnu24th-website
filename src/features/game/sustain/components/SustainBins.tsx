import Image from "next/image"
import type { SustainBin, SustainTrashType } from "../types/sustain"
import { SUSTAIN_GAME_WIDTH, SUSTAIN_GAME_HEIGHT } from "../data/sustainGame"

const BIN_IMAGES: Record<SustainTrashType, string> = {
  general: "/game/bin-general.png",
  recycle: "/game/bin-recycle.png",
  food: "/game/bin-organic.png",
}

type SustainBinsProps = {
  bins: SustainBin[]
  hoveredBinType?: SustainTrashType | null
}

export function SustainBins({ bins, hoveredBinType }: SustainBinsProps) {
  return (
    <>
      {bins.map((bin) => {
        const isActive = hoveredBinType === bin.type

        return (
          <div
            key={bin.type}
            className="absolute z-20 transition-transform duration-150 ease-out"
            style={{
              left: `${(bin.x / SUSTAIN_GAME_WIDTH) * 100}%`,
              top: `${(bin.y / SUSTAIN_GAME_HEIGHT) * 100}%`,
              width: `${(bin.width / SUSTAIN_GAME_WIDTH) * 100}%`,
              height: `${(bin.height / SUSTAIN_GAME_HEIGHT) * 100}%`,
              transform: "translateY(-6px) scale(2.00)",
            }}
          >
            {/* ground shadow — brightens/widens when this bin is the active drop target */}
            <div
              aria-hidden
              className="absolute -bottom-1 left-1/2 h-2.5 -translate-x-1/2 rounded-full bg-black/35 blur-md transition-all duration-150"
              style={{
                width: isActive ? "85%" : "60%",
                opacity: isActive ? 0.55 : 0.3,
              }}
            />
            <Image
              src={BIN_IMAGES[bin.type]}
              alt={bin.label}
              fill
              sizes="120px"
              className="object-contain drop-shadow-lg"
              style={{ filter: isActive ? "brightness(1.12) saturate(1.15)" : undefined }}
            />
          </div>
        )
      })}
    </>
  )
}
