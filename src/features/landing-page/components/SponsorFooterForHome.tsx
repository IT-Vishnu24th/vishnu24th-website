import Image from "next/image"
import { bigSponsors, mediumSponsors, smallSponsors } from "@/features/sponsor/const/data"
import { ParallaxLayer } from "@/components/ParallaxLayer"

export default function Footer() {
  return (
    <footer className="relative w-full overflow-visible pt-15 pb-20">
      {/* bg สีส้ม */}
      <div className="absolute inset-0 z-0 bg-[#F0865C]" />

      {/* sponsor art*/}
      <ParallaxLayer
        className="object-contain absolute left-1/2 top-30 z-30 h-[893px] w-full max-w-[820px] -translate-x-1/2 overflow-visible"
        mode="local"
        speed={1.25}
      >
        <Image
          src="/landingpage/sponsor-art.png"
          fill
          sizes="820px"
          className="object-fill object-top"
          alt=""
        />
      </ParallaxLayer>

      <div className="relative z-40 mx-auto max-w-6xl px-3">
        <h2 className="mb-8 text-center text-5xl font-sov-yeehor ">ขอขอบคุณผู้สนับสนุน</h2>

        {/* BIG */}
        <div className="mb-5 flex flex-wrap items-center justify-center">
          {bigSponsors.map((sponsor) => (
            <div key={sponsor.name} className="relative h-24 w-36 overflow-hidden">
              <Image
                src={`/sponsor/brand/${sponsor.image}`}
                alt={sponsor.name}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>

        {/* MEDIUM */}
        <div className="mb-5 flex flex-wrap justify-center gap-4">
          {mediumSponsors.map((sponsor) => (
            <div key={sponsor.name} className="relative h-15 w-20 overflow-hidden bg-white">
              <Image
                src={`/sponsor/brand/${sponsor.image}`}
                alt={sponsor.name}
                fill
                className="object-contain p-2"
              />
            </div>
          ))}
        </div>

        {/* SMALL */}
        <div className="flex flex-wrap justify-center gap-3">
          {smallSponsors.map((sponsor) => (
            <div key={sponsor.name} className="relative h-13 w-15 overflow-hidden bg-white">
              <Image
                src={`/sponsor/brand/${sponsor.image}`}
                alt={sponsor.name}
                fill
                className="object-contain p-1"
              />
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}
