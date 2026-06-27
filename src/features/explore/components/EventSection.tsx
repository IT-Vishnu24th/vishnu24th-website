import Image from "next/image"
import Link from "next/link"

type ExploreItem = {
  title: string
  description: string
  href: string
  titleSize?: string
}

const exploreItems: ExploreItem[] = [
  {
    title: "แผนที่",
    description: "เรือทุกลำต้องมีระหว่างการเดินทางในโลกวิศวะ",
    href: "/map",
  },
  {
    title: "ชมรม",
    description: "เปิดโลกตามหาพรรคพวกที่คู่ควร",
    href: "/explore/club",
  },
  {
    title: "อีเวนต์",
    description: "ดูโชว์พิเศษจากชมรมต่างๆ ในวัน Intania First Date",
    href: "/schedule",
  },
  {
    title: "ดาวน์โหลด",
    description: "สไลด์ และของสวยๆงามๆ ที่เอ่อออออ",
    href: "/announcement",
  },
]

export function EventSection() {
  return (
    <section aria-label="Explore" className="w-full">
      {exploreItems.map((item, index) => (
        <Link
          key={item.title}
          href={item.href}
          className={`flex min-h-37.75 w-full items-center justify-center gap-8 px-8 py-8 text-black ${
            index % 2 === 0 ? "bg-[#ededed]" : "bg-white"
          }`}
        >
          <Image
            src="/explore/cool-artwork.svg"
            alt=""
            width={104}
            height={59}
            className="h-14.75 w-26 shrink-0"
            priority={index === 0}
          />

          <div className="flex w-48.25 shrink-0 flex-col items-start justify-center gap-2">
            <h2 className="whitespace-nowrap text-4xl font-bold leading-none tracking-[0.02em]">
              {item.title}
            </h2>
            <p className="w-full text-left text-[16px] font-normal leading-[1.4]">
              {item.description}
            </p>
          </div>
        </Link>
      ))}
    </section>
  )
}
