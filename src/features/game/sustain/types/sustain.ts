export type SustainTrashType = "general" | "recycle" | "food"

export type SustainTrashTemplate = {
  id: string
  label: string
  icon: string
  type: SustainTrashType
}

export type SustainFallingTrash = SustainTrashTemplate & {
  instanceId: string
  x: number
  y: number
  size: number
  speed: number
  isDragging: boolean
}

export type SustainBin = {
  type: SustainTrashType
  label: string
  hint: string
  x: number
  y: number
  width: number
  height: number
}

export type SustainGamePhase = "home" | "countdown" | "playing" | "finished"

export type SustainPlaysResponse = {
  remainingPlays: number
  playsUsed: number
  maxPlays: number
  resetAt: string
}
