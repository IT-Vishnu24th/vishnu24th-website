import FooterNavigation from "@/components/NavigationFooter"
import SponsorFooter from "@/components/SponsorFooter"
import { ScheduleHeroSection } from "@/features/schedule/components/ScheduleHeroSection"
import { ScheduleList } from "@/features/schedule/components/ScheduleList"

const SchedulePage = () => {
  return (
    <div className="w-full overflow-x-hidden">
      <ScheduleHeroSection />
      <ScheduleList />
      <SponsorFooter />
      <FooterNavigation />
    </div>
  )
}

export default SchedulePage
