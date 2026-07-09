"use client"
import { useState, useEffect, useRef } from "react"
import { Header } from "@/components/Headers"
import { Hand } from "lucide-react"
import BuildingInfo from "@/features/map/components/BuildingInfo"
import { useRouter } from "next/navigation"
import { buildingData } from "@/features/map/const/mock"
import Image from "next/image"
import Sponsor from "@/components/SponsorFooter"

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
    <div className="">
      {/* Top Bar */}

      <div className="text-center bg-gradient-to-b from-midnight to-brownie">
        <Header />
        <div className="relative flex items-center justify-center px-4 pb-2">
          <button
            onClick={() => router.push("/explore")}
            className="absolute left-6 top-10 text-2xl bg-transparent border-none cursor-pointer p-0"
            aria-label="กลับ"
          >
            ←
          </button>
          <h1 className="text-7xl font-sov-yeehor">แผนที่</h1>
        </div>
        <h3 className="text-md text-clay-light font-fc-quantum pt-2">
          ดูรายชื่อกิจกรรม และรอบเวลา <br></br>ของเวทีลานเกียร์
        </h3>
        <div className="relative w-full h-8 overflow-hidden">
          <Image
            src="/map/map-line.png"
            alt=""
            fill
            className="object-fill scale-102 translate-y- z-index-20"
          />
        </div>
      </div>

      {/* Map Area */}
      <div className="bg-cream-tanned py-3 z-0 -mt-5 pb-10">
        <div className="mx-4 mt-10 my-3 overflow-hidden rounded-2xl bg-cream-tanned">
          <iframe
            src="/map/engineer.html"
            title="แผนที่"
            className="block w-full aspect-[4/3] border-0"
          />
        </div>
        {/* text */}
        <div className="flex items-center gap-2 px-4 py-3 text-base text-brownie-light">
          <Image src="/map/hand.png" alt="" width={23} height={21} />
          <span>แตะบนอาคารที่ต้องการดูแผนที่ชมรม</span>
        </div>
      </div>

      {/* Building Info - โผล่ขึ้นมาในหน้าเดียวกันเมื่อเลือกตึก */}
      <div className="">
        {selected && (
          <div ref={infoRef}>
            <BuildingInfo buildingName={selected.name} clubs={selected.clubs} />
          </div>
        )}
      </div>
      <Sponsor />
    </div>
  )
}
