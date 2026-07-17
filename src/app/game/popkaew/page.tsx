import { PopkaewGame } from "@/features/game/popkaew/components/PopkaewGame"
import { getAuthUser } from "@/lib/auth"
import featureFlagsService from "@/services/featureFlagService"
import { redirect } from "next/navigation"

export default async function GamePage() {
  const user = await getAuthUser()
  const isPopkaewEnabled = (await featureFlagsService.getFlag("game-popkaew"))?.enabled
  if (!user || !isPopkaewEnabled) {
    redirect("/")
  }

  return <PopkaewGame />
}
