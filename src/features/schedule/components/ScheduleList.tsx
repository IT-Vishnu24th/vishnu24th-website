import { mockScheduleCards } from "../const/mock"
import { ScheduleCard } from "./ScheduleCard"
import { ScheduleTime } from "./ScheduleTime"

export const ScheduleList = () => {
  const schedule = mockScheduleCards
  return (
    <div className="min-h-svh w-full grow bg-[#d1d1d1] pt-8">
      <div className="mb-4 flex w-full items-center px-4">
        <div className="size-4 shrink-0 rounded-full bg-black"></div>
        <div className="ml-3 shrink-0 text-2xl leading-none">Today’s set</div>
        <div className="ml-5 h-0.5 grow bg-black"></div>
      </div>
      <div className="pt-4">
        {schedule.map((e, index) => (
          <div key={e.title} className="flex px-4">
            <ScheduleTime
              isFirst={index === 0}
              isLast={index === schedule.length - 1}
              status={e.status}
              time={e.time}
            />
            <div className="ml-6 min-w-0 flex-1 pb-5">
              <ScheduleCard
                title={e.title}
                desc={e.desc}
                duration={2}
                status={e.status}
                imgUrl={e.imgUrl}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
