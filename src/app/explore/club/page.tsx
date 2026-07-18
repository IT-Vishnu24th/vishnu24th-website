"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { Check } from "lucide-react"
import { Header2 } from "@/components/Headers"

import { club_data } from "@/features/clubs/const/club-data"
import { CATEGORIES } from "@/features/clubs/const/categories"
import { useClubFilter, type BoothFilter } from "@/features/clubs/hooks/useClubFilter"
import ClubBottomSheet from "@/features/clubs/components/bottomsheet"
import type { Club } from "@/features/clubs/types/club"
import Sponsor from "@/components/SponsorFooter"
import NavigationFooter from "@/components/NavigationFooter"

const BOOTH_OPTIONS: { id: BoothFilter; label: string }[] = [
  { id: "all", label: "ทั้งหมด" },
  { id: "has", label: "จัดบูธ" },
  { id: "none", label: "ไม่จัดบูธ" },
]

// label ที่ใช้แสดงเป็นหัวข้อกลุ่ม (เช่น "วิชาการ", "กีฬา")
// ถ้า CATEGORIES มี field label อยู่แล้วตรงกับที่ต้องการแสดง
// สามารถลบ map นี้ออกแล้วใช้ cat.label ตรง ๆ ได้เลย
function getCategoryLabel(category: string) {
  const found = CATEGORIES.find((c) => c.id === category)
  return found?.label ?? category
}

export default function Page() {
  const [query, setQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [filterOpen, setFilterOpen] = useState(false)
  const [boothFilter, setBoothFilter] = useState<BoothFilter>("all")
  const [selectedClub, setSelectedClub] = useState<Club | null>(null)

  const clubs = useClubFilter(club_data, query, selectedCategories, boothFilter)

  function toggleCategory(id: string) {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    )
  }

  // จัดกลุ่มผลลัพธ์ตามหมวดหมู่ พร้อมคงลำดับตาม CATEGORIES
  const groupedClubs = useMemo(() => {
    const groups: Record<string, typeof clubs> = {}

    for (const club of clubs) {
      const key = (club as { category?: string }).category ?? "other"
      if (!groups[key]) groups[key] = []
      groups[key].push(club)
    }

    const result: {
      category: string
      title: string
      clubs: ((typeof clubs)[number] & { displayNumber: number })[]
    }[] = []

    let counter = 0
    const filteredCategories = CATEGORIES.filter((c) => groups[c.id]?.length)

    for (const c of filteredCategories) {
      const groupClubs = groups[c.id] ?? []
      const enrichedClubs = []
      for (const club of groupClubs) {
        counter++
        enrichedClubs.push({ ...club, displayNumber: counter })
      }
      result.push({
        category: c.id,
        title: getCategoryLabel(c.id),
        clubs: enrichedClubs,
      })
    }

    return result
  }, [clubs])

  return (
    <div className="mx-auto min-h-screen w-full overflow-x-hidden bg-brownie-light font-sans">
      <section className="w-full bg-[linear-gradient(180deg,#2D3542_0%,#934E43_100%)] text-black">
        <Header2 url="/explore" title="สำรวจ" />
        <div className="px-4 pb-8 flex w-full flex-col items-center justify-center gap-8 text-center">
          <h1 className="whitespace-nowrap text-[64px] font-sov-yeehor font-normal leading-12.5 letter-spacing-[1.92px] text-cream">
            ชมรม
          </h1>
        </div>
        <div className="w-full relative h-3 [@media(min-width:480px)]:h-5">
          <img src="/explore/clay_curve.svg" alt="" className="w-full absolute z-10" />
          <img src="/explore/light_clay_curve.svg" alt="" className="w-full absolute z-20" />
        </div>
      </section>

      {/* Hero: title + search + filter + category chips ทั้งหมดอยู่บนพื้นหลังส้มเข้ม */}
      <div
        className="relative z-0 pt-10 overflow-hidden pb-8"
        style={{
          background: "linear-gradient(180deg, #f0b190 0%, #f4c6aa 42%, #f7dfc4 76%, #f7edcf 100%)",
        }}
      >
        <Image
          src="/club/bg.png"
          alt=""
          fill
          sizes="100vw"
          className="pointer-events-none z-0 object-cover object-top opacity-45"
        />
        {/* Search + filter row */}
        <div className="relative z-50 flex items-center gap-2 px-5 pt-12 pb-3">
          <div className="relative flex min-h-11 flex-1 items-center gap-2 px-4 py-2.5">
            <Image src="/club/filter_all.png" alt="" fill className="object-fill" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ค้นหา"
              className="relative z-10 flex-1 bg-transparent font-fc-quantum text-sm text-brick-orange outline-none placeholder:text-brick-orange"
            />
            <Image
              src="/club/search.svg"
              alt=""
              width={20}
              height={20}
              className="relative z-10 shrink-0"
            />
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setFilterOpen((v) => !v)}
              className="relative flex min-h-11 min-w-32 items-center justify-center gap-2 px-4 py-2.5 font-fc-quantum text-sm text-brick-orange"
            >
              <Image src="/club/filter_all.png" alt="" fill className="object-fill" />
              <span className="relative z-10 whitespace-nowrap">
                {BOOTH_OPTIONS.find((o) => o.id === boothFilter)?.label}
              </span>
              <Image
                src="/club/dropdown-arrow.svg"
                alt=""
                width={13}
                height={8}
                className={`relative z-10 shrink-0 transition-transform ${filterOpen ? "rotate-180" : ""}`}
              />
            </button>

            {filterOpen && (
              <ul className="absolute right-0 top-full z-50 mt-2 w-36 overflow-hidden rounded-xl border border-gray-100 bg-white py-1 shadow-lg">
                {BOOTH_OPTIONS.map((option) => {
                  const isActive = boothFilter === option.id
                  return (
                    <li key={option.id}>
                      <button
                        type="button"
                        onClick={() => {
                          setBoothFilter(option.id)
                          setFilterOpen(false)
                        }}
                        className="flex w-full items-center justify-between px-4 py-2.5 text-left font-fc-quantum text-sm text-brick-orange hover:bg-gray-50"
                      >
                        {option.label}
                        {isActive && <Check size={16} className="text-brick-orange" />}
                      </button>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </div>

        {/* Category chips */}
        <div className="relative z-10 grid grid-cols-2 gap-2 px-5">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategories.includes(cat.id)
            const Icon = cat.icon

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => toggleCategory(cat.id)}
                className="relative flex min-h-10 min-w-0 items-center justify-center gap-2 px-3 py-2 font-fc-quantum text-sm text-brick-orange transition-transform active:scale-[0.98]"
              >
                <Image
                  src={isActive ? "/club/club-tag-selected.png" : "/club/club-tag.png"}
                  alt=""
                  fill
                  className="object-fill"
                />
                <Icon
                  size={15}
                  className={
                    isActive ? "relative z-10 text-cream-tanned" : "relative z-10 text-brick-orange"
                  }
                />
                <span className={`relative z-10 truncate ${isActive ? "text-cream-tanned" : ""}`}>
                  {cat.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Club list grouped by category */}
      <div
        className="-mt-1 flex flex-col gap-8 bg-cream px-4 pb-20 pt-2"
        style={{
          backgroundImage: "url('/club/bg.png')",
          backgroundPosition: "center -170px",
          backgroundRepeat: "repeat-y",
          backgroundSize: "100% auto",
        }}
      >
        {groupedClubs.length > 0 ? (
          groupedClubs.map((group) => (
            <section key={group.category}>
              <h2
                className={`mb-3 text-center text-4xl text-[#3C2927] ${
                  group.category === "Innovation" ? "font-arthemis" : "font-sov-yeehor"
                }`}
              >
                {group.title}
              </h2>

              <ul className="flex flex-col gap-2">
                {group.clubs.map((club) => {
                  const hasImage = club.imageUrl && club.imageUrl !== "you check by your own"

                  return (
                    <li
                      key={club.id}
                      onClick={() => setSelectedClub(club)}
                      className="relative flex min-h-[77px] items-center gap-4 px-3 py-3"
                    >
                      <Image src="/club/club-card.png" alt="" fill className="z-0 object-fill" />

                      <span className="relative z-10 w-7 shrink-0 pl-2 font-sov-yeehor text-3xl text-brick-orange">
                        {club.id}
                      </span>

                      <div className="relative z-10 h-16 w-16 shrink-0 overflow-hidden bg-white p-1.5">
                        {hasImage && (
                          <Image
                            src={`/club/clublogo/${club.imageUrl}`}
                            alt={club.name.th}
                            width={56}
                            height={56}
                            className="h-full w-full object-contain"
                          />
                        )}
                      </div>

                      <div className="relative z-10 min-w-0 flex-1">
                        <h3 className="truncate font-fc-quantum text-lg font-medium text-brownie">
                          {club.name.th}
                        </h3>
                        <p className="truncate font-fc-quantum text-sm text-brick-orange">
                          {club.shortdescription}
                        </p>
                      </div>

                      <button
                        type="button"
                        aria-label={`ดูรายละเอียด ${club.name}`}
                        className="relative z-10 shrink-0 p-1.5 transition-transform active:scale-95"
                      >
                        <Image src="/club/dropdown-arrow.svg" alt="" width={13} height={8} />
                      </button>
                    </li>
                  )
                })}
              </ul>
            </section>
          ))
        ) : (
          <p className="py-10 text-center font-fc-quantum text-sm text-brownie">
            ไม่พบชมรมที่ค้นหา
          </p>
        )}
      </div>
      <Sponsor />
      <ClubBottomSheet club={selectedClub} onClose={() => setSelectedClub(null)} />
      <NavigationFooter />
    </div>
  )
}
