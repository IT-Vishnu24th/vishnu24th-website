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
        <div className="relative  bg-gradient-to-b from-midnight to-midnight-light ">
          <Header />

          <motion.h1
            className="mb-4 text-center font-sov-yeehor text-8xl text-turqoise"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            อันดับยาน
          </motion.h1>
          <motion.div
            className="relative w-full h-10 overflow-hidden"
            initial={{ opacity: 0, y: 18, scaleX: 0.92 }}
            animate={{ opacity: 1, y: 0, scaleX: 1 }}
            transition={{ duration: 0.45, delay: 0.15, ease: "easeOut" }}
          >
            <Image
              src="/landingpage/blue-line.svg"
              alt=""
              fill
              sizes="100vw"
              className="object-fill scale-102 z-20"
            />
          </motion.div>
        </div>

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
