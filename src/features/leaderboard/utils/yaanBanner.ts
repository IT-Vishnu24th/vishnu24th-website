import type { MultiLang } from "@/types/util"

export function getYaanBannerSrc(vesselName?: MultiLang) {
  const yaanName = vesselName?.en?.trim()

  if (!yaanName) return null

  return `/yaan_banner/${yaanName.replaceAll(" ", "_")}.jpg`
}
