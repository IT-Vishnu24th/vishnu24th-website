"use client"

import { useFeatureFlags, useLeaderboard, useMe } from "@/hooks/useApi"
import useAuth from "@/hooks/useAuth"
import { useMemo } from "react"

export const YaanScoreSection = () => {
  const { data: leaderboardData } = useLeaderboard()
  const { data: userData } = useMe()
  const { user } = useAuth()
  const { data: featureFlagsData } = useFeatureFlags()

  const showYarn = useMemo(() => {
    const showVessel = featureFlagsData?.data.filter((e) => e.id === "reveal-vessel")
    if (!showVessel || showVessel?.length === 0) return false
    return showVessel[0].enabled ?? false
  }, [featureFlagsData?.data])

  const yarnName = userData?.data.group.vesselName?.th ?? "-"
  const score = leaderboardData?.data.score ?? "-"

  if (user === null) return null
  return (
    <div className="relative min-h-30 min-w-80 -top-8 [@media(min-width:350px)]:-top-7 [@media(min-width:425px)]:-top-6 [@media(min-width:496px)]:-top-5 [@media(min-width:566px)]:-top-4 [@media(min-width:636px)]:-top-3">
      <img
        src="/game/score_paper.png"
        className="absolute left-1/2 -translate-x-1/2 -top-5 shrink-0 inset-0"
      />
      <div className="absolute left-1/2 z-10 -translate-x-1/2 w-full flex justify-center">
        <div className="flex w-full justify-center items-center gap-7 pt-3">
          <div className="font-sov-yeehor text-brownie-light text-[64px] w-fit rounded-[10px] tracking-[0.20px] leading-10 px-3.5 pb-5 bg-cream-tanned">
            <p className="mb-2">#{leaderboardData?.data.rank ?? "-"}</p>
          </div>
          <div className="pb-5 max-w-70">
            <div className="text-black font-sov-yeehor w-full text-[48px] leading-10">
              {showYarn ? yarnName : "กลุ่มที่..."}
            </div>
            <div className="text-brick-orange font-sov-yeehor text-[48px] w-full leading-10">
              {showYarn ? `${leaderboardData?.data.score ?? "-"} คะแนน` : "XXXX"}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
