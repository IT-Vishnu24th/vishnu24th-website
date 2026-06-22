"use client"
import React, { useMemo, useState } from "react"
import { ChevronLeft, Search, ChevronUp, ChevronDown, MoreHorizontal } from "lucide-react"

interface Category {
  id: string
  label: string
  icon: React.ReactNode
}

interface Club {
  id: string
  rank: number
  name: string
  description: string
  imageUrl?: string
  categoryId: string
}

// ---------- Mock icons for categories (replace with real icon set if needed) ----------

const IconScience = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 12h4l3 8 4-16 3 8h4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const IconAcademic = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <path d="M8 9h8M8 13h5" strokeLinecap="round" />
  </svg>
)

const IconSports = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 3a9 9 0 0 1 6 9 9 9 0 0 1-6 9 9 9 0 0 1-6-9 9 9 0 0 1 6-9Z" />
  </svg>
)

const IconArt = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path
      d="M12 3c4.5 0 8 3.2 8 7.2 0 2.6-2 4.3-4.3 4.3h-1c-.9 0-1.5.8-1.2 1.6.4 1.1-.4 2.4-1.7 2.4H12c-4.5 0-8-3.4-8-7.7C4 6.4 7.5 3 12 3Z"
      strokeLinejoin="round"
    />
    <circle cx="9" cy="10" r="0.8" fill="currentColor" />
    <circle cx="12" cy="8" r="0.8" fill="currentColor" />
    <circle cx="15" cy="10" r="0.8" fill="currentColor" />
  </svg>
)

const IconVolunteer = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path
      d="M12 20s-7-4.4-9.3-8.8C1.4 8.4 3 5 6.3 5c1.9 0 3.3 1 4 2.2.7-1.2 2.1-2.2 4-2.2 3.3 0 4.9 3.4 3.6 6.2C19 15.6 12 20 12 20Z"
      strokeLinejoin="round"
    />
  </svg>
)

const IconOther = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="5" cy="12" r="1.4" fill="currentColor" stroke="none" />
    <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
    <circle cx="19" cy="12" r="1.4" fill="currentColor" stroke="none" />
  </svg>
)

// ---------- Data ----------

const CATEGORIES: Category[] = [
  { id: "all", label: "ทั้งหมด", icon: null },
  { id: "science", label: "วิทย์", icon: <IconScience /> },
  { id: "academic", label: "วิชาการ", icon: <IconAcademic /> },
  { id: "sports", label: "กีฬา", icon: <IconSports /> },
  { id: "art", label: "ศิลปะ", icon: <IconArt /> },
  { id: "volunteer", label: "อาสา", icon: <IconVolunteer /> },
  { id: "other", label: "อื่น ๆ", icon: <IconOther /> },
]

const CATEGORY_TITLES: Record<string, string> = {
  science: "วิทย์",
  academic: "วิชาการ",
  sports: "กีฬา",
  art: "ศิลปะ",
  volunteer: "อาสา",
  other: "อื่น ๆ",
}

// Mock club data — แทนที่ด้วยข้อมูลจริงจาก API ได้เลย
const MOCK_CLUBS: Club[] = [
  {
    id: "c1",
    rank: 1,
    name: "ชมรมคนรัก 67",
    description: "คำอธิบายชมรมย่าว ๆ",
    categoryId: "academic",
  },
  {
    id: "c2",
    rank: 2,
    name: "ชมรมคนรัก 67",
    description: "คำอธิบายชมรมย่าว ๆ",
    categoryId: "academic",
  },
  {
    id: "c11",
    rank: 11,
    name: "ชมรมคนรัก 67",
    description: "คำอธิบายชมรมย่าว ๆ",
    categoryId: "sports",
  },
  {
    id: "c12",
    rank: 12,
    name: "ชมรมคนรัก 67",
    description: "คำอธิบายชมรมย่าว ๆ",
    categoryId: "sports",
  },
]

// ---------- Subcomponents ----------

function ClubAvatar({ imageUrl, name }: { imageUrl?: string; name: string }) {
  if (imageUrl) {
    return <img src={imageUrl} alt={name} className="h-14 w-14 shrink-0 rounded-xl object-cover" />
  }
  // Placeholder skeleton block, matching the mock's gray square
  return <div className="h-14 w-14 shrink-0 rounded-xl bg-gray-200" aria-hidden="true" />
}

function ClubListItem({ club, onMore }: { club: Club; onMore?: (club: Club) => void }) {
  return (
    <li className="flex items-center gap-4 border-b border-gray-100 px-5 py-4 last:border-b-0">
      <span className="w-4 shrink-0 text-sm text-gray-400">{club.rank}</span>

      <ClubAvatar imageUrl={club.imageUrl} name={club.name} />

      <div className="min-w-0 flex-1">
        <p className="truncate text-[15px] font-medium text-gray-900">{club.name}</p>
        <p className="truncate text-sm text-gray-400">{club.description}</p>
      </div>

      <button
        type="button"
        onClick={() => onMore?.(club)}
        aria-label={`ตัวเลือกเพิ่มเติมสำหรับ ${club.name}`}
        className="shrink-0 rounded-full p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
      >
        <MoreHorizontal size={18} />
      </button>
    </li>
  )
}

function CategorySection({
  title,
  clubs,
  onMore,
}: {
  title: string
  clubs: Club[]
  onMore?: (club: Club) => void
}) {
  if (clubs.length === 0) return null

  return (
    <section>
      <h2 className="mb-3 text-center font-serif text-xl italic text-gray-900">{title}</h2>
      <ul className="overflow-hidden rounded-2xl bg-white">
        {clubs.map((club) => (
          <ClubListItem key={club.id} club={club} onMore={onMore} />
        ))}
      </ul>
    </section>
  )
}

// ---------- Main Page ----------

export default function ClubListPage() {
  const [query, setQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<string>("academic")
  const [filterOpen, setFilterOpen] = useState(false)

  const clubs = MOCK_CLUBS

  const filteredClubs = useMemo(() => {
    return clubs.filter((club) => {
      const matchesQuery = club.name.toLowerCase().includes(query.trim().toLowerCase())
      const matchesCategory = activeCategory === "all" || club.categoryId === activeCategory
      return matchesQuery && matchesCategory
    })
  }, [clubs, query, activeCategory])

  const groupedClubs = useMemo(() => {
    const groups: Record<string, Club[]> = {}
    for (const club of filteredClubs) {
      if (!groups[club.categoryId]) groups[club.categoryId] = []
      groups[club.categoryId].push(club)
    }
    // Keep a stable, predictable order based on CATEGORIES list
    return CATEGORIES.filter((c) => c.id !== "all" && groups[c.id]?.length).map((c) => ({
      categoryId: c.id,
      title: CATEGORY_TITLES[c.id] ?? c.label,
      clubs: groups[c.id],
    }))
  }, [filteredClubs])

  return (
    <div className="mx-auto min-h-screen w-full max-w-sm bg-[#fafafa] pb-10 font-sans">
      {/* Header */}
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

        <button
          type="button"
          onClick={() => setFilterOpen((v) => !v)}
          className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700"
        >
          <span>ทั้งหมด</span>
          {filterOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {/* Category chips */}
      <div className="grid grid-cols-3 gap-2 px-4 pb-4">
        {CATEGORIES.filter((c) => c.id !== "all").map((cat) => {
          const isActive = activeCategory === cat.id
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={[
                "flex items-center justify-center gap-1.5 rounded-full px-3 py-2.5 text-sm transition-colors",
                isActive
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-700 border border-gray-200",
              ].join(" ")}
            >
              <span className={isActive ? "text-white" : "text-gray-500"}>{cat.icon}</span>
              {cat.label}
            </button>
          )
        })}
      </div>

      {/* Club list grouped by category */}
      <div className="flex flex-col gap-8 px-4">
        {groupedClubs.length > 0 ? (
          groupedClubs.map((group) => (
            <CategorySection
              key={group.categoryId}
              title={group.title}
              clubs={group.clubs}
              onMore={(club) => console.log("more options:", club)}
            />
          ))
        ) : (
          <p className="py-10 text-center text-sm text-gray-400">ไม่พบชมรมที่ค้นหา</p>
        )}
      </div>
    </div>
  )
}
