"use client"

import { useEffect, useState } from "react"
import { Header2 } from "@/components/Headers"
import { QrCode } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Rocket } from "lucide-react"

import type { LeaderboardResponse } from "@/types/leaderboard"

export default function ScorePage() {
  const router = useRouter()
  const [data, setData] = useState<LeaderboardResponse | null>(null)

  useEffect(() => {
    fetch("/api/leaderboard")
      .then((res) => res.json())
      .then((res) => setData(res.data))
      .catch((err) => console.error("Failed to fetch leaderboard:", err))
  }, [])

  return (
    <div className="mx-auto min-h-screen bg-brownie">
      <div className="relative bg-gradient-to-b from-midnight to-brownie">
        <Header2 url="/game" title="เกมส์" />

        {/* Top */}
        <div className="relative px-4">
          <div className="text-center">
            <h1 className="text-6xl font-sov-yeehor">YAAN AQUARIUM</h1>

            <p className="mt-4 text-2xl font-fc-quantum">{data?.vesselName?.th ?? "-"}</p>
          </div>
        </div>
        <div className="relative w-full h-10 overflow-hidden mt-3">
          <Image src="/map/map-line.png" alt="" fill className="object-fill scale-102 z-20" />
        </div>
      </div>

      {/* Logo */}
      <div className="relative z-10 pb-15 bg-gradient-to-b from-brownie via-turqoise-light to-brownie -mt-5 pt-10">
        <Image src="/scan/slide-bg.png" alt="" fill className="pointer-events-none object-fill" />

        <div
          className="
          flex
          h-[230px]
          items-center
          justify-center 
        "
        >
          <div
            className="
            flex
            items-center
            justify-center
            bg-[#d5d5d5]
            text-5xl
            font-bold
            p-20
          "
          >
            LOGO
          </div>
        </div>

        <div className="px-4 pt-5">
          <div className="relative overflow-hidden rounded-2xl">
            <Image src="/scan/score-paper.png" alt="" fill className="object-fill" />

            <div className="relative z-10 flex items-center gap-4 px-10 py-5 text-brownie font-fc-quantum">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brownie">
                <Rocket size={34} strokeWidth={2.5} className="text-cream-tanned" />
              </div>
              <div className="flex-1">
                <p className="text-lg">คะแนนรวมของยาน</p>

                <h2 className="text-4xl font-bold ">{(data?.score ?? 0).toLocaleString()}</h2>

                <p className="text-sm">คะแนน</p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 pt-3">
          <button
            onClick={() => router.push("/scan/qr")}
            className="relative w-full overflow-hidden rounded-2xl"
          >
            <Image src="/scan/wooden-scan.png" alt="" fill className="object-fill" />

            <div className="relative z-10 flex items-center gap-4 px-15 py-6 font-fc-quantum ">
              <QrCode size={40} />

              <div className="text-left">
                <p className="text-xl">สแกน QR Code</p>
                <p>เช็คอินชมรม</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
