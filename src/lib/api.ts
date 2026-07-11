import { StagePerformance } from "@/types/stagePerformance"
import { api } from "./api-client"
import { User } from "@/types/user"

// User API
export const userApi = {
  getMe: async () => {
    return api.get<{ data: User }>("/users/me")
  },
}

// Stage API
export const stageApi = {
  getStages: async () => {
    return api.get<{ data: StagePerformance[] }>("/stage")
  },
}
