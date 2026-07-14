import NavigationFooter from "@/components/NavigationFooter"
import { Header } from "@/components/Headers"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { PopkaewCharacter } from "@/features/game/popkaew/components/PopkaewCharacter"
import LeaderboardSection from "@/features/game/components/LeaderboardSection"

export default function GamePage() {
  return (
    <main className="min-h-screen bg-[#f9f9f9] text-black">
      <div className="mx-auto w-full max-w-98.25 bg-[#f9f9f9]">
        <Header />
        <div className="relative flex w-full flex-col items-center gap-6 py-6">
          <Link
            href="/game"
            aria-label="ย้อนกลับ"
            className="absolute left-4 top-7 flex size-10 items-center justify-center rounded-full text-black transition hover:bg-black/5"
          >
            <ArrowLeft size={18} strokeWidth={1.8} />
          </Link>

          <h1 className="w-full text-4xl leading-[1.08] tracking-[1.2px] sm:text-[72px] sm:leading-[1.2] sm:tracking-[1.44px]">
            เกมล่าสมบัติ
          </h1>
        </div>
        <PopkaewCharacter />
        <LeaderboardSection items={[]} />
      </div>
      <NavigationFooter />
    </main>
  )
}
