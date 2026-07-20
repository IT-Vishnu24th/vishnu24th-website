"use client"

import { Header2 } from "@/components/Headers"
import Image from "next/image"
import Sponsor from "@/components/SponsorFooter"
import BuildingInfo from "@/features/map/components/BuildingInfo"
import NavigationFooter from "@/components/NavigationFooter"

export default function MapPage() {
  return (
    <div>
      {/* Top Bar */}
      <section className="w-full bg-[linear-gradient(180deg,#2D3542_0%,#934E43_100%)] text-black">
        <Header2 url="/explore" title="สำรวจ" />
        <div className="px-4 pb-8 flex w-full flex-col items-center justify-center gap-8 text-center">
          <h1 className="whitespace-nowrap text-[64px] font-sov-yeehor font-normal leading-12.5 letter-spacing-[1.92px] text-cream">
            แผนที่
          </h1>
          <p className="max-w-75 text-[15px] font-normal font-fc-quantum leading-none text-clay-light">
            ดูตำแหน่งสถานที่ต่าง ๆ ในคณะวิศวกรรมศาสตร์ <br />
            จุดพยาบาล 24 ชั่วโมงที่ตึก 3 ชั้น 4 ห้อง 406
          </p>
        </div>
        <div className="w-full relative h-3 [@media(min-width:480px)]:h-5">
          <img src="/explore/clay_curve.svg" alt="" className="w-full absolute z-10" />
          <img src="/explore/light_clay_curve.svg" alt="" className="w-full absolute z-20" />
        </div>
      </section>

      {/* Map */}
      <div className=" bg-cream-tanned py-3 pt-6 pb-10">
        <div className="mx-4 mt-10 overflow-hidden rounded-2xl">
          <Image
            src="/map/map.png"
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
