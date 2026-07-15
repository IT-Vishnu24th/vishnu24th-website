import Image from "next/image"
import type { LeaderboardResponse } from "@/types/leaderboard"

type Props = Pick<LeaderboardResponse, "rank" | "vesselName" | "score">

export default function MyRank({ rank, vesselName, score }: Props) {
  return (
    <div className="relative mx-4 overflow-hidden rounded-md py-10">
      <Image src="/leaderboard/wanted-own.png" alt="" fill className="z-10 object-cover" />

      <h2 className="relative z-10 text-center font-sov-yeehor text-5xl text-[#3a2a1a]">
        อันดับของคุณ
      </h2>

      <div className="relative z-10 mx-auto mt-4 flex w-fit items-center justify-center rounded-full bg-[#f8ead9] px-6 py-2">
        <span className="font-sov-yeehor text-6xl font-black leading-none -translate-y-4">
          <span className="text-[#a8382a]">#{rank ?? "-"}</span>{" "}
          <span className="text-[#3a2a1a]">WANTED</span>
        </span>
      </div>

      {vesselName && (
        <p className="relative z-10 mt-4 break-words text-center font-sov-yeehor text-5xl text-[#3a2a1a]">
          {vesselName.th ?? "Name"}
        </p>
      )}

      {score !== null && score !== undefined && (
        <p className="relative z-10 mb-10 text-center font-sov-yeehor text-5xl text-[#c46a2e]">
          {score.toLocaleString()} คะแนน
        </p>
      )}
    </div>
  )
}
