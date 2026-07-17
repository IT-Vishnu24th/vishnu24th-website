import Image from "next/image"
import { Trash2 } from "lucide-react"
import { SUSTAIN_BINS, SUSTAIN_TRASH_ITEMS } from "../data/sustainGame"
import type { SustainTrashType } from "../types/sustain"

const BIN_IMAGES: Record<SustainTrashType, string> = {
  general: "/game/bin-general.png",
  recycle: "/game/bin-recycle.png",
  food: "/game/bin-organic.png",
}

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

type HowToPlayModalProps = {
  open: boolean
  onClose: () => void
}

export function HowToPlayModal({ open, onClose }: HowToPlayModalProps) {
  if (!open) return null

  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 px-6"
      onClick={onClose}
    >
      <section
        aria-modal="true"
        role="dialog"
        onClick={(event) => event.stopPropagation()}
        className="max-h-[85%] w-full max-w-[302px] overflow-y-auto rounded-[6px] bg-[url('/game/paper-texture.png')] bg-cover bg-center px-5 pb-6 pt-6 text-center shadow-2xl"
      >
        <span className="mx-auto flex size-8 items-center justify-center rounded-full bg-[#e2703f]/15 text-[#e2703f]">
          <Trash2 size={18} strokeWidth={2.4} />
        </span>
        <h2 className="mt-1 font-serif-th text-2xl font-bold text-[#8a3a2c]">วิธีเล่น</h2>
        <p className="mx-auto mt-2 max-w-[230px] text-sm leading-5 text-[#7a4a3a]">
          จะมีขยะหลายชนิดตกลงมาจากด้านบน ลากขยะลงถังให้ถูกประเภทภายในเวลา 30 วินาที
        </p>

        <div className="mt-4 flex flex-col gap-3 text-left">
          {SUSTAIN_BINS.map((bin) => {
            const items = SUSTAIN_TRASH_ITEMS.filter((item) => item.type === bin.type)

            return (
              <div key={bin.type} className="flex items-center gap-3">
                <div className="relative h-[54px] w-[42px] shrink-0">
                  <Image
                    src={BIN_IMAGES[bin.type]}
                    alt={bin.label}
                    fill
                    sizes="42px"
                    className="object-contain"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-[#8a3a2c]">{bin.label}</p>
                  <p className="text-[11px] leading-4 text-[#7a4a3a]/85">{bin.hint}</p>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {items.map((item) =>
                      TRASH_IMAGES[item.id] ? (
                        <span key={item.id} className="relative size-6">
                          <Image
                            src={TRASH_IMAGES[item.id]!}
                            alt={item.label}
                            fill
                            sizes="24px"
                            className="object-contain"
                          />
                        </span>
                      ) : (
                        <span
                          key={item.id}
                          title={item.label}
                          className="flex size-6 items-center justify-center rounded bg-black/5 text-sm"
                        >
                          {item.icon}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-5 rounded-full bg-[#e2683c] px-6 py-2 text-xs font-bold text-white shadow-sm transition active:scale-95"
        >
          เข้าใจแล้ว
        </button>
      </section>
    </div>
  )
}
