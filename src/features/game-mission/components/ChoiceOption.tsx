"use client"

import { Check, X } from "lucide-react"
import type { MissionPeriod } from "@/types/mission"

/**
 * default   -> not answered yet, not selected (light pill)
 * active    -> currently selected while picking, before saving (dark pill)
 * locked    -> submitted, awaiting reveal — this is the user's saved pick
 * correct   -> revealed: this option is the correct answer
 * incorrect -> revealed: this was the user's pick, and it was wrong
 * muted     -> revealed or locked: any other option, faded out
 */
export type ChoiceVisualState = "default" | "active" | "locked" | "correct" | "incorrect" | "muted"

interface ChoiceOptionProps {
  label: string
  state: ChoiceVisualState
  period: MissionPeriod
  onClick?: () => void
  disabled?: boolean
}

const PILL_STYLES: Record<MissionPeriod, Record<ChoiceVisualState, string>> = {
  morning: {
    default: "bg-cream-tanned text-brownie-dark",
    active: "bg-brownie-dark text-cream",
    locked: "bg-brick-orange text-brownie-dark",
    correct: "bg-status-green text-status-green-dark",
    incorrect: "bg-status-red text-status-red-dark",
    muted: "bg-cream-tanned/50 text-brownie-dark/40",
  },
  evening: {
    default: "bg-mint text-midnight",
    active: "bg-midnight text-mint",
    locked: "bg-turqoise text-midnight",
    correct: "bg-status-green text-status-green-dark",
    incorrect: "bg-status-red text-status-red-dark",
    muted: "bg-mint/50 text-midnight/35",
  },
}

const BULLET_STYLES: Record<
  MissionPeriod,
  Record<"default" | "active" | "locked" | "muted", string>
> = {
  morning: {
    default: "bg-brick-orange",
    active: "bg-brick-orange",
    locked: "bg-brownie-dark",
    muted: "bg-brownie-dark/30",
  },
  evening: {
    default: "bg-turqoise",
    active: "bg-turqoise",
    locked: "bg-midnight",
    muted: "bg-midnight/30",
  },
}

export function ChoiceOption({ label, state, period, onClick, disabled }: ChoiceOptionProps) {
  const pillClass = PILL_STYLES[period][state]
  const showBullet =
    state === "default" || state === "active" || state === "locked" || state === "muted"
  const bulletSize = state === "active" ? "w-6 h-6" : "w-5 h-5"

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`w-full flex items-center gap-3 rounded-2xl px-5 py-4 text-left transition-all ${pillClass} ${
        disabled ? "cursor-default" : "cursor-pointer active:scale-[0.99]"
      }`}
    >
      {state === "correct" && <Check className="shrink-0" size={22} strokeWidth={3} />}
      {state === "incorrect" && <X className="shrink-0" size={22} strokeWidth={3} />}
      {showBullet && (
        <span className={`shrink-0 rounded-full ${bulletSize} ${BULLET_STYLES[period][state]}`} />
      )}
      <span className="font-fc-quantum text-base md:text-lg">{label}</span>
    </button>
  )
}
