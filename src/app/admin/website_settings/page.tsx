import FooterNavigation from "@/components/NavigationFooter"
import { PhaseWebsiteSection } from "@/features/admin/websitePhase/components/PhaseWebsiteSection"
import { WebsitePhaseHeroSection } from "@/features/admin/websitePhase/components/WebsitePhaseHeroSection"

export default async function WebsiteSettingsPage() {
  return (
    <>
      <div className="w-full min-h-screen bg-cream">
        <WebsitePhaseHeroSection />
        <PhaseWebsiteSection />
      </div>
      <FooterNavigation />
    </>
  )
}
