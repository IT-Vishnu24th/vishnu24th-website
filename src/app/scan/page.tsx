import { Suspense } from "react"
import ScorePageContent from "@/features/scan/components/ScorePageContent"

export default function ScorePage() {
  return (
    <Suspense fallback={null}>
      <ScorePageContent />
    </Suspense>
  )
}
