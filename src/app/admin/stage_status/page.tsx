import NavigationFooter from "@/components/NavigationFooter"
import { StageStatusContainer } from "@/features/admin/stageStatus/components/StageStatusContainer"
import { StageStatusHeroSection } from "@/features/admin/stageStatus/components/StageStatusHeroSection"

export default function StageStatusPage() {
  return (
    <div className="w-full min-h-screen bg-cream">
      <StageStatusHeroSection />
      <StageStatusContainer />
      <NavigationFooter />
    </div>
  )
}
