import NavigationFooter from "@/components/NavigationFooter"
import SponsorFooter from "@/components/SponsorFooter"
import { MissionCardContainer } from "@/features/game/components/MissionCardContainer"
import MissionHeroSection from "@/features/game/components/MissionHeroSection"

export default function GamePage() {
  return (
    <>
      <div className="w-full overflow-x-hidden">
        <MissionHeroSection />
        <MissionCardContainer />
        <SponsorFooter />
      </div>
      <NavigationFooter />
    </>
  )
}
