// Main game component
export { default as Game } from "./components/Game"

// Hooks
export { useGame } from "./hooks/useGame"
export { default as useAnimation } from "./hooks/useAnimation"
export { default as useSpawner } from "./hooks/useSpawner"
export { default as useTimer } from "./hooks/useTimer"
export { usePointerDrag } from "./hooks/usePointerDrag"

// Utilities
export * from "./utils/storage"
export * from "./utils/physics"
export * from "./utils/random"
export * from "./utils/collision"

// Data
export * from "./data/trash"

// Types
export type * from "./types/game"
