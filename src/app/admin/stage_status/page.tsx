import { Header } from "@/components/Headers"
import NavigationFooter from "@/components/NavigationFooter"
import { SaveButton } from "@/features/admin/stageStatus/components/SaveButton"
import { StageStatusContainer } from "@/features/admin/stageStatus/components/StageStatusContainer"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

export default function StageStatusPage() {
  return (
    <main className="flex min-h-screen h-full w-full justify-center bg-neutral-200">
      <div className="relative w-full h-full max-w-98.25 bg-[#f9f9f9] text-black">
        <Header />
        <div className="flex gap-4 relative">
          <Link
            href="/admin"
            aria-label="กลับหน้าแอดมิน"
            className="absolute top-3 left-5 flex cursor-pointer items-center justify-center rounded-full"
          >
            <ChevronLeft aria-hidden="true" className="size-6 text-black" strokeWidth={2.2} />
          </Link>
          <h1 className="h-11.75 w-full text-center text-4xl font-normal leading-[1.2] tracking-normal text-black">
            สถานะกิจกรรม
          </h1>
        </div>
        <StageStatusContainer />
        <SaveButton />
        <NavigationFooter />
      </div>
    </main>
  )
}
