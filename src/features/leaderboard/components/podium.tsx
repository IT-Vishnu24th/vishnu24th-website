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
        const isSecond = item.rank === 2

        // ยกฐานของแต่ละการ์ดให้สูงต่ำต่างกัน (podium effect)
        const liftClass = isFirst ? "mb-10" : isSecond ? "mb-4" : "mb-0"

        return (
          <div key={item.rank} className={`flex flex-col items-center ${liftClass}`}>
            {/* Rank number - floats above the card */}
            <p className="mb-2 font-serif text-3xl font-bold">#{item.rank}</p>

            <div
              className={
                isFirst
                  ? "flex h-56 w-32 flex-col rounded-2xl items-center justify-between gap-6 rounded-3xl bg-black px-4 py-5 text-center text-white"
                  : "flex h-44 w-28 flex-col rounded-2xl items-center justify-between gap-6 rounded-3xl bg-black px-4 py-5 text-center text-white"
              }
            >
              {/* WANTED badge */}
              <span className="mt-3 px-2 py-0.5 text-[10px] font-bold tracking-wide text-white">
                WANTED
              </span>

              {/* Vessel name */}
              <p
                className={
                  isFirst
                    ? "break-words font-serif text-xl font-bold"
                    : "break-words font-serif text-lg font-bold"
                }
              >
                ยาน
                <br />
                {item.vesselName?.th}
              </p>

              {/* Score */}
              <span className="mb-4 text-xs text-gray-300">
                {item.score.toLocaleString()} คะแนน
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
