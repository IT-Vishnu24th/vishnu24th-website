import NavigationFooter from "@/components/NavigationFooter"
import SponsorFooter from "@/components/SponsorFooter"
import { MissionCardContainer } from "@/features/game/components/MissionCardContainer"
import MissionHeroSection from "@/features/game/components/MissionHeroSection"
import { YaanScoreSection } from "@/features/game/components/YaanScoreSection"

export default function GamePage() {
  return (
    <>
      <div className="w-full overflow-x-hidden">
        <MissionHeroSection />
        <div className="bg-[linear-gradient(0deg,#2D3542_5.3%,#F0865C_96.95%)] z-10 w-full pt-10">
          <YaanScoreSection />
          <MissionCardContainer />
        </div>
        <SponsorFooter />
      </div>
      <NavigationFooter />
    </>
  )
}
