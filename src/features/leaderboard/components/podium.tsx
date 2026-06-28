import type { LeaderboardResponse } from "@/types/leaderboard"

type Props = {
  top3: LeaderboardResponse["top3"]
}

export default function Podium({ top3 }: Props) {
  return (
    <div className="flex items-end justify-center gap-3">
      {[1, 0, 2].map((index) => {
        const item = top3[index]

        if (!item) return null

        const isFirst = item.rank === 1

        return (
          <div key={item.rank} className="flex flex-col items-center">
            {/* Rank number - floats above the card */}
            <p className="mb-2 font-serif text-2xl font-bold">#{item.rank}</p>

            <div
              className={`
                flex flex-col items-center justify-between rounded-3xl bg-black px-4 py-5 text-center text-white
                ${isFirst ? "h-56 w-32" : "h-44 w-28"}
              `}
            >
              {/* WANTED badge */}
              <span className="rounded bg-white px-2 py-0.5 text-[10px] font-bold tracking-wide text-black">
                WANTED
              </span>

              {/* Vessel name */}
              <p className={`break-words font-serif font-bold ${isFirst ? "text-xl" : "text-lg"}`}>
                ยาน
                <br />
                {item.vesselName.th}
              </p>

              {/* Score */}
              <span className="text-xs text-gray-300">{item.score.toLocaleString()} คะแนน</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
