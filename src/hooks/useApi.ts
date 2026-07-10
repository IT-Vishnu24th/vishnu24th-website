import { stageApi, userApi } from "@/lib/api"
import { useQuery } from "@tanstack/react-query"

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
