import type { TrashType } from "@/types/game";

export interface CollisionBox {
  x: number;
  y: number;
  width: number;
  height: number;
}


export interface TrashCollisionObject {
  x: number;
  y: number;
  size: number;
}


export function checkCollision(
  trash: TrashCollisionObject,
  bin: CollisionBox
): boolean {

  const trashLeft = trash.x;
  const trashRight = trash.x + trash.size;

  const trashTop = trash.y;
  const trashBottom = trash.y + trash.size;


  const binLeft = bin.x;
  const binRight = bin.x + bin.width;

  const binTop = bin.y;
  const binBottom = bin.y + bin.height;


  return (
    trashRight >= binLeft &&
    trashLeft <= binRight &&
    trashBottom >= binTop &&
    trashTop <= binBottom
  );
}


export interface BinPosition {
  type: TrashType;
  box: CollisionBox;
}