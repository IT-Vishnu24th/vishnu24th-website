"use client"

import { useParams } from "next/navigation"
import { Header } from "@/components/Headers"

const clubs = [
  { id: 1, name: "ชมรมหกเจ็ด" },
  { id: 2, name: "ชมรมเจ็ดหก" },
  { id: 3, name: "ชมรม67" },
]

export default function BuildingMapPage() {
  const params = useParams()

  return (
    <div className="max-w-[420px] mx-auto pb-8 font-sans">
      <Header />
      {/* Top Bar */}
      <div className="flex items-center px-4 pt-4 pb-2">
        <button
          onClick={() => window.history.back()}
          className="text-2xl bg-transparent border-none cursor-pointer p-0 mr-2"
          aria-label="กลับ"
        >
          ←
        </button>
        <h1 className="flex-1 text-center text-3xl font-bold font-serif pr-8">ลานเกียร์</h1>
      </div>

      {/* Map Area */}
      <div className="mx-4 my-3 rounded-2xl border-[3px] border-gray-400 bg-gray-300 p-2 min-h-[260px] flex items-center justify-center">
        {/* ใส่รูปแผนที่อาคารที่นี่ */}
        {/* <Image src={`/maps/${params.building}.png`} alt={buildingName} width={400} height={260} className="w-full rounded-xl" /> */}
      </div>

      {/* Legend */}
      <div className="mx-4 mt-2 flex flex-col gap-2 rounded-xl bg-white p-3 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded bg-red-300 flex items-center justify-center text-red-600 text-xs font-bold">
            +
          </span>
          <span>เต็นท์พยาบาล</span>
        </div>
      </div>
      {/* Club List */}
      <div className="px-4 mt-6">
        <h2 className="text-center text-xl font-bold mb-4">หมายเลขชมรม</h2>
        <div className="flex flex-col gap-3">
          {clubs.map((club) => (
            <div key={club.id} className="flex items-center gap-3">
              <span className="text-gray-500 w-4 text-sm">{club.id}</span>
              <div className="w-9 h-9 rounded-full bg-gray-400 flex-shrink-0" />
              <span className="text-base">{club.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
