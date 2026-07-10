import Image from "next/image"
import { bigSponsors, mediumSponsors, smallSponsors } from "@/features/sponsor/const/data"

export default function Footer() {
  return (
    <footer className="relative w-full bg-[#F0865C] pt-16 pb-24">
      {/* เส้นลายกระดาษฉีกด้านบน */}
      <div className="absolute z-40 top-0 left-0 h-10 w-full -translate-y-1/2">
        <Image src="/sponsor/sponsor-line.png" alt="" fill className="object-fill scale-105" />
      </div>

      <div className="mx-auto max-w-6xl px-3">
        <h2 className="mb-10 text-center text-4xl font-sov-yeehor text-white">
          ขอขอบคุณผู้สนับสนุน
        </h2>

        {/* BIG */}
        <div className="mb-8 flex flex-wrap justify-center gap-6">
          {bigSponsors.map((sponsor) => (
            <div
              key={sponsor.name}
              className="relative h-20 w-32 overflow-hidden rounded-lg bg-neutral-200/90"
            >
              <Image
                src={`/sponsor/brand/${sponsor.image}`}
                alt={sponsor.name}
                fill
                className="object-contain p-2"
              />
            </div>
          ))}
        </div>

        {/* MEDIUM */}
        <div className="mb-8 flex flex-wrap justify-center gap-5">
          {mediumSponsors.map((sponsor) => (
            <div
              key={sponsor.name}
              className="relative h-16 w-24 overflow-hidden rounded-lg bg-neutral-200/90"
            >
              <Image src={sponsor.image} alt={sponsor.name} fill className="object-contain p-2" />
            </div>
          ))}
        </div>

        {/* SMALL */}
        <div className="flex flex-wrap justify-center gap-4">
          {smallSponsors.map((sponsor) => (
            <div
              key={sponsor.name}
              className="relative h-14 w-20 overflow-hidden rounded-lg bg-neutral-200/90"
            >
              <Image src={sponsor.image} alt={sponsor.name} fill className="object-contain p-2" />
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}
