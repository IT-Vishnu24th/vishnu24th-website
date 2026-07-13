import { Calendar, Check, Clock, Lock } from "lucide-react"
import { ReactNode } from "react"

export type MissionStatus = "active" | "locked" | "completed" | "upcoming"

interface MissionCardProps {
  title: string
  reward: number
  status: MissionStatus
  deadline: string
  openTime?: string
  banner?: ReactNode
  img?: string
}

const formatRemainingTimeTH = (deadline: string | Date) => {
  const diff = new Date(deadline).getTime() - Date.now()

  if (diff <= 0) return "หมดเวลา"

  const totalMinutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  return `${hours.toLocaleString("th-TH")} ชั่วโมง ${minutes.toLocaleString("th-TH")} นาที`
}

const StatusPill = ({ status, deadline }: { status: string; deadline: string }) => {
  if (status === "active")
    return (
      <div className="bg-brownie-light w-fit items-center border-brownie border-3 rounded-full px-1.5 text-[14px] text-cream font-fc-quantum flex gap-2">
        <Clock className="size-4" strokeWidth={3} />
        <div className="mb-0.5">{formatRemainingTimeTH(deadline)}</div>
      </div>
    )
  if (status === "locked")
    return (
      <div className="bg-brownie w-fit items-center border-brownie border-3 rounded-full px-1.5 text-[14px] text-cream font-fc-quantum flex gap-2">
        <Lock className="size-4" strokeWidth={3} />
        <div className="mb-0.5">เล่นไม่ได้ในช่วงนี้</div>
      </div>
    )
  if (status === "completed")
    return (
      <div className="bg-brownie-light w-fit items-center border-brownie border-3 rounded-full px-1.5 text-[14px] text-cream font-fc-quantum flex gap-2">
        <Check className="size-4" strokeWidth={3} />
        <div className="mb-0.5">ทำภารกิจสำเร็จ</div>
      </div>
    )
  return (
    <div className="bg-brownie w-fit items-center border-brownie border-3 rounded-full px-1.5 text-[14px] text-cream font-fc-quantum flex gap-2">
      <Calendar className="size-4" strokeWidth={3} />
      <div className="mb-0.5">เร็วๆนี้</div>
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
}: MissionCardProps) {
  return (
    <div className="relative w-93.5 h-125 cursor-pointer">
      <img
        src={status === "locked" ? "/game/locked_sheet.png" : "/game/normal_sheet.png"}
        className="w-93.5 absolute"
      />
      <div className="absolute top-6 flex w-full max-w-120 flex-col items-center overflow-hidden bg-none px-4 pt-4 pb-6 text-center text-brownie">
        <div className="font-arthemis text-[48px]">
          {status === "upcoming" ? "?????????" : "WANTED"}
        </div>

        <div className="relative w-68.75 aspect-square">
          {banner ? (
            banner
          ) : (
            <img
              src={status === "upcoming" ? "/game/question_banner.png" : img}
              className="absolute inset-0 h-full w-full object-cover"
              alt=""
            />
          )}
          <div className="bottom-2 left-1/2 -translate-x-1/2 absolute">
            <StatusPill status={status} deadline={deadline} />
          </div>
        </div>

        <div className="mb-2 font-sov-yeehor text-[48px] leading-7.5">
          {status === "upcoming" ? "???????" : title}
        </div>

        <div className="font-fc-quantum text-[20px]">
          {status === "upcoming"
            ? "????????????????????"
            : `รางวัล: ${reward.toLocaleString()} เหรียญอวกาศ`}
        </div>
      </div>
    </div>
  )
}
