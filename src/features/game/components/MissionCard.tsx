import { cn } from "@/utils/cn"
import { Calendar, Check, Clock, Lock } from "lucide-react"
import Link from "next/link"
import { ReactNode } from "react"

export type MissionStatus = "active" | "locked" | "completed" | "upcoming"

export interface MissionCardProps {
  title: string
  reward: number | string
  status: MissionStatus
  deadline: string
  banner?: ReactNode
  img?: string
  href: string
}

const formatRemainingTimeTH = (deadline: string | Date) => {
  const diff = new Date(deadline).getTime() - Date.now()

  if (diff <= 0) return "หมดเวลา"

  const totalMinutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  return `${hours.toLocaleString("th-TH")} ชั่วโมง ${minutes.toLocaleString("th-TH")} นาที`
}

const statusConfig = {
  active: {
    Icon: Clock,
    text: (deadline: string) => formatRemainingTimeTH(deadline),
    className: "bg-brownie-light",
  },
  locked: {
    Icon: Lock,
    text: () => "เล่นไม่ได้ในช่วงนี้",
    className: "bg-brownie",
  },
  completed: {
    Icon: Check,
    text: () => "ทำภารกิจสำเร็จ",
    className: "bg-brownie-light",
  },
  upcoming: {
    Icon: Calendar,
    text: () => "เร็วๆนี้",
    className: "bg-brownie",
  },
} satisfies Record<
  MissionStatus,
  {
    Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>
    text: (deadline: string) => string
    className: string
  }
>

const StatusPill = ({ status, deadline }: { status: MissionStatus; deadline: string }) => {
  const { Icon, text, className } = statusConfig[status]

  return (
    <div
      className={`${className} w-fit items-center border-brownie border-3 rounded-full px-1.5 text-[14px] text-cream font-fc-quantum flex gap-2`}
    >
      <Icon className="size-4" strokeWidth={3} />
      <div className="mb-0.75">{text(deadline)}</div>
    </div>
  )
}
export default function MissionCard({
  title,
  reward,
  status,
  deadline,
  banner,
  img,
  href,
}: MissionCardProps) {
  const hasFormulaReward = typeof reward === "string"
  const rewardValue = typeof reward === "number" ? reward.toLocaleString() : reward

  return (
    <Link
      className={cn(
        "relative w-93.5 h-125 cursor-pointer",
        status !== "active" && "cursor-not-allowed"
      )}
      href={href}
      onClick={(e) => {
        if (status !== "active") e.preventDefault()
      }}
    >
      <img
        src={
          status === "locked"
            ? "/game/locked_sheet.png"
            : status === "upcoming"
              ? "/game/upcoming_sheet.png"
              : "/game/normal_sheet.png"
        }
        className="w-93.5 absolute"
      />
      <div className="absolute top-7 flex w-full max-w-120 flex-col items-center overflow-hidden bg-none px-4 pt-5 pb-6 text-center text-brownie">
        <div className="font-arthemis text-[48px] mb-2 h-10">
          {status === "upcoming" ? "?????????" : "WANTED"}
        </div>

        <div className="relative w-68.75 aspect-square">
          {banner !== undefined && status !== "upcoming" ? (
            banner
          ) : (
            <img
              src={status === "upcoming" ? "/game/question_banner.png" : img}
              className="absolute inset-0 h-full w-full object-cover"
              alt=""
            />
          )}
          <div className="bottom-2 left-1/2 -translate-x-1/2 absolute w-full flex justify-center">
            <StatusPill status={status} deadline={deadline} />
          </div>
        </div>

        <div className="font-sov-yeehor text-[48px] mb-1.5 leading-8.5 whitespace-pre">
          {status === "upcoming" ? "???????" : title}
        </div>

        <div className="font-fc-quantum text-[20px]">
          {status === "upcoming" ? (
            "????????????????????"
          ) : (
            <>
              รางวัล:{" "}
              <span className={hasFormulaReward ? "text-[16px]" : undefined}>{rewardValue}</span>{" "}
              เหรียญทอง
            </>
          )}
        </div>
      </div>
    </Link>
  )
}
