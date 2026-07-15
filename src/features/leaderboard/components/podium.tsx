import Image from "next/image"
import type { LeaderboardResponse } from "@/types/leaderboard"

type Props = {
  top3: LeaderboardResponse["top3"]
}

const CARD_STYLE = [
  // index 0 -> rank #1 (กลาง, ใหญ่สุด, ตรง)
  { rotate: "rotate-0", z: "z-20", size: "h-44 w-32", offset: "-mt-0" },
  // index 1 -> rank #2 (ซ้าย, เอียงซ้าย)
  { rotate: "-rotate-6", z: "z-10", size: "h-44 w-32", offset: "-mr-5 mt-20" },
  // index 2 -> rank #3 (ขวา, เอียงขวา)
  { rotate: "rotate-6", z: "z-10", size: "h-44 w-32", offset: "-ml-8 mt-30" },
]

export default function Podium({ top3 }: Props) {
  return (
    <div className="relative flex items-center justify-center py-10 ">
      {[1, 0, 2].map((index) => {
        const item = top3[index]

        if (!item) return null

        const style = CARD_STYLE[index]

        return (
          <div
            key={index}
            className={`
              ${style.rotate}
              ${style.z}
              ${style.size}
              ${style.offset}
              relative
              flex flex-col items-center gap-2
              overflow-hidden rounded-sm
              px-3 py-3
              shadow-[3px_4px_0_rgba(0,0,0,0.15)]
            `}
            style={{
              clipPath: "polygon(2% 0%, 98% 1%, 100% 98%, 3% 100%)",
            }}
          >
            {/* Background paper texture */}
            <Image src="/leaderboard/wanted-top3.png" alt="" fill className="-z-10 object-fill" />

            {/* WANTED header */}
            <div className="text-2xl tracking-wide text-[#3a2a1a] font-sov-yeehor">
              <span className="text-brick-orange">#{item.rank}</span> WANTED
            </div>

            {/* Vessel image */}
            <div className="relative h-24 w-full flex-1 overflow-hidden rounded-sm px-2 py-2">
              <Image
                src="/sponsor/brand/brighthair.png"
                alt={item.vesselName?.th ?? ""}
                fill
                className="object-contain p-2"
              />
            </div>

            {/* Vessel name */}
            <p className="break-words text-center font-sov-yeehor text-xl text-[#3a2a1a] -mt-2">
              {item.vesselName?.th ?? "NameNotfound"}
            </p>

            {/* Score */}
            <span className="text-xl font-sov-yeehor text-brick-orange -mt-5">
              {item.score.toLocaleString()} คะแนน
            </span>
          </div>
        )
      })}
    </div>
  )
}
