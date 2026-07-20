import Image from "next/image"
import {
  diamondSponsors,
  goldSponsors,
  silverSponsors,
  bronzeSponsors,
} from "@/features/sponsor/const/data"
import { ParallaxLayer } from "@/components/ParallaxLayer"

export default function Footer() {
  return (
    <footer className="relative w-full overflow-visible pt-15 pb-20">
      {/* bg สีส้ม */}
      <div className="absolute inset-0 z-0 bg-[#F0865C]" />

      {/* sponsor art*/}
      <ParallaxLayer
        className="object-contain absolute left-1/2 -top-3 z-30 h-[893px] w-full max-w-[820px] -translate-x-1/2 overflow-visible"
        mode="local"
        speed={1.1}
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

        {/* Diamond */}
        <div className="mb-3 flex flex-wrap items-center justify-center">
          {diamondSponsors.map((sponsor) => {
            const isGulf = sponsor.name === "gulf"

            return (
              <div
                key={sponsor.name}
                className={`relative overflow-hidden ${isGulf ? "h-30 w-50" : "h-24 w-36"}`}
              >
                <Image
                  src={`/sponsor/brand/${sponsor.image}`}
                  alt={sponsor.name}
                  fill
                  className="object-contain"
                />
              </div>
            )
          })}
        </div>

        {/* Gold */}
        <div className="mb-5 flex flex-wrap justify-center gap-4">
          {goldSponsors.map((sponsor) => (
            <div key={sponsor.name} className="relative h-17 w-23 overflow-hidden bg-white">
              <Image
                src={`/sponsor/brand/${sponsor.image}`}
                alt={sponsor.name}
                fill
                className="object-contain p-2"
              />
            </div>
          ))}
        </div>

        {/* Silver */}
        <div className="mb-5 flex flex-wrap justify-center gap-3">
          {silverSponsors.map((sponsor) => (
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

        {/* Bronze */}
        <div className="flex flex-wrap justify-center gap-3">
          {bronzeSponsors.map((sponsor) => (
            <div key={sponsor.name} className="relative h-8 w-10 overflow-hidden bg-white">
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
