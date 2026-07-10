import Image from "next/image"
import { bigSponsors, mediumSponsors, smallSponsors } from "@/features/sponsor/const/data"

export default function Footer() {
  return (
    <footer className="relative w-full pt-10 pb-60">
      {/* bg สีส้ม แยกเป็น layer ล่างสุด */}
      <div className="absolute inset-0 z-0 bg-[#F0865C]" />

      {/* sponsor art: อยู่เหนือ bg แต่ใต้เนื้อหา โผล่พ้นขอบบนของ footer ได้ */}
      <div className="absolute -top-30 inset-0 z-10 pointer-events-none">
        <Image src="/landingpage/sponsor-art.png" fill className="object-fill" alt="" />
      </div>

      <div className="relative z-20 mx-auto max-w-6xl px-3">
        <h2 className="mb-8 text-center text-5xl font-sov-yeehor ">ขอขอบคุณผู้สนับสนุน</h2>

        {/* BIG */}
        <div className="mb-8 flex flex-col items-center ">
          {bigSponsors.map((sponsor) => (
            <div key={sponsor.name} className="relative h-25 w-35 overflow-hidden">
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
        <div className="mb-8 flex flex-wrap justify-center gap-4">
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
