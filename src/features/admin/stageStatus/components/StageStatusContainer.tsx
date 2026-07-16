"use client"

import { useStages, useUpdateStage } from "@/hooks/useApi"
import { StageStatusCard } from "./StageStatusCard"
import { SaveButton } from "./SaveButton"
import { useMemo, useState } from "react"
import { StagePerformance } from "@/types/stagePerformance"
import { modalStore } from "@/stores/modalStore"
import { toast } from "sonner"
import { getErrorMessage } from "@/lib/error-message"
import { ApiFailure } from "@/types/apiResponse"

export const StageStatusContainer = () => {
  const { data: stageData, isLoading } = useStages()
  const { mutateAsync: updateStage } = useUpdateStage()

  const [editedStages, setEditedStages] = useState<Record<string, Partial<StagePerformance>>>({})
  const [isSaving, setIsSaving] = useState(false)

  const handleStageChange = (id: string, updates: Partial<StagePerformance>) => {
    if (!stageData?.data) return
    setEditedStages((prev) => {
      const current = prev[id] ?? {}
      const updated = { ...current, ...updates }

      if (updates.start || updates.end) {
        const original = stageData.data.find((s) => s.id === id)
        if (original) {
          const start = updated.start ?? original.start
          const end = updated.end ?? original.end
          updated.duration = Math.round(
            (new Date(end).getTime() - new Date(start).getTime()) / 60000
          )
        }
      }
      return { ...prev, [id]: updated }
    })
  }

  const stagesList = useMemo(() => {
    if (!stageData?.data) return []
    return stageData.data.map((stage) => {
      const updates = editedStages[stage.id]
      if (updates) {
        return { ...stage, ...updates }
      }
      return stage
    })
  }, [stageData, editedStages])

  const hasChanges = Object.keys(editedStages).length > 0

  const onSave = async () => {
    if (!hasChanges || isSaving) return

    setIsSaving(true)
    modalStore.open(
      <div className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 absolute">
        <div className="flex w-full justify-center">
          <img src="/admin/tanned_globe.png" className="max-w-50 animate-spin" alt="" />
          <div className="absolute text-brownie hover:text-brownie-dark duration-300 flex flex-col items-center pt-17">
            <div className="font-fc-quantum text-[20px]">กำลังบันทึก...</div>
          </div>
        </div>
      </div>
    )

    try {
      await Promise.all(
        Object.entries(editedStages).map(([id, data]) =>
          updateStage({
            id,
            data,
          })
        )
      )
      toast.success("บันทึกการเปลี่ยนแปลงสำเร็จ")
      setEditedStages({})
    } catch (error) {
      console.error("Failed to save stage status:", error)
      const apiError = error as unknown as ApiFailure
      toast.error(getErrorMessage(apiError?.code, "th"))
    } finally {
      setIsSaving(false)
      modalStore.close()
    }
  }

  if (isLoading) {
    return (
      <section className="h-full flex flex-col items-center justify-center py-20">
        <p className="text-[18px] text-gray-500 font-fc-quantum">กำลังโหลดข้อมูล...</p>
      </section>
    )
  }

  return (
    <section className="h-full flex flex-col items-center gap-4 pt-30 py-15">
      <div className="flex w-full flex-col items-center gap-6 px-2 max-w-120">
        {stagesList.map((stage) => (
          <StageStatusCard
            key={stage.id}
            stage={stage}
            onChange={(updates) => handleStageChange(stage.id, updates)}
          />
        ))}
      </div>
      <SaveButton onSave={onSave} disabled={!hasChanges || isSaving} />
    </section>
  )
}
