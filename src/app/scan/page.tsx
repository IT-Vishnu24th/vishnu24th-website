"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/Headers"
import { QrCode } from "lucide-react"
import { useRouter } from "next/navigation"

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
    <div className="mx-auto min-h-screen ">
      <Header />

      {/* Top */}
      <div className="relative px-4 pt-4">
        <button onClick={() => router.push("/")} className="absolute left-4 text-xl">
          ←
        </button>

        <div className="text-center">
          <h1 className="text-3xl font-serif">YAAN AQUARIUM</h1>

          <p className="mt-1 text-xl">ยาน{data?.vesselName?.th ?? "-"}</p>
        </div>
      </div>

      {/* Logo */}
      <div
        className="
          flex
          h-[260px]
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

      {/* Score */}
      <div className="px-4">
        <div
          className="
            flex
            items-center
            gap-4
            rounded-2xl
            bg-[#D1D1D1]
            px-5
            py-5
          "
        >
          <div
            className="
              h-16
              w-16
              rounded-full
              bg-[#a9a9a9]
            "
          />

          <div className="flex-1">
            <p className="text-lg">คะแนนรวมของยาน</p>

            <h2 className="text-5xl font-bold">{(data?.score ?? 0).toLocaleString()}</h2>

            <p>คะแนน</p>
          </div>
        </div>
      </div>

      {/* Scan Button */}
      <div className="px-4 pt-6">
        <button
          onClick={() => router.push("/scan/qr")}
          className="
            flex
            w-full
            items-center
            gap-4
            rounded-2xl
             bg-gray-400
            px-6
            py-6
          "
        >
          <QrCode size={40} />

          <div className="text-left">
            <p className="text-xl">สแกน QR Code</p>

            <p>เช็คอินชมรม</p>
          </div>
        </button>
      </div>
    </div>
  )
}
