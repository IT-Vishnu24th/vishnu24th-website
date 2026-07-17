"use client"

import { useRef } from "react"
import Image from "next/image"
import { CATEGORIES } from "../const/categories"
import { Club } from "../types/club"

function getCategoryLabel(categoryId: string) {
  const found = CATEGORIES.find((c) => c.id === categoryId)
  return found?.label ?? categoryId
}

type Props = {
  club: Club | null
  onClose: () => void
}

export default function ClubBottomSheet({ club, onClose }: Props) {
  const startY = useRef<number | null>(null)

  if (!club) return null

  return (
    <div className="fixed inset-0 z-60 flex items-end bg-black/40" onClick={onClose}>
      <div
        className="relative flex h-[88vh] max-h-[920px] w-full flex-col overflow-hidden bg-transparent"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src="/club/bottom-sheet.png"
          alt=""
          fill
          sizes="100vw"
          className="pointer-events-none z-0 object-fill"
        />

        <div
          className="relative z-10 h-10 shrink-0"
          onTouchStart={(e) => {
            startY.current = e.touches[0].clientY
          }}
          onTouchEnd={(e) => {
            if (!startY.current) return

            const endY = e.changedTouches[0].clientY
            const diff = endY - startY.current

            if (diff > 80) {
              onClose()
            }

            startY.current = null
          }}
        />

        {/* content */}
        <div className="relative z-10 flex-1 overflow-y-auto px-7 pb-6 pt-6">
          <div className="grid grid-cols-[96px_1fr] items-center gap-5">
            <div className="relative h-24 w-24 shrink-0">
              {club.imageUrl && (
                <Image
                  src={`/club/clublogo/${club.imageUrl}`}
                  alt={club.name.th}
                  fill
                  className="object-contain"
                />
              )}
            </div>

            <div className="flex min-w-0 flex-col items-start gap-3">
              <h2 className="font-arthemis text-[25px] leading-[0.92] text-brownie">
                {club.name.en || club.name.th}
              </h2>

              <div className="relative h-6 w-25">
                <Image src="/club/club-tag-selected.png" alt="" fill className="object-fill" />
                <span className="relative z-10 flex h-full items-center justify-center font-quantum text-[15px] leading-none text-cream-tanned">
                  {getCategoryLabel(club.category)}
                </span>
              </div>
            </div>
          </div>

          {club.description && (
            <div className="mt-9">
              <h3 className="font-fc-quantum text-[20px] leading-none text-brownie">รายละเอียด</h3>

              <p className="mt-4 font-fc-quantum text-[15px] leading-[1.35] text-brownie-light">
                {club.description}
              </p>
            </div>
          )}

          {
            <div className="mt-10">
              <h3 className="text-center font-fc-quantum text-[20px] leading-none text-brownie">
                พิกัดบูธ
              </h3>

              <div className="relative mt-5 h-[280px] w-full overflow-hidden">
                {club.mapimageUrl ? (
                  <Image
                    src={`/club/mapimg/${club.mapimageUrl}`}
                    alt="map"
                    fill
                    className="object-contain"
                  />
                ) : (
                  <div className="flex items-center justify-center pt-10 font-fc-quantum text-lg text-brownie/60">
                    ชมรมนี้ไม่ได้จัดบูธ
                  </div>
                )}
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}
