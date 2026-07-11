import { TRASH_ITEMS } from "../data/trash"
import { TrashItem } from "../types/game"

/**
 * Returns a random integer between min and max (inclusive).
 */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Returns a random floating-point number between min and max.
 */
export function randomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

/**
 * Returns a random trash item.
 */
export function getRandomTrash(): TrashItem {
  return TRASH_ITEMS[randomInt(0, TRASH_ITEMS.length - 1)]
}

/**
 * Returns a random X position within the game area.
 */
export function randomSpawnX(containerWidth: number, itemSize = 64): number {
  const padding = itemSize / 2

  return randomFloat(padding, Math.max(padding, containerWidth - padding))
}

/**
 * Fisher–Yates shuffle.
 */
export function shuffle<T>(array: T[]): T[] {
  const result = [...array]

  for (let i = result.length - 1; i > 0; i--) {
    const j = randomInt(0, i)

    ;[result[i], result[j]] = [result[j], result[i]]
  }

  return result
}
