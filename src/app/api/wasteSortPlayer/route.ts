import { success } from "@/utils/apiHelpers"
import wasteSortPlayerService from "@/services/wasteSortPlayerService"

export async function GET() {
  const players = await wasteSortPlayerService.list()
  return success({ players })
}
