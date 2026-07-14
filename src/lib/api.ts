import { StagePerformance } from "@/types/stagePerformance"
import { api } from "./api-client"
import { User } from "@/types/user"
import { FeatureFlag } from "@/types/featureFlag"
import { MultiLang } from "@/types/util"
import { RegistrationPhase, VishnuMissionPhase } from "@/types/phase"

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

// Feature flags API
export const featureFlagApi = {
  getFeatureFlags: async () => {
    return api.get<{ data: FeatureFlag[] }>("/flags")
  },

  createFeatureFlag: async (body: { id: string; name: MultiLang; enabled?: boolean }) => {
    return api.post<{ data: FeatureFlag }>("/flags", body)
  },

  updateFeatureFlag: async (id: string, enabled: boolean) => {
    return api.put<{ data: FeatureFlag }>(`/flags/${id}`, {
      enabled,
    })
  },

  updateFeatureFlags: async (flags: Record<string, boolean>) => {
    return api.patch<{ data: boolean }>("/flags", flags)
  },
}

// Phase API
export const phaseApi = {
  getPhase: async () => {
    return api.get<{
      data: {
        regis: RegistrationPhase
        vishnuMission: VishnuMissionPhase
      }
    }>("/phase")
  },

  updatePhase: async (
    body: Partial<{
      regis: RegistrationPhase
      vishnuMission: VishnuMissionPhase
    }>
  ) => {
    return api.patch<{
      data: {
        message: string
        regis: RegistrationPhase
        vishnuMission: VishnuMissionPhase
      }
    }>("/phase", body)
  },
}
