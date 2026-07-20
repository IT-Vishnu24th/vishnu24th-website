"use client"

import Image from "next/image"
import { motion } from "motion/react"
import { Header } from "@/components/Headers"

const PREVIEW_TOP3 = [
  {
    rank: 1,
    image: "/auth/profile/profile_1.png",
    z: "z-30",
    offset: "-mt-0",
    finalRotate: 0,
    finalStackX: 0,
    stackY: 0,
    flutterX: 8,
    flutterRotate: 4,
    delay: 0.2,
  },
  {
    rank: 2,
    image: "/auth/profile/profile_2.png",
    z: "z-20",
    offset: "-mr-5 mt-20",
    finalRotate: -6,
    finalStackX: 108,
    stackY: -62,
    flutterX: -10,
    flutterRotate: -5,
    delay: 0.28,
  },
  {
    rank: 3,
    image: "/auth/profile/profile_3.png",
    z: "z-10",
    offset: "-ml-8 mt-30",
    finalRotate: 6,
    finalStackX: -96,
    stackY: -84,
    flutterX: 10,
    flutterRotate: 5,
    delay: 0.36,
  },
]

function PreviewPodium() {
  return (
    <div className="relative flex items-center justify-center py-10">
      {[1, 0, 2].map((index) => {
        const item = PREVIEW_TOP3[index]

        return (
          <motion.div
            key={item.rank}
            className={`${item.z} ${item.offset}`}
            initial={{
              opacity: 0,
              x: item.finalStackX,
              y: 230,
              rotate: item.flutterRotate,
              scale: 0.86,
              filter: "blur(5px)",
            }}
            animate={{
              opacity: [0, 1, 1, 1, 1, 1],
              x: [
                item.finalStackX,
                item.finalStackX + item.flutterX,
                item.finalStackX - item.flutterX * 0.45,
                item.finalStackX,
                item.finalStackX,
                0,
              ],
              y: [230, item.stackY + 44, item.stackY - 8, item.stackY, item.stackY, 0],
              rotate: [
                item.flutterRotate,
                -item.flutterRotate * 0.8,
                item.flutterRotate * 0.45,
                0,
                0,
                item.finalRotate,
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
              delay: item.delay,
              ease: [0.16, 1, 0.3, 1],
              times: [0, 0.24, 0.38, 0.5, 0.66, 1],
            }}
          >
            <div
              className="
                relative
                flex h-44 w-32 flex-col items-center gap-2
                overflow-hidden rounded-sm
                px-3 py-3
                shadow-[3px_4px_0_rgba(0,0,0,0.15)]
              "
              style={{
                clipPath: "polygon(2% 0%, 98% 1%, 100% 98%, 3% 100%)",
              }}
            >
              <Image
                src="/leaderboard/wanted-top3.png"
                alt=""
                fill
                sizes="128px"
                className="-z-10 object-fill"
              />

              <div className="text-2xl tracking-wide text-[#3a2a1a] font-sov-yeehor">
                <span className="text-brick-orange">#{item.rank}</span> WANTED
              </div>

              <div className="relative h-24 w-full flex-1 overflow-hidden rounded-sm px-2 py-2">
                <Image src={item.image} alt="" fill sizes="128px" className="object-contain p-2" />
              </div>

              <p className="break-words text-center font-sov-yeehor text-xl text-[#3a2a1a] -mt-2">
                กลุ่มที่...
              </p>

              <span className="text-xl font-sov-yeehor text-brick-orange -mt-5">XXX คะแนน</span>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

function PreviewMyRank() {
  return (
    <motion.div
      className="relative z-20 mt-8"
      initial={{ opacity: 0, y: 96, scale: 0.96, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.6, delay: 1.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative mx-4 overflow-hidden rounded-md py-10">
        <Image src="/leaderboard/wanted-own.png" alt="" fill className="z-10 object-cover" />

        <h2 className="relative z-10 text-center font-sov-yeehor text-5xl text-[#3a2a1a]">
          อันดับของคุณ
        </h2>

        <div className="relative z-10 mx-auto mt-4 flex w-fit items-center justify-center rounded-full bg-[#f8ead9] px-6 py-2">
          <span className="font-sov-yeehor text-6xl font-black leading-none -translate-y-4">
            <span className="text-[#a8382a]">#1</span>{" "}
            <span className="text-[#3a2a1a]">WANTED</span>
          </span>
        </div>

        <p className="relative z-10 mt-4 break-words text-center font-sov-yeehor text-5xl text-[#3a2a1a]">
          กลุ่มที่...
        </p>

        <p className="relative z-10 mb-10 text-center font-sov-yeehor text-5xl text-[#c46a2e]">
          XXXX คะแนน
        </p>
      </div>
    </motion.div>
  )
}

export default function UnrevealedLeaderboard() {
  return (
    <div>
      <section className="w-full bg-[linear-gradient(180deg,#2D3542_38.94%,#2D4B5F_100%)] text-black">
        <Header />
        <div className="px-4 pb-8 flex w-full flex-col items-center justify-center gap-5 text-center">
          <h1 className="whitespace-nowrap text-[96px] font-sov-yeehor font-normal leading-none letter-spacing-[1.92px] text-turqoise">
            อันดับกลุ่ม
          </h1>
        </div>
        <div className="w-full relative h-3 [@media(min-width:480px)]:h-5">
          <img src="/explore/dark_blue_curve.svg" alt="" className="w-full absolute z-10" />
          <img src="/explore/blue_curve.svg" alt="" className="w-full absolute z-20" />
        </div>
      </section>

      <div className="relative pt-6 overflow-hidden bg-gradient-to-b from-cream-tanned to-clay-light">
        <div className="relative">
          <Image
            src="/leaderboard/leaderboard-bg.png"
            alt=""
            fill
            sizes="100vw"
            className="pointer-events-none z-0 object-contain mt-28 scale-150"
          />
          <div className="relative z-10">
            <PreviewPodium />
          </div>
        </div>

        <PreviewMyRank />
      </div>
    </div>
  )
}
