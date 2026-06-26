import type { MultiLang } from "@/types/util"

export interface FeatureFlag {
  id: string
  name: MultiLang
  enabled: boolean
}
