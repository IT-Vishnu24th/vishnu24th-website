"use client"

import { useMemo, useState } from "react"

import { getErrorMessage } from "@/lib/error-message"
import { useFeatureFlags, useUpdateFeatureFlags } from "@/hooks/useApi"
import { ApiFailure } from "@/types/apiResponse"

import { toast } from "sonner"

import { PhaseSaveButton } from "./PhaseSaveButton"
import { WebsitePhaseBlock } from "./WebsitePhaseBlock"
import { modalStore } from "@/stores/modalStore"

const websitePhaseSections = [
  {
    title: "หน้าหลัก",
    toggles: [
      { id: "show-registration-point", label: "ดูจุดลงทะเบียนของตัวเอง" },
      { id: "reveal-vessel", label: "ดูยานของตัวเอง" },
    ],
  },
  {
    title: "สำรวจ",
    toggles: [
      { id: "show-map", label: "แผนที่" },
      { id: "map-clubs", label: "ชมรม" },
      { id: "show-events", label: "อีเวนต์" },
      { id: "show-slides-download", label: "ดาวน์โหลด" },
    ],
  },
  {
    title: "เกมส์",
    defaultOpen: true,
    toggles: [
      { id: "game-sustain", label: "แยกขยะ" },
      { id: "game-popkaew", label: "ป๊อบแก้ว" },
      { id: "game-clubscan", label: "ล่าหีบสมบัตืิ" },
    ],
  },
]

export const PhaseWebsiteSection = () => {
  const { data } = useFeatureFlags()
  const { mutate: updateFeatureFlags, isPending } = useUpdateFeatureFlags()

  const [toggleState, setToggleState] = useState<Record<string, boolean>>({})
  const [prevData, setPrevData] = useState<typeof data>(undefined)

  // Initialize local state from API
  if (data !== prevData) {
    setPrevData(data)
    if (data?.data) {
      setToggleState(Object.fromEntries(data.data.map((flag) => [flag.id, flag.enabled])))
    }
  }

  const sections = useMemo(() => {
    const availableFlags = new Set((data?.data ?? []).map((flag) => flag.id))

    return websitePhaseSections
      .map((section) => ({
        ...section,
        toggles: section.toggles
          .filter((toggle) => availableFlags.has(toggle.id))
          .map((toggle) => ({
            ...toggle,
            checked: toggleState[toggle.id] ?? false,
          })),
      }))
      .filter((section) => section.toggles.length > 0)
  }, [data, toggleState])

  const onSave = () => {
    if (isPending) return
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
    updateFeatureFlags(toggleState, {
      onSuccess: () => {
        toast.success("แก้ไขฟีเจอร์สำเร็จ")
      },
      onError: (error) => {
        const apiError = error as unknown as ApiFailure
        toast.error(getErrorMessage(apiError.code, "th"))
      },
      onSettled: () => {
        modalStore.close()
      },
    })
  }

  return (
    <>
      <div className="w-full flex flex-col gap-8 items-center min-h-140 pt-25">
        {sections.map((section) => (
          <WebsitePhaseBlock
            key={section.title}
            title={section.title}
            defaultOpen={section.defaultOpen}
            toggles={section.toggles.map((toggle) => ({
              ...toggle,
              checked: toggleState[toggle.id] ?? false,
              onCheckedChange: (checked: boolean) =>
                setToggleState((prev) => ({
                  ...prev,
                  [toggle.id]: checked,
                })),
            }))}
          />
        ))}
      </div>

      <PhaseSaveButton onSave={onSave} disabled={isPending} />
    </>
  )
}
