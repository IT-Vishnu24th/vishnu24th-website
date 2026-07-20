import { success } from "@/utils/apiHelpers"

export function GET() {
  const currentTime =
    process.env.NODE_ENV === "development" && process.env.MOCK_CURRENT_TIME
      ? new Date(process.env.MOCK_CURRENT_TIME)
      : new Date()

  return success(currentTime.toISOString())
}
