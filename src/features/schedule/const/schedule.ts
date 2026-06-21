export const scheduleStatusStyles = {
  upcoming: {
    card: "bg-neutral-500 text-white",
    badge: "border-white text-white",
    timeline: "bg-black",
    time: "text-black",
  },
  ongoing: {
    card: "bg-black text-white",
    badge: "border-red-400 text-red-400",
    timeline: "bg-black",
    time: "text-black",
  },
  completed: {
    card: "bg-white text-neutral-300",
    badge: "border-neutral-300 text-neutral-300",
    timeline: "bg-white",
    time: "text-white",
  },
  cancelled: {
    card: "bg-neutral-500 text-white",
    badge: "border-white text-white",
    timeline: "bg-black",
    time: "text-black",
  },
} as const

export type ScheduleStatus = keyof typeof scheduleStatusStyles
