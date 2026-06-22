import { ScheduleHeroSection } from "@/features/schedule/components/ScheduleHeroSection"
import { ScheduleList } from "@/features/schedule/components/ScheduleList"

const SchedulePage = () => {
  return (
    <main className="flex min-h-svh min-w-svw justify-center bg-neutral-100">
      <div className="w-full max-w-98.25 bg-white text-black font-serif">
        <ScheduleHeroSection />
        <ScheduleList />
      </div>
    </main>
  )
}

export default SchedulePage
