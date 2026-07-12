"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { ChevronDown, ChevronUp, Search, Check } from "lucide-react"
import { Header } from "@/components/Headers"

import { club_data } from "@/features/clubs/const/club-data"
import { CATEGORIES } from "@/features/clubs/const/categories"
import { useClubFilter, type BoothFilter } from "@/features/clubs/hooks/useClubFilter"
import ClubBottomSheet from "@/features/clubs/components/bottomsheet"
import type { Club } from "@/features/clubs/types/club"
import { useRouter } from "next/navigation"
import Sponsor from "@/components/SponsorFooter"

const BOOTH_OPTIONS: { id: BoothFilter; label: string }[] = [
  { id: "all", label: "ทั้งหมด" },
  { id: "has", label: "มีบูธ" },
  { id: "none", label: "ไม่มีบูธ" },
]

// label ที่ใช้แสดงเป็นหัวข้อกลุ่ม (เช่น "วิชาการ", "กีฬา")
// ถ้า CATEGORIES มี field label อยู่แล้วตรงกับที่ต้องการแสดง
// สามารถลบ map นี้ออกแล้วใช้ cat.label ตรง ๆ ได้เลย
function getCategoryLabel(categoryId: string) {
  const found = CATEGORIES.find((c) => c.id === categoryId)
  return found?.label ?? categoryId
}

export default function Page() {
  const [query, setQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [filterOpen, setFilterOpen] = useState(false)
  const [boothFilter, setBoothFilter] = useState<BoothFilter>("all")
  const [selectedClub, setSelectedClub] = useState<Club | null>(null)
  const router = useRouter()

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
      const key = (club as { categoryId?: string }).categoryId ?? "other"
      if (!groups[key]) groups[key] = []
      groups[key].push(club)
    }

    const result: {
      categoryId: string
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
        categoryId: c.id,
        title: getCategoryLabel(c.id),
        clubs: enrichedClubs,
      })
    }

    return result
  }, [clubs])

  return (
    <div className="mx-auto min-h-screen w-full overflow-x-hidden bg-brownie-light font-sans">
      <div className="text-center bg-gradient-to-b from-midnight to-brownie">
        <Header />

        <div className="relative flex items-center justify-center px-4 pb-2 ">
          <button
            onClick={() => router.push("/explore")}
            className="absolute left-6 top-10 text-2xl bg-transparent border-none cursor-pointer p-0"
            aria-label="กลับ"
          >
            ←
          </button>

          <h1 className="text-7xl font-sov-yeehor">ชมรม</h1>
        </div>
        <div className="relative w-full h-8 overflow-hidden mt-3">
          <Image src="/map/map-line.png" alt="" fill className="object-fill scale-102" />
        </div>
      </div>

      {/* Hero: title + search + filter + category chips ทั้งหมดอยู่บนพื้นหลังส้มเข้ม */}
      <div className="bg-gradient-to-b from-brick-orange to-cream pb-10">
        {/* Search + filter row */}
        <div className="flex items-center gap-2 px-4 pt-6 pb-3">
          <div className="flex flex-1 items-center gap-2 rounded-full border border-white/40 bg-white/90 px-4 py-2.5">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ค้นหา"
              className="flex-1 bg-transparent font-fc-quantum text-sm text-brick-orange outline-none placeholder:text-brick-orange"
            />
            <Search size={18} className="text-brick-orange" />
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setFilterOpen((v) => !v)}
              className="flex items-center gap-1.5 rounded-full border border-white/40 bg-white/90 px-4 py-2.5 font-fc-quantum text-sm text-brownie"
            >
              <span>{BOOTH_OPTIONS.find((o) => o.id === boothFilter)?.label}</span>
              {filterOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {filterOpen && (
              <ul className="absolute right-0 top-full z-10 mt-2 w-36 overflow-hidden rounded-xl border border-gray-100 bg-white py-1 shadow-lg">
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
        <div className="grid grid-cols-2 gap-2 px-4">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategories.includes(cat.id)
            const Icon = cat.icon

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => toggleCategory(cat.id)}
                className={[
                  "flex min-w-0 items-center justify-center gap-1.5 rounded-full px-3 py-2.5 font-fc-quantum text-sm transition-colors",
                  isActive
                    ? "bg-brick-orange text-brick"
                    : "border border-white/40 bg-white/90 text-brownie",
                ].join(" ")}
              >
                <Icon size={14} className={isActive ? "text-cream-tanned" : "text-brownie"} />
                <span className="truncate">{cat.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Club list grouped by category */}
      <div className="flex flex-col gap-8 px-4 bg-cream -mt-1 pb-20">
        {groupedClubs.length > 0 ? (
          groupedClubs.map((group) => (
            <section key={group.categoryId}>
              <h2 className="mb-3 text-center font-sov-yeehor text-4xl italic text-brownie">
                {group.title}
              </h2>

              <ul className="overflow-hidden rounded-2xl bg-cream-tanned">
                {group.clubs.map((club) => {
                  const hasImage = club.imageUrl && club.imageUrl !== "you check by your own"

                  return (
                    <li
                      key={club.id}
                      onClick={() => setSelectedClub(club)}
                      className="flex items-center gap-4 border-b border-gray-100 px-3 py-3 last:border-b-0"
                    >
                      <span className="w-4 shrink-0 font-sov-yeehor text-4xl text-brownie -translate-2 pl-2">
                        {club.displayNumber}
                      </span>

                      <div className="h-14 w-14 shrink-0 overflow-hidden bg-white p-1.5 ring-1 ring-gray-100">
                        {hasImage && (
                          <Image
                            src={`/club/${club.imageUrl}`}
                            alt={club.name}
                            width={56}
                            height={56}
                            className="h-full w-full object-contain"
                          />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="truncate font-fc-quantum text-lg font-medium text-brownie">
                          {club.name}
                        </h3>
                        <p className="truncate font-fc-quantum text-sm text-brick-orange">
                          {club.shortdescription}
                        </p>
                      </div>

                      <button
                        type="button"
                        aria-label={`ดูรายละเอียด ${club.name}`}
                        className="shrink-0 rounded-full p-1.5 text-brick-orange transition-colors"
                      >
                        <ChevronDown size={18} />
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
    </div>
  )
}
