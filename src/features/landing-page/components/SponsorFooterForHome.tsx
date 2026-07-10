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
        <h2 className="mb-8 text-center text-4xl font-sov-yeehor">ขอขอบคุณผู้สนับสนุน</h2>

        {/* BIG */}
        <div className="mb-8 flex flex-col items-center gap-5 z-50">
          {/* แถวบน 2 อัน */}
          <div className="flex justify-center gap-5">
            {bigSponsors.slice(0, 2).map((sponsor) => (
              <div
                key={sponsor.name}
                className="relative h-20 w-28 overflow-hidden rounded-xl bg-neutral-200"
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

          {/* แถวล่าง 1 อัน */}
          <div className="flex justify-center">
            <div className="relative h-20 w-28 overflow-hidden rounded-xl bg-neutral-200">
              <Image
                src={`/sponsor/brand/${bigSponsors[2].image}`}
                alt={bigSponsors[2].name}
                fill
                className="object-contain p-2"
              />
            </div>
          </div>
        </div>

        {/* MEDIUM */}
        <div className="mb-8 flex flex-wrap justify-center gap-4">
          {mediumSponsors.map((sponsor) => (
            <div
              key={sponsor.name}
              className="relative h-14 w-20 overflow-hidden rounded-lg bg-neutral-200"
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

        {/* SMALL */}
        <div className="flex flex-wrap justify-center gap-3">
          {smallSponsors.map((sponsor) => (
            <div
              key={sponsor.name}
              className="relative h-10 w-14 overflow-hidden rounded-md bg-neutral-200"
            >
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
