import { featureFlagApi, leaderboardApi, phaseApi, stageApi, userApi } from "@/lib/api"
import { StagePerformance } from "@/types/stagePerformance"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

// User API hooks
export function useMe() {
  return useQuery({ queryKey: ["me"], queryFn: () => userApi.getMe() })
}

export function useUpdateMe() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: userApi.updateMe,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["me"],
      })
    },
  })
}

export function useMyMissions() {
  return useQuery({
    queryKey: ["my-missions"],
    queryFn: () => userApi.getMissions(),
  })
}

// Stage API hooks
export function useStages() {
  return useQuery({
    queryKey: ["stage"],
    queryFn: () => stageApi.getStages(),
  })
}

export function useStage(id: string) {
  return useQuery({
    queryKey: ["stage", id],
    queryFn: () => stageApi.getStage(id),
    enabled: !!id,
  })
}

export function useCreateStage() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: stageApi.createStage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stage"] })
    },
  })
}

export function useUpdateStage() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Omit<StagePerformance, "id">> }) =>
      stageApi.updateStage(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["stage"] })
      queryClient.invalidateQueries({ queryKey: ["stage", variables.id] })
    },
  })
}

export function useDeleteStage() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: stageApi.deleteStage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stage"] })
    },
  })
}

export function useSetLiveStage() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: stageApi.setLiveStage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stage"] })
    },
  })
}

// Feature Flag API hooks
export function useFeatureFlags() {
  return useQuery({
    queryKey: ["feature-flags"],
    queryFn: () => featureFlagApi.getFeatureFlags(),
  })
}

export function useCreateFeatureFlag() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: featureFlagApi.createFeatureFlag,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feature-flags"] })
    },
  })
}

export function useUpdateFeatureFlag() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, enabled }: { id: string; enabled: boolean }) =>
      featureFlagApi.updateFeatureFlag(id, enabled),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feature-flags"] })
    },
  })
}

export function useUpdateFeatureFlags() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: featureFlagApi.updateFeatureFlags,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feature-flags"] })
    },
  })
}

// Leaderboard API hooks
export function useLeaderboard() {
  return useQuery({
    queryKey: ["leaderboard"],
    queryFn: () => leaderboardApi.getLeaderboard(),
  })
}

// Phase API hooks
export function usePhase() {
  return useQuery({
    queryKey: ["phase"],
    queryFn: () => phaseApi.getPhase(),
  })
}

export function useUpdatePhase() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: phaseApi.updatePhase,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["phase"],
      })
    },
  })
}
