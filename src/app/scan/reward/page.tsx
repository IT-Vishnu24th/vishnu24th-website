import { Suspense } from "react"
import RewardPageContent from "@/features/scan/components/RewardPageContent"

export default function RewardPage() {
  return (
    <Suspense fallback={null}>
      <RewardPageContent />
    </Suspense>
  )
}
