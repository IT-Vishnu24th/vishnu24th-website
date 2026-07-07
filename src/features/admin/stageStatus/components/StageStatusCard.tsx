"use client"

import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { useMemo, useState } from "react"
import { cardClasses, Status, statusClasses } from "../const/status"

interface StageStatusCardProps {
  title: string
  startTime: string
  endTime: string
  initialStatus: Status
}

const TimeBlock = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex min-w-16 flex-col items-start gap-0.5">
      <span className="text-[10px] leading-[1.4] opacity-80">{label}</span>
      <span className="text-[14px] leading-[1.4]">{value}</span>
    </div>
  )
}

const StatusPill = ({ status }: { status: Status }) => (
  <div
    className={`flex w-21.25 shrink-0 items-center justify-center rounded-2xl p-2 text-[14px] leading-[1.4] text-white ${statusClasses[status]}`}
  >
    {status}
  </div>
)

export const StageStatusCard = ({
  title,
  startTime,
  endTime,
  initialStatus,
}: StageStatusCardProps) => {
  const [status, setStatus] = useState<Status>(initialStatus)

  const cardClass = useMemo(() => cardClasses[status], [status])

  return (
    <article
      className={`flex w-full items-center justify-between rounded-xl px-2 py-4 ${cardClass}`}
    >
      <div className="size-8 shrink-0 rounded-full bg-[radial-gradient(circle_at_center,#e9e9e9_0_35%,transparent_36%),repeating-linear-gradient(45deg,#ededed_0_1px,#ffffff_1px_3px)]" />

      <div className="flex w-48 shrink-0 flex-col items-start gap-2">
        <h2 className="w-full text-[16px] leading-[1.4]">{title}</h2>
        <div className="flex items-center gap-3">
          <TimeBlock label="เวลาเริ่ม" value={startTime} />
          <div className="h-7 w-0.5 shrink-0 rounded-full bg-current/40" />
          <TimeBlock label="เวลาสิ้นสุด" value={endTime} />
        </div>
      </div>

      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button type="button" className="w-21.25 shrink-0 cursor-pointer">
            <StatusPill status={status} />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            sideOffset={6}
            align="end"
            className="z-20 w-21.25 overflow-hidden rounded-lg bg-white"
          >
            {(["Completed", "Upcoming", "Live", "None"] as Status[]).map((nextStatus) => (
              <DropdownMenu.Item
                key={nextStatus}
                onSelect={() => setStatus(nextStatus)}
                className={`flex cursor-pointer items-center justify-center p-2 text-[14px] leading-[1.4] text-white outline-none ${statusClasses[nextStatus]}`}
              >
                {nextStatus}
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </article>
  )
}
