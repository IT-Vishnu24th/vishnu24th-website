import { Header } from "@/components/Headers"
import NavigationFooter from "@/components/NavigationFooter"
import SponsorFooter from "@/components/SponsorFooter"
import { ExploreHeroSection } from "@/features/explore/components/ExploreHeroSection"
import { EventSection } from "@/features/explore/components/EventSection"

export default function ExplorePage() {
  return (
    <main className="flex min-h-svh min-w-svw justify-center bg-neutral-100">
      <div className="w-full max-w-98.25 bg-white pb-40 text-black">
        <Header />
        <ExploreHeroSection />
        <EventSection />
        <SponsorFooter />
        <NavigationFooter />
      </div>
    </main>
  )
}
