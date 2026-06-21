import { cn } from "@/utils/cn"
import { scheduleStatusStyles, type ScheduleStatus } from "../const/schedule"

interface ScheduleTimeProps {
  isFirst?: boolean
  isLast?: boolean
  status: ScheduleStatus
  time: string
}

export const ScheduleTime = ({ isFirst, isLast, status, time }: ScheduleTimeProps) => {
  const statusStyle = scheduleStatusStyles[status]

  return (
    <div className="flex shrink-0 self-stretch">
      <div className={cn("mr-1 flex h-full w-10 items-center text-xs", statusStyle.time)}>
        {time}
      </div>
      <div className="flex h-full w-3 flex-col items-center py-2">
        <div className={cn("w-0.5 grow", statusStyle.timeline, isFirst && "invisible")}></div>
        <div className={cn("size-3 shrink-0 rounded-full", statusStyle.timeline)}></div>
        <div className={cn("w-0.5 grow", statusStyle.timeline, isLast && "invisible")}></div>
      </div>
    </div>
  )
}
