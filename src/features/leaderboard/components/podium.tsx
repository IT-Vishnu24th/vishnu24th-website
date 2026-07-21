import Image from "next/image"
import { motion } from "motion/react"
import type { LeaderboardResponse } from "@/types/leaderboard"
import { getYaanBannerSrc } from "@/features/leaderboard/utils/yaanBanner"

type Props = {
  top3: LeaderboardResponse["top3"]
}

const CARD_STYLE = [
  // index 0 -> rank #1 (กลาง, ใหญ่สุด, ตรง)
  {
    rotate: 0,
    z: "z-30",
    size: "h-44 w-32",
    offset: "-mt-0",
    stackX: 0,
    stackY: 0,
    flutterX: 8,
    flutterRotate: 4,
    delay: 0.2,
  },
  // index 1 -> rank #2 (ซ้าย, เอียงซ้าย)
  {
    rotate: -6,
    z: "z-20",
    size: "h-44 w-32",
    offset: "-mr-5 mt-20",
    stackX: 108,
    stackY: -62,
    flutterX: -10,
    flutterRotate: -5,
    delay: 0.28,
  },
  // index 2 -> rank #3 (ขวา, เอียงขวา)
  {
    rotate: 6,
    z: "z-10",
    size: "h-44 w-32",
    offset: "-ml-8 mt-30",
    stackX: -96,
    stackY: -84,
    flutterX: 10,
    flutterRotate: 5,
    delay: 0.36,
  },
]

export default function Podium({ top3 }: Props) {
  return (
    <div className="relative flex items-center justify-center py-10 ">
      {[1, 0, 2].map((index) => {
        const item = top3[index]

        if (!item) return null

        const style = CARD_STYLE[index]
        const yaanBannerSrc = getYaanBannerSrc(item.vesselName)

        return (
          <motion.div
            key={index}
            className={`${style.z} ${style.offset}`}
            initial={{
              opacity: 0,
              x: style.stackX,
              y: 230,
              rotate: style.flutterRotate,
              scale: 0.86,
              filter: "blur(5px)",
            }}
            animate={{
              opacity: [0, 1, 1, 1, 1, 1],
              x: [
                style.stackX,
                style.stackX + style.flutterX,
                style.stackX - style.flutterX * 0.45,
                style.stackX,
                style.stackX,
                0,
              ],
              y: [230, style.stackY + 44, style.stackY - 8, style.stackY, style.stackY, 0],
              rotate: [
                style.flutterRotate,
                -style.flutterRotate * 0.8,
                style.flutterRotate * 0.45,
                0,
                0,
                style.rotate,
              ],
              scale: [0.86, 0.96, 1.03, 1, 1, 1],
              filter: [
                "blur(5px)",
                "blur(2px)",
                "blur(0px)",
                "blur(0px)",
                "blur(0px)",
                "blur(0px)",
              ],
            }}
            transition={{
              duration: 1.16,
              delay: style.delay,
              ease: [0.16, 1, 0.3, 1],
              times: [0, 0.24, 0.38, 0.5, 0.66, 1],
            }}
          >
            <div
              className={`
                ${style.size}
                relative
                flex flex-col items-center gap-1
                overflow-hidden rounded-sm
                px-3 py-3
                shadow-[3px_4px_0_rgba(0,0,0,0.15)]
              `}
              style={{
                clipPath: "polygon(2% 0%, 98% 1%, 100% 98%, 3% 100%)",
              }}
            >
              {/* Background paper texture */}
              <Image
                src="/leaderboard/wanted-top3.png"
                alt=""
                fill
                sizes="128px"
                className="-z-10 object-fill"
              />

              {/* WANTED header */}
              <div className="text-2xl tracking-wide text-[#3a2a1a] font-sov-yeehor">
                <span className="text-brick-orange">#{item.rank}</span> WANTED
              </div>

              {/* Vessel image */}
              <div className="relative h-24 w-full flex-1 overflow-hidden rounded-sm px-2 py-2">
                {yaanBannerSrc && (
                  <Image
                    src={yaanBannerSrc}
                    alt={item.vesselName?.th ?? "Vessel"}
                    fill
                    sizes="128px"
                    className="object-contain"
                  />
                )}
              </div>

              {/* Vessel name */}
              <p className="break-words text-center font-sov-yeehor text-xl text-[#3a2a1a] -mt-2">
                {item.vesselName?.th ?? "NameNotfound"}
              </p>

              {/* Score */}
              <p className="text-xl font-sov-yeehor text-brick-orange -mt-3 text-balance text-center leading-[0.8]">
                {item.score.toLocaleString()} เหรียญทอง
              </p>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
