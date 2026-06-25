"use client"

import { useMemo, useState } from "react"
import { ChevronLeft, ChevronDown, ChevronUp, Search, MoreHorizontal, Check } from "lucide-react"
import { Header } from "@/components/Headers"

import { MOCK_CLUBS } from "@/features/clubs/const/mock"
import { CATEGORIES } from "@/features/clubs/const/categories"
import { useClubFilter, type BoothFilter } from "@/features/clubs/hooks/useClubFilter"
import ClubBottomSheet from "@/features/clubs/components/bottomsheet"

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
  const [selectedClub, setSelectedClub] = useState<any | null>(null)

  const clubs = useClubFilter(MOCK_CLUBS, query, selectedCategories, boothFilter)

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

    let globalIndex = 0

    return CATEGORIES.filter((c) => groups[c.id]?.length).map((c) => ({
      categoryId: c.id,
      title: getCategoryLabel(c.id),
      clubs: (groups[c.id] ?? []).map((club) => {
        globalIndex += 1
        return { ...club, displayNumber: globalIndex }
      }),
    }))
  }, [clubs])

  return (
    <div className="mx-auto min-h-screen w-full bg-[#fafafa] pb-10 font-sans">
      <Header />
      <header className="relative flex items-center justify-center px-4 pt-6 pb-2">
        <button type="button" aria-label="กลับ" className="absolute left-4 top-6 text-gray-900">
          <ChevronLeft size={26} />
        </button>
        <h1 className="font-serif text-3xl italic tracking-wide text-gray-900">ชมรม</h1>
      </header>

      {/* Search + filter row */}
      <div className="flex items-center gap-2 px-4 py-3">
        <div className="flex flex-1 items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2.5">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ค้นหา"
            className="flex-1 bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
          />
          <Search size={18} className="text-gray-400" />
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setFilterOpen((v) => !v)}
            className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700"
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
                      className="flex w-full items-center justify-between px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50"
                    >
                      {option.label}
                      {isActive && <Check size={16} className="text-gray-900" />}
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>

      {/* Category chips */}
      <div className="grid grid-cols-3 gap-2 px-4 pb-4">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategories.includes(cat.id)
          const Icon = cat.icon

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => toggleCategory(cat.id)}
              className={[
                "flex items-center justify-center gap-1.5 rounded-full px-3 py-2.5 text-sm transition-colors",
                isActive
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-700 border border-gray-200",
              ].join(" ")}
            >
              <Icon size={14} className={isActive ? "text-white" : "text-gray-500"} />
              {cat.label}
            </button>
          )
        })}
      </div>

      {/* Club list grouped by category */}
      <div className="flex flex-col gap-8 px-4">
        {groupedClubs.length > 0 ? (
          groupedClubs.map((group) => (
            <section key={group.categoryId}>
              <h2 className="mb-3 text-center font-serif text-xl italic text-gray-900">
                {group.title}
              </h2>

              <ul className="overflow-hidden rounded-2xl bg-white">
                {group.clubs.map((club) => (
                  <li
                    key={club.id}
                    onClick={() => setSelectedClub(club)}
                    className="flex items-center gap-4 border-b border-gray-100 px-5 py-4 last:border-b-0"
                  >
                    <span className="w-4 shrink-0 text-sm text-gray-400">{club.displayNumber}</span>

                    <div className="h-14 w-14 shrink-0 rounded-xl bg-gray-200" aria-hidden="true" />

                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-[15px] font-medium text-gray-900">
                        {club.name}
                      </h3>
                      <p className="truncate text-sm text-gray-400">{club.shortdescription}</p>
                    </div>

                    <button
                      type="button"
                      aria-label={`ตัวเลือกเพิ่มเติมสำหรับ ${club.name}`}
                      className="shrink-0 rounded-full p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                    >
                      <MoreHorizontal size={18} />
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          ))
        ) : (
          <p className="py-10 text-center text-sm text-gray-400">ไม่พบชมรมที่ค้นหา</p>
        )}
      </div>
      <ClubBottomSheet club={selectedClub} onClose={() => setSelectedClub(null)} />
    </div>
  )
}
