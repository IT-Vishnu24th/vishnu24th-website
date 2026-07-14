import { StageStatusCard } from "./StageStatusCard"

export const StageStatusContainer = () => {
  return (
    <section className="h-full flex flex-col items-start gap-4 py-6">
      <div className="mb-4 flex w-full items-center px-4">
        <div className="size-4 shrink-0 rounded-full bg-black"></div>
        <div className="ml-3 shrink-0 text-2xl leading-none">Today’s set</div>
        <div className="ml-5 h-0.5 grow bg-black"></div>
      </div>

      <div className="flex w-full flex-col items-center gap-6 px-2">
        <StageStatusCard
          title="กิจกรรมทุงทุงซาฮอร์"
          startTime="11:00"
          endTime="11:45"
          initialStatus="Completed"
        />
        <StageStatusCard
          title="กิจกรรมทุงทุงซาฮอร์"
          startTime="11:00"
          endTime="11:45"
          initialStatus="Upcoming"
        />
        <StageStatusCard
          title="กิจกรรมทุงทุงซาฮอร์"
          startTime="11:00"
          endTime="11:45"
          initialStatus="Live"
        />
        <StageStatusCard
          title="กิจกรรมทุงทุงซาฮอร์"
          startTime="11:00"
          endTime="11:45"
          initialStatus="None"
        />
      </div>
    </section>
  )
}
