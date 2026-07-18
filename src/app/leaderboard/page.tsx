"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/Headers"

import Podium from "@/features/leaderboard/components/podium"
import MyRank from "@/features/leaderboard/components/myrank"
import UnrevealedLeaderboard from "@/features/leaderboard/components/unrevealedLeaderboard"
import SponsorFooter from "@/components/SponsorFooter"
import NavigationFooter from "@/components/NavigationFooter"
import Image from "next/image"
import { motion } from "motion/react"

import type { LeaderboardResponse } from "@/types/leaderboard"
import type { FeatureFlag } from "@/types/featureFlag"
import type { User } from "@/types/user"

export default function Page() {
  const [data, setData] = useState<LeaderboardResponse | null>(null)
  const [showRealLeaderboard, setShowRealLeaderboard] = useState<boolean | null>(null)

  useEffect(() => {
    let ignore = false

    async function fetchLeaderboardIfRevealed() {
      try {
        const [flagRes, userRes] = await Promise.all([
          fetch("/api/flags/reveal-vessel"),
          fetch("/api/users/me"),
        ])

        const flagData = flagRes.ok
          ? ((await flagRes.json()) as { data?: FeatureFlag })
          : { data: undefined }
        const userData = userRes.ok
          ? ((await userRes.json()) as { data?: User })
          : { data: undefined }
        const canShowRealLeaderboard =
          (flagData.data?.enabled ?? false) && (userData.data?.yarnAccepted ?? false)

        if (ignore) return

        setShowRealLeaderboard(canShowRealLeaderboard)

        if (!canShowRealLeaderboard) return

        const leaderboardRes = await fetch("/api/leaderboard")
        const leaderboardData = (await leaderboardRes.json()) as { data: LeaderboardResponse }

        if (!ignore) setData(leaderboardData.data)
      } catch (err) {
        console.error("Failed to fetch leaderboard reveal gate:", err)
        if (!ignore) setShowRealLeaderboard(false)
      }
    }

    fetchLeaderboardIfRevealed()

    return () => {
      ignore = true
    }
  }, [])

  if (showRealLeaderboard === null) return null // TODO: ใส่ loading skeleton ทีหลัง

  if (!showRealLeaderboard) {
    return (
      <>
        <UnrevealedLeaderboard />
        <SponsorFooter />
        <NavigationFooter />
      </>
    )
  }

  if (!data) return null // TODO: ใส่ loading skeleton ทีหลัง

  return (
    <>
      <div className="">
        <section className="w-full bg-[linear-gradient(180deg,#2D3542_38.94%,#2D4B5F_100%)] text-black">
          <Header />
          <div className="px-4 pb-8 flex w-full flex-col items-center justify-center gap-5 text-center">
            <h1 className="whitespace-nowrap text-[96px] font-sov-yeehor font-normal leading-none letter-spacing-[1.92px] text-turqoise-cream">
              สำรวจ
            </h1>
            <p className="max-w-75 text-[20px] font-normal font-fc-quantum leading-none text-turqoise">
              ค้นพบชมรม กิจกรรม <br />
              และข้อมูลต่างๆอีกมากมาย
            </p>
          </div>
          <div className="w-full relative h-3 [@media(min-width:480px)]:h-5">
            <img src="/explore/dark_blue_curve.svg" alt="" className="w-full absolute z-10" />
            <img src="/explore/blue_curve.svg" alt="" className="w-full absolute z-20" />
          </div>
        </section>

        <div className="relative bg-gradient-to-b from-cream-tanned to-clay-light -mt-5 overflow-hidden">
          <div className="relative">
            <Image
              src="/leaderboard/leaderboard-bg.png"
              alt=""
              fill
              sizes="100vw"
              className="pointer-events-none z-0 object-contain mt-28 scale-150 "
            />
            <div className="relative z-10">
              <Podium top3={data.top3} />
            </div>
          </div>

          {data.rank !== null && (
            <motion.div
              className="relative z-20 mt-8"
              initial={{ opacity: 0, y: 96, scale: 0.96, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.6, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <MyRank rank={data.rank} vesselName={data.vesselName} score={data.score ?? 0} />
            </motion.div>
          )}
        </div>
      </div>
      <SponsorFooter />
      <NavigationFooter />
    </>
  )
}
