import { ArrowRight } from "lucide-react"
import { cn } from "@/utils/cn"
import { scheduleStatusStyles } from "../const/schedule"
import { StagePerformance } from "@/types/stagePerformance"

interface ScheduleCardProps {
  stage: StagePerformance
}

export const ScheduleCard = ({ stage }: ScheduleCardProps) => {
  const statusStyle = scheduleStatusStyles[stage.status]

  return (
    <div className={cn("w-full rounded-xl border-3 px-5 py-3", statusStyle.card)}>
      <div className="mb-3 flex items-center justify-between">
        <img
          className={cn("size-11 rounded-full object-cover border-2", statusStyle.img)}
          src={stage.name.en}
          alt={`${stage.name} img`}
        />
        <div
          className={cn(
            "h-fit rounded-[20px] border-2 px-2.5 py-1 text-[14px] leading-[19.6px] items-center font-fc-quantum pb-1.5 flex gap-2",
            statusStyle.badge
          )}
        >
          {stage.status === "live" && (
            <div className="w-1.5 h-1.5 bg-status-yellow-dark rounded-full"></div>
          )}
          {statusStyle.status}
        </div>
      </div>
      <div className="mb-3 text-sm leading-5">
        <div
          className={cn(
            "text-[32px] tracking-[0.64px] font-sov-yeehor leading-6",
            statusStyle.title
          )}
        >
          {stage.name.th}
        </div>
        <div className="text-[14px] mt-3 font-fc-quantum line-clamp-2 leading-[19.6px]">
          {stage.description.th}
        </div>
      </div>
      <div
        className={cn(
          "flex items-center justify-between text-sm font-fc-quantum",
          statusStyle.footer
        )}
      >
        <div>{stage.duration} นาที</div>
        <ArrowRight aria-hidden="true" className="h-6" strokeWidth={1.5} />
      </div>
    </div>
  )
}
