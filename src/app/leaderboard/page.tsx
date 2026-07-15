"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/Headers"

import Podium from "@/features/leaderboard/components/podium"
import MyRank from "@/features/leaderboard/components/myrank"
import SponsorFooter from "@/components/SponsorFooter"
import NavigationFooter from "@/components/NavigationFooter"
import Image from "next/image"

import type { LeaderboardResponse } from "@/types/leaderboard"

export default function Page() {
  const [data, setData] = useState<LeaderboardResponse | null>(null)

  useEffect(() => {
    fetch("/api/leaderboard")
      .then((res) => res.json())
      .then((res) => setData(res.data))
      .catch((err) => console.error("Failed to fetch leaderboard:", err))
  }, [])

  if (!data) return null // TODO: ใส่ loading skeleton ทีหลัง

  return (
    <>
      <div className="">
        <div className="relative  bg-gradient-to-b from-midnight to-midnight-light ">
          <Header />

          <h1 className="mb-4 text-center font-sov-yeehor text-8xl text-turqoise  ">อันดับยาน</h1>
          <div className="relative w-full h-10 overflow-hidden">
            <Image
              src="/landingpage/blue-line.png"
              alt=""
              fill
              className="object-fill scale-102 z-20"
            />
          </div>
        </div>

        <div className="relative bg-gradient-to-b from-cream-tanned to-clay-light -mt-5 overflow-hidden">
          <div className="">
            <Image
              src="/leaderboard/leaderboard-bg.png"
              alt=""
              fill
              className="z-10 object-contain -mt-10 "
            />
            <Podium top3={data.top3} />
          </div>

          {data.rank !== null && (
            <div className="mt-8">
              <MyRank rank={data.rank} vesselName={data.vesselName} score={data.score ?? 0} />
            </div>
          )}
        </div>
      </div>
      <SponsorFooter />
      <NavigationFooter />
    </>
  )
}
