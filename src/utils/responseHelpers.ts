import { NextResponse } from "next/server"
import type { ApiSuccess, ApiFailure } from "@/types/apiResponse"

export const success = <T>(data: T) =>
  NextResponse.json({ data } satisfies ApiSuccess<T>, { status: 200 })

export const failure = (status: number, message: string) =>
  NextResponse.json({ message } satisfies ApiFailure, { status })
