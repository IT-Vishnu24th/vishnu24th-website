"use client"

import { Header } from "@/components/Headers"

import Podium from "@/features/leaderboard/components/podium"
import MyRank from "@/features/leaderboard/components/myrank"
import Image from "next/image"
import SponsorFooter from "@/components/SponsorFooter"
import NavigationFooter from "@/components/NavigationFooter"

import { MOCK_LEADERBOARD } from "@/features/leaderboard/const/mock"
import { MOCK_MY_VESSEL } from "@/features/leaderboard/const/mock"

export default function Page() {
  const data = MOCK_LEADERBOARD
  const vesseldata = MOCK_MY_VESSEL
  return (
    <>
      <div
        className="
          min-h-screen
          bg-[#f5f5f5]
          pb-20
        "
      >
        <Header />

        <h1
          className="
            pt-3
            mb-3
            text-center
            font-serif
            text-4xl
            font-bold
          "
        >
          อันดับยาน
        </h1>

        <div className="mt-8">
          <Podium top3={data.top3} />
        </div>

        <div className="mt-8">
          <MyRank rank={data.rank} vesselName={vesseldata.vesselName} score={vesseldata.score} />
        </div>
      </div>
      <SponsorFooter />
      <NavigationFooter />
    </>
  )
}
