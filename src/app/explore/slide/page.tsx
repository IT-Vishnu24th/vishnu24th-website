import { Download, FileText, Lock } from "lucide-react"
import { Header2 } from "@/components/Headers"
import { SLIDES } from "@/features/slide/const/mock"
import NavigationFooter from "@/components/NavigationFooter"
import SponsorFooter from "@/components/SponsorFooter"
import Image from "next/image"

export default function DownloadPage() {
  const now = new Date()
  return (
    <div className="w-full overflow-x-hidden">
      <section className="w-full bg-[linear-gradient(180deg,#2D3542_0%,#934E43_100%)] text-black">
        <Header2 url="/explore" title="สำรวจ" />
        <div className="px-4 pb-8 flex w-full flex-col items-center justify-center gap-8 text-center">
          <h1 className="whitespace-nowrap text-[64px] font-sov-yeehor font-normal leading-12.5 letter-spacing-[1.92px] text-cream">
            ดาวน์โหลด
          </h1>
          <p className="max-w-75 text-[20px] font-normal font-fc-quantum leading-none text-clay-light">
            สไลด์รวมข้อมูลที่ชาววิศวะจุฬาควรรู้ไว้ในที่เดียว
          </p>
        </div>
        <div className="w-full relative h-3 [@media(min-width:480px)]:h-5">
          <img src="/explore/clay_curve.svg" alt="" className="w-full absolute z-10" />
          <img src="/explore/light_clay_curve.svg" alt="" className="w-full absolute z-20" />
        </div>
      </section>

      {/* list */}
      <div className="relative flex flex-col gap-4 bg-cream px-4 pt-20 pb-10">
        <Image src="/slide/slide-bg.png" alt="" fill className="pointer-events-none object-fill" />

        {SLIDES.map((slide) => {
          const released = new Date() >= new Date(slide.releaseAt)

          if (!released) {
            return (
              <div
                key={slide.id}
                className="relative z-10 flex flex-col items-center justify-center rounded-2xl bg-cream-tanned py-10"
              >
                <Lock size={48} className="text-brownie" />
                <p className="mt-4 font-fc-quantum text-brownie">เอกสารนี้ยังไม่เปิดให้ดาวน์โหลด</p>
              </div>
            )
          }

          return (
            <div
              key={slide.id}
              className="relative z-10 rounded-2xl bg-cream-tanned px-5 py-5 shadow-sm font-fc-quantum"
            >
              <div className="flex items-start justify-between gap-4">
                <h2 className="min-w-0 flex-1 break-words text-xl font-semibold leading-tight text-brownie">
                  {slide.title}
                </h2>

                <a
                  href={`/slide/slidedownload/${slide.file}`}
                  download
                  target="_blank"
                  className="flex shrink-0 items-center justify-center gap-2 rounded-full border-2 border-midnight bg-turqoise px-5 py-3 transition hover:bg-turqoise-light"
                >
                  <Download size={18} className="text-midnight" />
                  <span className="whitespace-nowrap text-md font-bold text-midnight">
                    ดาวน์โหลด
                  </span>
                </a>
              </div>

              <p className="mt-4 break-words text-base leading-relaxed text-brick-orange">
                {slide.description}
              </p>
            </div>
          )
        })}
      </div>
      <SponsorFooter />
      <NavigationFooter />
    </div>
  )
}
