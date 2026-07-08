import { StagePerformance } from "@/types/stagePerformance"
import { api } from "./api-client"

// Stage API
export const stageApi = {
  getStages: async () => {
    return api.get<{ data: StagePerformance[] }>("/stage")
  },
}
