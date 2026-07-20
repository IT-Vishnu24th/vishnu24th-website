import Image from "next/image"
import { diamondSponsors, goldSponsors, silverSponsors } from "@/features/sponsor/const/data"

export default function Footer() {
  return (
    <footer className="relative w-full bg-brick-orange pt-1 pb-22">
      {/* เส้นลายกระดาษฉีกด้านบน */}
      <div className="absolute top-0 left-0 z-40 w-full -translate-y-1/2">
        <Image
          src="/sponsor/sponsor-line.svg"
          alt=""
          width={1920}
          height={120}
          className="h-auto w-full"
          priority
        />
      </div>

      <div className="mx-auto flex max-w-6xl items-center justify-center px-4 md:px-5">
        <div className="flex min-w-0 flex-col items-center">
          <h2 className="mb-5 text-center text-3xl font-sov-yeehor text-cream-tanned sm:text-4xl md:text-5xl">
            ขอขอบคุณผู้สนับสนุน
          </h2>

          {/* Diamond */}
          <div className="mb-4 flex flex-wrap items-center justify-center gap-3">
            {diamondSponsors.map((sponsor) => (
              <div key={sponsor.name} className="relative h-13 w-18 overflow-hidden">
                <Image
                  src={`/sponsor/brand/${sponsor.image}`}
                  alt={sponsor.name}
                  fill
                  sizes="96px"
                  className="object-contain"
                />
              </div>
            ))}
          </div>

          {/* Gold */}
          <div className="mb-3 flex flex-wrap items-center justify-center gap-3">
            {goldSponsors.map((sponsor) => (
              <div key={sponsor.name} className="relative h-9 w-13 overflow-hidden bg-white">
                <Image
                  src={`/sponsor/brand/${sponsor.image}`}
                  alt={sponsor.name}
                  fill
                  sizes="64px"
                  className="object-contain p-1.5"
                />
              </div>
            ))}
          </div>

          {/* Silver */}
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {silverSponsors.map((sponsor) => (
              <div key={sponsor.name} className="relative h-7 w-10 overflow-hidden bg-white">
                <Image
                  src={`/sponsor/brand/${sponsor.image}`}
                  alt={sponsor.name}
                  fill
                  sizes="44px"
                  className="object-contain p-1"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
