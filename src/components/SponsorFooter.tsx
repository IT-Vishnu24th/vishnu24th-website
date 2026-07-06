import Image from "next/image"

export default function Footer() {
  const bigSponsors = Array.from({ length: 3 }, (_, index) => ({
    id: index,
    name: `Sponsor ${index + 1}`,
  }))

  const mediumSponsors = Array.from({ length: 4 }, (_, index) => ({
    id: index,
    name: `Sponsor ${index + 4}`,
  }))

  const smallSponsors = Array.from({ length: 5 }, (_, index) => ({
    id: index,
    name: `Sponsor ${index + 8}`,
  }))

  return (
    <footer className="relative w-full pt-16 pb-24 bg-[#F0865C]">
      {/* เส้นลายกระดาษฉีกด้านบน */}
      <div className="absolute top-0 left-0 w-full h-10 -translate-y-1/2">
        <Image src="/sponsor/sponsor-line.png" alt="" fill className="object-fill scale-105" />
      </div>

      <div className="max-w-6xl mx-auto px-3">
        <h2 className="text-center text-4xl font-sov-yeehor mb-10 text-white">
          ขอขอบคุณผู้สนับสนุน
        </h2>

        {/* BIG */}
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {bigSponsors.map((sponsor) => (
            <div
              key={sponsor.id}
              className="w-32 h-20 rounded-lg bg-neutral-200/90 flex items-center justify-center text-base font-semibold text-neutral-500 text-center"
            >
              {sponsor.name}
            </div>
          ))}
        </div>

        {/* MEDIUM */}
        <div className="flex flex-wrap justify-center gap-5 mb-8">
          {mediumSponsors.map((sponsor) => (
            <div
              key={sponsor.id}
              className="w-24 h-16 rounded-lg bg-neutral-200/90 flex items-center justify-center text-sm font-semibold text-neutral-500 text-center"
            >
              {sponsor.name}
            </div>
          ))}
        </div>

        {/* SMALL */}
        <div className="flex flex-wrap justify-center gap-4">
          {smallSponsors.map((sponsor) => (
            <div
              key={sponsor.id}
              className="w-20 h-14 rounded-lg bg-neutral-200/90 flex items-center justify-center text-xs font-semibold text-neutral-500 text-center"
            >
              {sponsor.name}
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}
