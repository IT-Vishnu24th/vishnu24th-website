import { featureFlagApi, phaseApi, stageApi, userApi } from "@/lib/api"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

// User API hooks
export function useMe() {
  return useQuery({ queryKey: ["me"], queryFn: () => userApi.getMe() })
}

// Stage API hooks
export function useStages() {
  return useQuery({
    queryKey: ["stage"],
    queryFn: () => stageApi.getStages(),
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
