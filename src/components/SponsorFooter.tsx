import Image from "next/image"
import { bigSponsors, mediumSponsors, smallSponsors } from "@/features/sponsor/const/data"

export default function Footer() {
  const allSmallSponsors = [...mediumSponsors, ...smallSponsors]

  return (
    <footer className="relative w-full bg-brick-orange pt-10 pb-34">
      {/* เส้นลายกระดาษฉีกด้านบน */}
      <div className="absolute top-0 left-0 z-40 h-12 w-full -translate-y-1/2 overflow-hidden">
        <Image src="/sponsor/sponsor-line.svg" alt="" fill className="object-fill scale-x-105" />
      </div>

      <div className="mx-auto max-w-6xl px-3">
        <h2 className="mb-10 text-center text-5xl font-sov-yeehor text-cream-tanned">
          ขอขอบคุณผู้สนับสนุน
        </h2>

        {/* BIG */}
        <div className="mb-10 flex flex-wrap justify-center gap-4">
          {bigSponsors.map((sponsor) => (
            <div key={sponsor.name} className="relative h-19 w-22 overflow-hidden">
              <Image
                src={`/sponsor/brand/${sponsor.image}`}
                alt={sponsor.name}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>

        {/* MEDIUM + SMALL */}
        <div className="flex flex-wrap justify-center gap-3">
          {allSmallSponsors.map((sponsor) => (
            <div key={sponsor.name} className="relative h-14 w-14 overflow-hidden bg-white">
              <Image
                src={`/sponsor/brand/${sponsor.image}`}
                alt={sponsor.name}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}
