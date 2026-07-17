"use client"

import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { useMemo } from "react"
import { cardClasses, statusClasses } from "../const/status"
import { StagePerformance, StagePerformanceStatus } from "@/types/stagePerformance"

interface StageStatusCardProps {
  stage: StagePerformance
  onChange: (updates: Partial<StagePerformance>) => void
}

const toLocalISOString = (dateStr: string) => {
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return ""

  const pad = (n: number) => n.toString().padStart(2, "0")
  const year = d.getFullYear()
  const month = pad(d.getMonth() + 1)
  const day = pad(d.getDate())
  const hours = pad(d.getHours())
  const minutes = pad(d.getMinutes())
  return `${year}-${month}-${day}T${hours}:${minutes}`
}

const parseLocalInputToISO = (inputValue: string) => {
  if (!inputValue) return ""
  const [datePart, timePart] = inputValue.split("T")
  if (!datePart || !timePart) return ""
  const [year, month, day] = datePart.split("-").map(Number)
  const [hours, minutes] = timePart.split(":").map(Number)
  const dateObj = new Date(year, month - 1, day, hours, minutes)
  return dateObj.toISOString()
}

const TimeInput = ({
  label,
  value,
  onChange,
  isDark,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  isDark: boolean
}) => {
  const localVal = useMemo(() => toLocalISOString(value), [value])

  return (
    <div className="flex flex-col items-start gap-0.5">
      <span className="text-[14px] leading-[1.4] opacity-80 font-fc-quantum">{label}</span>
      <input
        type="datetime-local"
        value={localVal}
        onChange={(e) => {
          const isoVal = parseLocalInputToISO(e.target.value)
          if (isoVal) onChange(isoVal)
        }}
        style={{ colorScheme: isDark ? "dark" : "light" }}
        className="bg-transparent text-[13px] font-ppfragment-glare leading-[1.4] border-b border-dashed border-current/30 hover:border-current/60 focus:border-current outline-none cursor-pointer transition-colors max-w-full"
      />
    </div>
  )
}

const StatusPill = ({ status }: { status: StagePerformanceStatus }) => (
  <div
    className={`flex w-21.25 shrink-0 border font-ppfragment-glare items-center justify-center rounded-2xl p-2 text-[14px] leading-[1.4] text-white ${statusClasses[status]}`}
  >
    {status}
  </div>
)

export const StageStatusCard = ({ stage, onChange }: StageStatusCardProps) => {
  const status = stage.status
  const isDark = status === "live" || status === "delayed" || status === "upcoming"
  const cardClass = useMemo(() => cardClasses[status], [status])

  return (
    <article
      className={`flex w-full items-center justify-between rounded-xl px-2 py-4 ${cardClass}`}
    >
      <div className="flex flex-1 min-w-0 flex-col items-start gap-2 mx-4">
        <h2 className="w-full text-[16px] font-fc-quantum">{stage.name.th}</h2>
        <div className="flex items-center gap-3 w-full">
          <TimeInput
            label="เวลาเริ่ม"
            value={stage.start}
            onChange={(v) => onChange({ start: v })}
            isDark={isDark}
          />
          <div className="h-7 w-0.5 shrink-0 rounded-full bg-current/40" />
          <TimeInput
            label="เวลาสิ้นสุด"
            value={stage.end}
            onChange={(v) => onChange({ end: v })}
            isDark={isDark}
          />
        </div>
      </div>

      <DropdownMenu.Root modal={false}>
        <DropdownMenu.Trigger asChild>
          <button type="button" className="w-21.25 shrink-0 cursor-pointer">
            <StatusPill status={status} />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            sideOffset={6}
            align="end"
            className="z-20 w-21.25 overflow-hidden rounded-lg bg-white shadow-lg"
          >
            {(["complete", "upcoming", "delayed", "live"] as StagePerformanceStatus[]).map(
              (nextStatus) => (
                <DropdownMenu.Item
                  key={nextStatus}
                  onSelect={() => onChange({ status: nextStatus })}
                  className={`flex cursor-pointer border items-center justify-center font-ppfragment-glare p-2 text-[14px] leading-[1.4] text-white outline-none ${statusClasses[nextStatus]}`}
                >
                  {nextStatus}
                </DropdownMenu.Item>
              )
            )}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </article>
  )
}
