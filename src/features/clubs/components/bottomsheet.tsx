"use client"

import { useState } from "react"
import Image from "next/image"
import { CATEGORIES } from "../const/categories"
import { Club } from "../types/club"
import { House } from "lucide-react"

function getCategoryLabel(categoryId: string) {
  const found = CATEGORIES.find((c) => c.id === categoryId)
  return found?.label ?? categoryId
}

type Props = {
  club: Club | null
  onClose: () => void
  onHomeClick?: () => void
}

export default function ClubBottomSheet({ club, onClose }: Props) {
  const [height, setHeight] = useState(70)

  if (!club) return null

  const instagramUrl = club.instagram
    ? club.instagram.startsWith("http")
      ? club.instagram
      : `https://instagram.com/${club.instagram}`
    : null

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/40" onClick={onClose}>
      <div
        style={{ height: `${height}vh` }}
        className="relative flex w-full flex-col rounded-t-2xl bg-white transition-all duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* handle */}
        <div
          className="flex cursor-row-resize justify-center pt-3 pb-1"
          onTouchMove={(e) => {
            const y = e.touches[0].clientY
            const vh = window.innerHeight
            const next = 100 - (y / vh) * 100

            if (next < 35) {
              onClose()
              return
            }

            setHeight(Math.max(35, Math.min(95, next)))
          }}
        >
          <div className="h-1 w-10 rounded-full bg-gray-300" />
        </div>

        {/* content */}
        <div className="flex-1 overflow-y-auto px-5 pb-5">
          <div className="flex items-start gap-3 pt-2">
            <div className="relative h-16 w-16 overflow-hidden rounded-xl bg-gray-100">
              {club.imageUrl && (
                <Image src={club.imageUrl} alt={club.name} fill className="object-cover" />
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <h2 className="text-lg font-bold text-gray-900">{club.name}</h2>

              <span className="w-fit rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
                {getCategoryLabel(club.categoryId)}
              </span>
            </div>
          </div>

          {club.description && (
            <div className="mt-5">
              <h3 className="font-bold text-gray-900">รายละเอียด</h3>

              <p className="mt-2 text-sm text-gray-700">{club.description}</p>
            </div>
          )}

          {club.havebooth && (
            <div className="mt-5">
              <h3 className="text-center font-bold text-gray-900">พิกัดบูธ</h3>

              <div className="relative mt-3 h-[260px] w-full overflow-hidden rounded-xl bg-gray-50">
                {club.mapimageUrl ? (
                  <Image src={club.mapimageUrl} alt="map" fill className="object-contain" />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-gray-400">
                    Placeholder Map
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* bottom bar */}
        <div className="flex items-center gap-2 border-t border-gray-100 bg-white px-3 py-3">
          <div className="flex items-center gap-2 rounded-full bg-gray-900 px-4 py-3 text-sm text-white whitespace-nowrap">
            <House size={16} />
            <span>{club.boothcount ?? 0}</span>
          </div>

          <div className="flex-1 truncate rounded-full bg-black px-3 py-2 text-center text-sm text-white">
            {club.location ?? "ยังไม่ระบุพิกัด"}
          </div>

          {instagramUrl && (
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-500 text-white"
              aria-label="instagram"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <rect
                  x="2"
                  y="2"
                  width="20"
                  height="20"
                  rx="5"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
                <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
