import { ArrowRight } from "lucide-react"
import { cn } from "@/utils/cn"
import { scheduleStatusStyles, type ScheduleStatus } from "../const/schedule"

interface ScheduleCardProps {
  title: string
  desc: string
  duration: number
  status: ScheduleStatus
  imgUrl: string
}

export const ScheduleCard = ({ title, desc, duration, status, imgUrl }: ScheduleCardProps) => {
  const statusStyle = scheduleStatusStyles[status]

  return (
    <div className={cn("w-full rounded-xl px-5 py-3", statusStyle.card)}>
      <div className="mb-3 flex items-center justify-between">
        <img className="size-11 rounded-full object-cover" src={imgUrl} alt={`${title} img`} />
        <div
          className={cn(
            "h-fit rounded-full border px-2.5 py-0.5 text-[10px] capitalize leading-4",
            statusStyle.badge
          )}
        >
          {status}
        </div>
      </div>
      <div className="mb-4 text-sm leading-5">
        <div className="text-xl leading-6">{title}</div>
        <div className="opacity-80">รายละเอียดของกิจกรรม</div>
        <div className="opacity-80">{desc}</div>
      </div>
      <div className="flex items-center justify-between text-sm">
        <div>{duration} นาที</div>
        <ArrowRight aria-hidden="true" className="size-6" strokeWidth={1.5} />
      </div>
    </div>
  )
}
