"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import type { MissionApiError } from "@/types/mission"

interface SubmitPayload {
  id: string
  answer: string | string[]
}

const ERROR_MESSAGES: Record<string, string> = {
  SUBMISSION_CLOSED: "หมดเวลาส่งคำตอบสำหรับข้อนี้แล้ว",
  ANSWER_ALREADY_SUBMITTED: "คุณตอบคำถามข้อนี้ไปแล้ว มีโอกาสตอบได้ครั้งเดียวเท่านั้น",
  INVALID_ANSWER_FORMAT: "รูปแบบคำตอบไม่ถูกต้อง",
  INVALID_QUESTION_ID: "ไม่พบคำถามนี้ในระบบ",
  UNAUTHORIZED: "กรุณาเข้าสู่ระบบก่อนตอบคำถาม",
  FORBIDDEN: "บัญชีนี้ไม่สามารถตอบคำถามนี้ได้",
}

async function submitAnswer(payload: SubmitPayload) {
  const res = await fetch("/api/users/me/missions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  const json = await res.json()

  if (!res.ok) {
    const error: MissionApiError = {
      code: json?.code,
      message: json?.message ?? "ส่งคำตอบไม่สำเร็จ กรุณาลองใหม่",
    }
    throw error
  }

  return json.data
}

export function useSubmitMissionAnswer() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: submitAnswer,
    onSuccess: () => {
      toast.success("บันทึกคำตอบเรียบร้อยแล้ว")
      queryClient.invalidateQueries({ queryKey: ["mission-history"] })
    },
    onError: (error: MissionApiError) => {
      const friendly = (error.code && ERROR_MESSAGES[error.code]) ?? error.message
      toast.error(friendly)
    },
  })
}
