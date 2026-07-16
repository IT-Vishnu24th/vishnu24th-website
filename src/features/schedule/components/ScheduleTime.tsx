import { cn } from "@/utils/cn"
import { scheduleStatusStyles } from "../const/schedule"
import { StagePerformanceStatus } from "@/types/stagePerformance"

interface ScheduleTimeProps {
  status: StagePerformanceStatus
  date: string
}

export const ScheduleTime = ({ status, date }: ScheduleTimeProps) => {
  const statusStyle = scheduleStatusStyles[status]
  const time = new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })

  return (
    <div className="flex shrink-0 self-stretch">
      <div className="flex relative h-full flex-col items-center px-8">
        <div
          className={cn(
            "absolute py-0.5 px-2.5 top-1/2 -translate-y-1/2 rounded-full pb-4 justify-center text-[32px] font-sov-yeehor tracking-[0.64px] leading-4",
            statusStyle.time,
            statusStyle.timeline
          )}
        >
          {time}
        </div>
        <div>
          <img
            src={`/explore/schedule/line_${status === "delayed" ? "upcoming" : status}.svg`}
            className="h-full object-cover"
            alt="line"
          />
        </div>
      </div>
    </div>
  )
}
