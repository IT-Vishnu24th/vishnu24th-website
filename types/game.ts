export type TrashType =
  | "recycle"
  | "general"
  | "food";


export type TrashItem = {
  templateId: number;
  name: string;
  type: TrashType;
  emoji: string;
};


export type FallingTrash = TrashItem & {
  id: string;

  x: number;
  y: number;

  width: number;
  height: number;

  speed: number;

  grabbed: boolean;
  isDragging: boolean;

  offsetX: number;
  offsetY: number;
};


export type BinData = {
  type: TrashType;
  label: string;
};


export type BinState = {
  type: TrashType;

  label: string;

  x: number;
  y: number;

  width: number;
  height: number;
};


export type GameStatus =
  | "idle"
  | "playing"
  | "finished";


export type GameResult = {
  score: number;
  date: string;
};


export type PlayHistory = {
  date: string;
  plays: number;
};