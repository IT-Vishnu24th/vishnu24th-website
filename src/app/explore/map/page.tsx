"use client"

import { Header } from "@/components/Headers"
import Image from "next/image"
import { useRouter } from "next/navigation"
import Sponsor from "@/components/SponsorFooter"
import BuildingInfo from "@/features/map/components/BuildingInfo"
import NavigationFooter from "@/components/NavigationFooter"

export default function MapPage() {
  const router = useRouter()

  return (
    <div>
      {/* Top Bar */}
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

          <h1 className="text-7xl font-sov-yeehor">แผนที่</h1>
        </div>

        <h3 className="text-md text-clay-light font-fc-quantum pt-2">
          ดูรายชื่อกิจกรรม และรอบเวลา <br />
          ของเวทีลานเกียร์
        </h3>

        <div className="relative w-full h-8 overflow-hidden mt-3">
          <Image src="/map/map-line.png" alt="" fill className="object-fill scale-102" />
        </div>
      </div>

      {/* Map */}
      <div className="bg-cream-tanned py-3 -mt-5 pb-10">
        <div className="mx-4 mt-10 overflow-hidden rounded-2xl">
          <Image
            src="/map/map.svg"
            alt="Map"
            width={1000}
            height={700}
            className="w-full h-auto rounded-2xl"
          />
        </div>
      </div>

      {/* Building Info แสดงตลอด */}
      <BuildingInfo buildingName="ลานเกียร์" />

      <Sponsor />
      <NavigationFooter />
    </div>
  )
}
