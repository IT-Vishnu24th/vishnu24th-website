import NavigationFooter from "@/components/NavigationFooter"
import LeaderboardSection from "@/features/game/components/LeaderboardSection"
import MissionCard from "@/features/game/components/MissionCard"
import MissionHeroSection from "@/features/game/components/MissionHeroSection"
import { Header } from "@/components/Headers"

const missions = [
  { title: "Daily Bounty", reward: "50,000", status: "active" as const },
  { title: "Pop Kaew", reward: "50,000", status: "locked" as const },
  { title: "Space Cleanup", reward: "50,000", status: "completed" as const },
]

const leaderboard = [
  { rank: 1, name: "ยานอานาคอนดี้", score: "676,767,676" },
  { rank: 2, name: "ยานอาริอานา", score: "76,767,676" },
  { rank: 3, name: "ยานอาตี๋มานี่มา", score: "6,767,676" },
]

export default function GamePage() {
  return (
    <main className="min-h-screen bg-[#f9f9f9] text-black">
      <div className="mx-auto flex w-full max-w-98.25 flex-col items-center overflow-hidden bg-[#f9f9f9]">
        <Header />
        <MissionHeroSection />

        <section className="flex w-full max-w-87.5 flex-col gap-6 pb-6 pt-6">
          {missions.map((mission) => (
            <MissionCard key={mission.title} {...mission} />
          ))}
        </section>

        <LeaderboardSection items={leaderboard} />
      </div>

      <NavigationFooter />
    </main>
  )
}
