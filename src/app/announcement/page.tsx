import { AnnouncementSection } from "@/features/announcement/components/AnnouncementSection"
import { LineSection } from "@/features/announcement/components/LineSection"
import { Header } from "@/components/Headers"

const AnnouncementPage = () => {
  return (
    <main className="flex min-h-svh min-w-svw justify-center bg-neutral-100">
      <div className="flex min-h-svh w-full max-w-98.25 flex-col items-center overflow-hidden bg-white font-serif text-black">
        <div className="w-full px-4 pt-5 mb-10">
          <Header />
        </div>
        <AnnouncementSection />
        <LineSection />
      </div>
    </main>
  )
}

export default AnnouncementPage
