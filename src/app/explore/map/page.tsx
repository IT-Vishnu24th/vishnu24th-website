"use client"
import { useState, useEffect, useRef } from "react"
import { Header } from "@/components/Headers"
import { Hand } from "lucide-react"
import BuildingInfo from "@/features/map/components/BuildingInfo"
import { useRouter } from "next/navigation"
import { buildingData } from "@/features/map/const/mock"

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
    <div className="mx-auto pb-8 font-sans">
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
          className="block w-full aspect-[4/3] border-0"
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
