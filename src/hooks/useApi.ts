import { stageApi } from "@/lib/api"
import { api } from "@/lib/api-client"
import { useQuery } from "@tanstack/react-query"

export function useStages() {
  return useQuery({
    queryKey: ["stage"],
    queryFn: () => stageApi.getStages(),
  })
}
