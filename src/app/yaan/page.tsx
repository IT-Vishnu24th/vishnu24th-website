import { AnnouncementSection } from "@/features/announcement/components/AnnouncementSection"
import { getAuthUser } from "@/lib/auth"
import featureFlagsService from "@/services/featureFlagService"
import { redirect } from "next/navigation"

const YaanPage = async () => {
  const user = await getAuthUser()
  const isYaanEnabled = (await featureFlagsService.getFlag("reveal-vessel"))?.enabled
  if (!user || !isYaanEnabled) {
    redirect("/")
  }
  return <AnnouncementSection />
}

export default YaanPage
