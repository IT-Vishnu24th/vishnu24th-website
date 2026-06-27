"use client"
import { useState, useEffect, useRef } from "react"
import { Header } from "@/components/Headers"
import { Hand } from "lucide-react"
import BuildingInfo from "@/features/map/components/BuildingInfo"
import { useRouter } from "next/navigation"

type Club = {
  id: number
  name: string
}

type BuildingData = {
  name: string
  clubs: Club[]
}

// TODO: แทนที่ด้วยข้อมูลจริง
const buildingData: Record<string, BuildingData> = {
  "building-1": {
    name: "ตึก 1",
    clubs: [],
  },
  "building-2": {
    name: "ตึก 2",
    clubs: [],
  },
  "building-3": {
    name: "ตึก 3",
    clubs: [],
  },
  "building-4": {
    name: "ตึก 4",
    clubs: [],
  },
  "building-100": {
    name: "อาคารวศ. 100 ปี",
    clubs: [],
  },
  "gear-yard": {
    name: "ลานเกียร์",
    clubs: [
      { id: 1, name: "ชมรมหกเจ็ด" },
      { id: 2, name: "ชมรมเจ็ดหก" },
      { id: 3, name: "ชมรม67" },
    ],
  },
  "faculty-sign": {
    name: "ป้ายคณะ",
    clubs: [],
  },
  "ruamjai-garden": {
    name: "สวนรวมใจ",
    clubs: [],
  },
  charoen: {
    name: "เจริญ",
    clubs: [],
  },
  colombo: {
    name: "โคลัมโบ",
    clubs: [],
  },
  hans: {
    name: "ฮันส์",
    clubs: [],
  },
  icanteen: {
    name: "iCanteen",
    clubs: [],
  },
  arun: {
    name: "อรุณ",
    clubs: [],
  },
  electrical: {
    name: "ไฟฟ้า",
    clubs: [],
  },
}

export default function MapPage() {
  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null)
  const infoRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.data?.type === "building-click") {
        setSelectedBuilding(event.data.building)
      }
    }
    window.addEventListener("message", handleMessage)
    return () => window.removeEventListener("message", handleMessage)
  }, [])

  // เลื่อนหน้าจอลงไปดูข้อมูลตึกที่เพิ่งเลือก
  useEffect(() => {
    if (selectedBuilding && infoRef.current) {
      infoRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [selectedBuilding])

  const selected = selectedBuilding ? buildingData[selectedBuilding] : null

  return (
    <div className="max-w-[420px] mx-auto pb-8 font-sans">
      <Header />
      {/* Top Bar */}
      <div className="flex items-center px-4 pt-4 pb-2">
        <button
          onClick={() => router.push("/")}
          className="text-2xl bg-transparent border-none cursor-pointer p-0 mr-2"
          aria-label="กลับ"
        >
          ←
        </button>
        <h1 className="flex-1 text-center text-3xl font-bold font-serif pr-8">แผนที่</h1>
      </div>

      {/* Map Area */}
      <div className="mx-4 my-3 overflow-hidden rounded-2xl bg-white">
        <iframe
          src="/map/engineer.html"
          title="แผนที่"
          className="w-full h-[260px] border-0 block"
          scrolling="no"
        />
      </div>

      {/* text */}
      <div className="flex items-center gap-2 px-4 py-3 text-base">
        <Hand size={20} className="text-gray-700" />
        <span>แตะบนอาคารที่ต้องการดูแผนที่ชมรม</span>
      </div>

      {/* Building Info - โผล่ขึ้นมาในหน้าเดียวกันเมื่อเลือกตึก */}
      {selected && (
        <div ref={infoRef}>
          <BuildingInfo buildingName={selected.name} clubs={selected.clubs} />
        </div>
      )}
    </div>
  )
}
