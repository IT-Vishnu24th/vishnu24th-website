import Image from "next/image"

type MissionStatus = "active" | "locked" | "completed"

interface MissionCardProps {
  title: string
  reward: string
  status: MissionStatus
}

const statusStyle: Record<MissionStatus, { label: string; className: string }> = {
  active: {
    label: "ทำภารกิจ",
    className: "bg-[#2c2c2c] text-[#f5f5f5]",
  },
  locked: {
    label: "ทำภารกิจ",
    className: "bg-[#d9d9d9] text-[#b3b3b3]",
  },
  completed: {
    label: "ภารกิจสำเร็จ",
    className: "bg-transparent text-[#303030]",
  },
}

export default function MissionCard({ title, reward, status }: MissionCardProps) {
  const currentStatus = statusStyle[status]

  return (
    <article className="flex w-full flex-col items-center gap-4 overflow-hidden bg-[#d7d7d7] px-4 pb-6 pt-4 text-center text-black">
      <p className="w-full text-[64px] uppercase leading-[1.2] tracking-[-5.12px]">Wanted</p>

      <div className="flex w-full flex-col items-center">
        <div className="relative h-60 w-70 overflow-hidden">
          <Image
            src="/game/character-bg.png"
            alt=""
            fill
            sizes="280px"
            className="object-cover"
            priority
          />
          <Image
            src="/game/parrot.png"
            alt=""
            width={243}
            height={228}
            sizes="243px"
            className="absolute left-4.5 top-1.5 h-57 w-60.75 object-cover object-[50%_22%]"
            priority
          />
        </div>

        <h2 className="w-full text-[42px] leading-none tracking-[-0.84px] min-[390px]:text-[48px]">
          {title}
        </h2>
      </div>

      <p className="w-full text-[20px] leading-[1.2] tracking-[0.4px]">
        รางวัล: {reward} เหรียญอวกาศ
      </p>

      <button
        type="button"
        disabled={status !== "active"}
        className={`flex w-70 items-center justify-center rounded-full px-3 py-3 text-[16px] leading-[1.4] transition ${currentStatus.className} ${
          status === "active" ? "hover:bg-[#1f1f1f]" : "cursor-default"
        }`}
      >
        {currentStatus.label}
      </button>
    </article>
  )
}
