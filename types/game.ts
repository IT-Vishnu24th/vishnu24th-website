export type TrashType =
  | "recycle"
  | "general"
  | "food";


export type GameStatus =
  | "ready"
  | "playing"
  | "finished";


export interface TrashItem {
  templateId: number;
  name: string;
  type: TrashType;
  emoji: string;
}


export interface FallingTrash {
  id: string;

  templateId: number;

  name: string;

  type: TrashType;

  emoji: string;

  x: number;

  y: number;

  speed: number;
}


export interface GameResult {
  score: number;
  bestScore: number;
  playedAt: number;
}