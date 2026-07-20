import { success } from "@/utils/apiHelpers"

export function GET() {
  return success(new Date().toISOString())
}
