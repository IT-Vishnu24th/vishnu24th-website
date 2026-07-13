import { PopkaewGame } from "@/features/game/popkaew/components/PopkaewGame"
import { getAuthUser } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function GamePage() {
  const user = await getAuthUser()

  if (!user) {
    redirect("/")
  }

  return <PopkaewGame />
}
