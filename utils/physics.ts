import { FallingTrash } from "@/types/game";
import {
  INITIAL_FALL_SPEED,
  MAX_FALL_SPEED,
  SPEED_INCREASE,
} from "@/data/trash";

/**
 * Calculates the global falling speed based on
 * how many seconds have elapsed.
 */
export function calculateFallSpeed(elapsedSeconds: number): number {
  return Math.min(
    INITIAL_FALL_SPEED + elapsedSeconds * SPEED_INCREASE,
    MAX_FALL_SPEED
  );
}

/**
 * Returns the next Y position using delta time.
 *
 * dt is measured in seconds.
 */
export function calculateNextY(
  currentY: number,
  speed: number,
  dt: number
): number {
  return currentY + speed * dt;
}

/**
 * Updates every falling trash item.
 */
export function updateTrashPositions(
  trash: FallingTrash[],
  dt: number,
  elapsedSeconds: number
): FallingTrash[] {
  const speed = calculateFallSpeed(elapsedSeconds);

  return trash.map((item) => ({
    ...item,
    speed,
    y: calculateNextY(item.y, speed, dt),
  }));
}

/**
 * Removes trash that has fallen below the game area.
 */
export function removeOffscreenTrash(
  trash: FallingTrash[],
  gameHeight: number,
  itemSize = 64
): FallingTrash[] {
  return trash.filter(
    (item) => item.y < gameHeight + itemSize
  );
}

/**
 * Creates a new FallingTrash object.
 */
export function createFallingTrash(
  id: string,
  base: Omit<FallingTrash, "id" | "x" | "y" | "speed">,
  x: number
): FallingTrash {
  return {
    ...base,
    id,
    x,
    y: -40,
    speed: INITIAL_FALL_SPEED,
  };
}