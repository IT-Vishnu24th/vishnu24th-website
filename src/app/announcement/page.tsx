import { AnnouncementSection } from "@/features/announcement/components/AnnouncementSection"
import { LineSection } from "@/features/announcement/components/LineSection"

const AnnouncementPage = () => {
  return (
    <main className="flex min-h-svh justify-center bg-neutral-100">
      <div className="flex min-h-svh w-full max-w-[524px] flex-col items-center overflow-hidden bg-white text-black">
        <AnnouncementSection />
        <LineSection />
      </div>
    </main>
  )
}

export default AnnouncementPage
