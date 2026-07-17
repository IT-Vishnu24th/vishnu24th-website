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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-6"
      onClick={onClose}
    >
      <section
        aria-modal="true"
        role="dialog"
        onClick={(event) => event.stopPropagation()}
        className="flex max-h-[80vh] w-full max-w-[280px] flex-col overflow-hidden rounded-[6px] bg-[url('/game/paper-texture.png')] bg-cover bg-center shadow-2xl"
      >
        <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-3 pt-4 text-center">
          <span className="mx-auto flex size-7 items-center justify-center rounded-full bg-[#e2703f]/15 text-[#e2703f]">
            <Trash2 size={15} strokeWidth={2.4} />
          </span>

          <h1 className="font-sov-yeehor mt-1.5 text-5xl font-bold leading-tight text-[#8a3a2c]">
            เล่นยังไง
          </h1>

          <p className="font-fc-quantum  text-[10px] mx-auto text-4xl mt-1.5 max-w-[220px] text-[11px] leading-4 text-[#7a4a3a]">
            จะมีขยะหลายๆชนิดตกลงมาจากด้านบน และมีถังขยะรองรับ จากข้างใต้
            ให้น้องๆลากขยะลงมาในถังขยะที่ถูกต้อง มีเวลา 30 วินาที ลุยยยยยย!
          </p>

          <h3 className="font-sov-yeehor mt-3 text-2xl font-bold text-[#8a3a2c]">ประเภทขยะ</h3>

          <div className="font-sov-yeehor mt-2 flex flex-col gap-2 text-left">
            {SUSTAIN_BINS.map((bin) => {
              const items = SUSTAIN_TRASH_ITEMS.filter((item) => item.type === bin.type)

              return (
                <div key={bin.type} className="flex items-center gap-1.5">
                  <div className="relative h-[62px] w-[46px] shrink-0">
                    <Image
                      src={BIN_IMAGES[bin.type]}
                      alt={bin.label}
                      fill
                      sizes="46px"
                      className="object-contain"
                    />
                  </div>

                  {bin.type === "food" ? (
                    <div className="flex flex-1 flex-col gap-1">
                      <div className="flex flex-nowrap items-start justify-between gap-x-0.5">
                        {items.map((item) => (
                          <span key={item.id} className="relative size-6 w-0 flex-1 shrink-0">
                            {TRASH_IMAGES[item.id] ? (
                              <Image
                                src={TRASH_IMAGES[item.id]!}
                                alt={item.label}
                                fill
                                sizes="24px"
                                className="object-contain"
                              />
                            ) : (
                              <span className="flex size-6 items-center justify-center rounded bg-black/5 text-xs">
                                {item.icon}
                              </span>
                            )}
                          </span>
                        ))}
                      </div>
                      <p className="text-center  font-fc-quantum  text-[10px] text-[#7a4a3a]/90">
                        {items[0]?.label}
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-1 flex-nowrap items-start justify-between gap-x-0.5">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className="font-fc-quantum  text-[10px] flex w-0 flex-1 min-w-0 flex-col items-center gap-0.5"
                        >
                          {TRASH_IMAGES[item.id] ? (
                            <span className="relative size-6 shrink-0">
                              <Image
                                src={TRASH_IMAGES[item.id]!}
                                alt={item.label}
                                fill
                                sizes="24px"
                                className="object-contain"
                              />
                            </span>
                          ) : (
                            <span className="flex size-6 shrink-0 items-center justify-center rounded bg-black/5 text-xs">
                              {item.icon}
                            </span>
                          )}
                          <p className="w-full text-center text-[7px] leading-[8px] text-[#7a4a3a]/90 break-words">
                            {item.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <div className="font-sov-yeehor shrink-0 px-4 pb-4 pt-1 text-center">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-[#e2683c] px-6 py-2 text-xs font-bold text-white shadow-sm transition active:scale-95 text-[10px]"
          >
            ปิด
          </button>
        </div>
      </section>
    </div>
  )
}
