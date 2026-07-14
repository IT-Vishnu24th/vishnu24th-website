export type Status = "Completed" | "Upcoming" | "Live" | "None"

export const statusClasses: Record<Status, string> = {
  Completed: "bg-status-green",
  Upcoming: "bg-status-yellow",
  Live: "bg-status-red",
  None: "bg-black",
}

export const cardClasses: Record<Status, string> = {
  Completed: "bg-white text-[#c8c8c8]",
  Upcoming: "bg-[#616161] text-[#eaeaea]",
  Live: "bg-black text-white",
  None: "bg-black text-white",
}
