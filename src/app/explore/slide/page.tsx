"use client"

import { Download, FileText } from "lucide-react"
import { Header } from "@/components/Headers"
import { SLIDES } from "@/features/slide/const/mock"
import { useRouter } from "next/navigation"
import NavigationFooter from "@/components/NavigationFooter"
import SponsorFooter from "@/components/SponsorFooter"
import Image from "next/image"

export default function DownloadPage() {
  const router = useRouter()
  return (
    <div className="mx-auto min-h-screen pb-8">
      <div className="bg-gradient-to-b from-midnight to-brownie">
        <Header />
        {/* Top Bar */}
        <div className="relative flex items-center px-4 pb-2">
          <h1 className="w-full text-center text-8xl font-sov-yeehor">ดาวน์โหลด</h1>
        </div>

        {/* description */}
        <div className="px-5 pt-2">
          <p className="text-center text-lg font-fc-quantum px-7">
            สไลด์รวมข้อมูลที่ชาววิศวะจุฬาควรรู้ไว้ในที่เดียว
          </p>
        </div>
        <div className="relative w-full h-10 overflow-hidden mt-3">
          <Image src="/map/map-line.png" alt="" fill className="object-fill scale-102 z-20" />
        </div>
      </div>

      {/* list */}
      <div className="relative -mt-5 flex flex-col gap-4 bg-cream px-4 pt-15 pb-10">
        <Image src="/slide/slide-bg.png" alt="" fill className="pointer-events-none object-fill" />

        {SLIDES.map((slide) => (
          <div
            key={slide.id}
            className="relative z-10 rounded-2xl bg-cream-tanned px-5 py-5 shadow-sm font-fc-quantum"
          >
            {/* Top */}
            <div className="flex items-start justify-between gap-4">
              <h2 className="min-w-0 flex-1 break-words text-xl font-semibold leading-tight text-brownie">
                {slide.title}
              </h2>

              <a
                href={`/slide/slidedownload/${slide.file}`}
                download
                target="_blank"
                className="flex shrink-0 items-center justify-center gap-2 rounded-full border-2 border-midnight bg-turqoise px-5 py-3 font-fc-quantum transition hover:bg-turqoise-light"
              >
                <Download size={18} className="text-midnight" />
                <span className="whitespace-nowrap text-md font-bold text-midnight">ดาวน์โหลด</span>
              </a>
            </div>

            {/* Description */}
            <p className="mt-4 break-words text-base leading-relaxed text-brick-orange">
              {slide.description}
            </p>
          </div>
        ))}
      </div>
      <SponsorFooter />
      <NavigationFooter />
    </div>
  )
}
