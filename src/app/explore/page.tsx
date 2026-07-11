import NavigationFooter from "@/components/NavigationFooter"
import SponsorFooter from "@/components/SponsorFooter"
import { ExploreHeroSection } from "@/features/explore/components/ExploreHeroSection"
import { EventSection } from "@/features/explore/components/EventSection"

export default function ExplorePage() {
  return (
    <div className="w-full overflow-x-hidden text-black">
      <ExploreHeroSection />
      <EventSection />
      <SponsorFooter />
      <NavigationFooter />
    </div>
  )
}
