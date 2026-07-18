"use client"

import { useEffect, useState } from "react"
import { Header2 } from "@/components/Headers"
import { QrCode } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import { Rocket } from "lucide-react"

import type { LeaderboardResponse } from "@/types/leaderboard"

export default function ScorePageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [data, setData] = useState<LeaderboardResponse | null>(null)
  const [revealVessel, setRevealVessel] = useState(false)

  // เก็บค่าไว้ตอน mount ครั้งเดียว ไม่ผูกกับ searchParams โดยตรง
  // เพราะเดี๋ยวจะถูกล้างทิ้งพร้อมกับ URL ด้านล่าง แล้วค่าจะหายไปก่อนโชว์
  const [justScored] = useState<number | null>(() => {
    const param = searchParams.get("justScored")
    const num = param !== null ? Number(param) : null
    return num !== null && !Number.isNaN(num) ? num : null
  })
  const hasJustScored = justScored !== null

  useEffect(() => {
    fetch("/api/leaderboard")
      .then((res) => res.json())
      .then((res) => setData(res.data))
      .catch((err) => console.error("Failed to fetch leaderboard:", err))

    fetch("/api/flags/reveal-vessel")
      .then((res) => res.json())
      .then((res) => setRevealVessel(res.data.enabled))
      .catch((err) => console.error("Failed to fetch reveal flag:", err))
  }, [])

  // ล้าง query param ออกจาก URL หลังอ่านค่าแล้ว กันโชว์ค้างตอน refresh/แชร์ลิงก์
  // ทำครั้งเดียวตอน mount เท่านั้น
  useEffect(() => {
    if (hasJustScored) {
      router.replace("/scan")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="mx-auto min-h-screen bg-brownie">
      <section className="w-full bg-[linear-gradient(180deg,#2D3542_0%,#934E43_100%)] text-black">
        <Header2 url="/game" title="เกมส์" />
        <div className="px-4 pb-8 flex w-full flex-col items-center justify-center gap-8 text-center">
          <h1 className="whitespace-nowrap text-[64px] font-sov-yeehor font-normal leading-12.5 letter-spacing-[1.92px] text-cream">
            {revealVessel ? "YAAN AQUARIUM" : "Club Game"}
          </h1>
          <p className="max-w-75 text-[20px] font-normal font-fc-quantum leading-none text-clay-light">
            {revealVessel ? (data?.vesselName?.th ?? "Yaan Not Found") : "???"}
          </p>
        </div>
        <div className="w-full relative h-3 [@media(min-width:480px)]:h-5">
          <img src="/explore/clay_curve.svg" alt="" className="w-full absolute z-20" />
          <img src="/explore/light_clay_curve.svg" alt="" className="w-full absolute z-30" />
        </div>
      </section>

      {/* Logo */}
      <div className="relative z-10 pb-15 bg-gradient-to-b from-brownie via-turqoise-light to-brownie pt-10">
        <Image src="/scan/slide-bg.png" alt="" fill className="pointer-events-none object-fill" />

        {revealVessel && data?.vesselName?.en ? (
          <div className="flex h-[230px] items-center justify-center">
            <div className="relative h-[210px] w-[210px]">
              <Image
                src={`/yaan_banner/${data?.vesselName?.en?.replaceAll(" ", "_")}.jpg`}
                alt={data?.vesselName?.th ?? "Vessel"}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        ) : (
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
        bg-clay-light
        p-20
        text-5xl
        font-bold
      "
            >
              ???
            </div>
          </div>
        )}

        <div className="px-4 pt-5">
          <div className="relative overflow-hidden rounded-2xl">
            <Image src="/scan/score-paper.png" alt="" fill className="object-fill" />

            <div className="relative z-10 flex items-center gap-4 px-10 py-5 text-brownie font-fc-quantum">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brownie">
                <Rocket size={34} strokeWidth={2.5} className="text-cream-tanned" />
              </div>
              <div className="flex-1">
                <p className="text-lg">{revealVessel ? "คะแนนรวมของยาน" : "คะแนนรวม"}</p>

                <h2 className="text-4xl font-bold ">{(data?.score ?? 0).toLocaleString()}</h2>

                <p className="text-sm">คะแนน</p>
              </div>

              {hasJustScored && (
                <div className="pt-5 px-10 text-lg text-brick-orange font-bold">
                  <p>+{justScored.toLocaleString()}</p>
                </div>
              )}
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
