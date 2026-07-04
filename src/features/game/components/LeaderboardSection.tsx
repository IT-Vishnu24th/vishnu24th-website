import Image from "next/image"

type LeaderboardItem = {
  rank: number
  name: string
  score: string
}

interface LeaderboardSectionProps {
  items: LeaderboardItem[]
}

const rowBackgrounds = ["bg-[#424242]", "bg-[#636363]", "bg-[#868686]"]

export default function LeaderboardSection({ items }: LeaderboardSectionProps) {
  return (
    <section
      className="relative mx-auto mt-2 h-57.5 w-full max-w-98.25 overflow-hidden text-white"
      aria-label="อันดับคะแนนเกม"
    >
      <Image
        src="/game/leaderboard-container.svg"
        alt=""
        width={661}
        height={383}
        className="absolute left-1/2 top-0 h-57 w-165.25 max-w-none -translate-x-1/2"
      />
      <div className="absolute inset-x-0 bottom-0 h-15.25 bg-[#282828]" />

      <div className="absolute left-1/2 top-13.25 z-10 flex w-98.25 -translate-x-1/2 flex-col gap-1.25 overflow-hidden p-2.5">
        {items.map((item, index) => (
          <div
            key={item.rank}
            className={`flex h-8 items-center justify-between overflow-hidden rounded-[10px] px-5 text-center text-[14px] leading-[1.2] min-[390px]:text-[16px] ${
              rowBackgrounds[index] ?? "bg-[#868686]"
            }`}
          >
            <span className="min-w-0 truncate">{`#${item.rank}   ${item.name}`}</span>
            <span className="shrink-0 pl-3 tabular-nums">{item.score}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
