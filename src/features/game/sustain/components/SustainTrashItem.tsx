import Image from "next/image"
import type { SustainFallingTrash, SustainTrashType } from "../types/sustain"
import { SUSTAIN_GAME_WIDTH, SUSTAIN_GAME_HEIGHT } from "../data/sustainGame"

// Not every trash id has a matching illustration cropped from the design yet —
// items without an entry here fall back to a styled version of their `icon` glyph.
const TRASH_IMAGES: Partial<Record<string, string>> = {
  "used-cup": "/game/trash-cup.png",
  paper: "/game/trash-paper.png",
  can: "/game/trash-can.png",
  "banana-peel": "/game/trash-banana.png",
  leftover: "/game/trash-veggie.png",
  "snack-bag": "/game/trash-ice-bag.png",
  "paper-scrap": "/game/trash-paper-scrap.png",
  "cloth-scrap": "/game/trash-cloth.png",
  twig: "/game/trash-twig.png",
  "soiled-container": "/game/trash-soiled-container.png",
  "cardboard-box": "/game/trash-cardboard.png",
  "milk-carton": "/game/trash-carton.png",
  "chicken-bone": "/game/trash-chicken-bone.png",
  watermelon: "/game/trash-watermelon.png",
  "apple-core": "/game/trash-apple-core.png",
  "veggie-scraps": "/game/trash-veggie.png",
}

const TYPE_STYLES: Record<SustainTrashType, string> = {
  general: "border-[#3c6d6b] bg-[#e7f1f0] text-[#2a4f4d]",
  recycle: "border-[#c98a2e] bg-[#fbedd3] text-[#8a5a17]",
  food: "border-[#5c6b35] bg-[#eef1e2] text-[#465126]",
}

type SustainTrashItemProps = {
  trash: SustainFallingTrash
}

export function SustainTrashItem({ trash }: SustainTrashItemProps) {
  const image = TRASH_IMAGES[trash.id]
  const fallProgress = Math.min(1, Math.max(0, trash.y / (SUSTAIN_GAME_HEIGHT - 130)))
  const shadowScale = 0.5 + fallProgress * 0.6
  const shadowOpacity = 0.15 + fallProgress * 0.35

  return (
    <div
      className="absolute touch-none select-none"
      style={{
        left: `${(trash.x / SUSTAIN_GAME_WIDTH) * 100}%`,
        top: `${(trash.y / SUSTAIN_GAME_HEIGHT) * 100}%`,
        width: `${(trash.size / SUSTAIN_GAME_WIDTH) * 100}%`,
        height: `${(trash.size / SUSTAIN_GAME_HEIGHT) * 100}%`,
      }}
    >
      {/* ground shadow: bigger + darker the closer the item gets to the bins */}
      <div
        aria-hidden
        className="absolute left-1/2 h-2 -translate-x-1/2 rounded-full bg-black blur-[3px]"
        style={{ top: "88%", width: `${70 * shadowScale}%`, opacity: shadowOpacity }}
      />

      {image ? (
        <div
          className={`relative size-full transition-transform ${
            trash.isDragging ? "z-30 scale-110 cursor-grabbing" : "z-20 cursor-grab"
          }`}
          style={{ filter: "drop-shadow(0 3px 4px rgba(0,0,0,0.35))" }}
        >
          <Image
            src={image}
            alt={trash.label}
            fill
            sizes="60px"
            className="object-contain"
            draggable={false}
          />
        </div>
      ) : (
        <div
          className={`flex size-full flex-col items-center justify-center rounded-lg border-2 text-center shadow-sm transition-transform ${TYPE_STYLES[trash.type]} ${
            trash.isDragging ? "z-30 scale-110 shadow-md cursor-grabbing" : "z-20 cursor-grab"
          }`}
        >
          <span className="text-lg leading-none">{trash.icon}</span>
          <span className="mt-1 max-w-full px-1 text-[9px] font-bold leading-3">{trash.label}</span>
        </div>
      )}
    </div>
  )
}
