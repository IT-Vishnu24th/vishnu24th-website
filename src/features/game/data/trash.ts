import { TrashItem, BinData } from "../types/game"

export const TRASH_ITEMS: TrashItem[] = [
  // Recycle
  {
    templateId: 1,
    name: "Plastic Bottle",
    type: "recycle",
    emoji: "🧴",
  },
  {
    templateId: 2,
    name: "Glass Bottle",
    type: "recycle",
    emoji: "🍾",
  },
  {
    templateId: 3,
    name: "Newspaper",
    type: "recycle",
    emoji: "📰",
  },
  {
    templateId: 4,
    name: "Cardboard",
    type: "recycle",
    emoji: "📦",
  },
  {
    templateId: 5,
    name: "Aluminum Can",
    type: "recycle",
    emoji: "🥫",
  },
  {
    templateId: 6,
    name: "Paper",
    type: "recycle",
    emoji: "📄",
  },

  // General
  {
    templateId: 7,
    name: "Plastic Bag",
    type: "general",
    emoji: "🛍️",
  },
  {
    templateId: 8,
    name: "Broken Cup",
    type: "general",
    emoji: "☕",
  },
  {
    templateId: 9,
    name: "Straw",
    type: "general",
    emoji: "🥤",
  },
  {
    templateId: 10,
    name: "Candy Wrapper",
    type: "general",
    emoji: "🍬",
  },
  {
    templateId: 11,
    name: "Tissue",
    type: "general",
    emoji: "🧻",
  },
  {
    templateId: 12,
    name: "Disposable Spoon",
    type: "general",
    emoji: "🥄",
  },

  // Food
  {
    templateId: 13,
    name: "Banana Peel",
    type: "food",
    emoji: "🍌",
  },
  {
    templateId: 14,
    name: "Apple Core",
    type: "food",
    emoji: "🍎",
  },
  {
    templateId: 15,
    name: "Fish Bone",
    type: "food",
    emoji: "🐟",
  },
  {
    templateId: 16,
    name: "Egg Shell",
    type: "food",
    emoji: "🥚",
  },
  {
    templateId: 17,
    name: "Vegetable",
    type: "food",
    emoji: "🥬",
  },
  {
    templateId: 18,
    name: "Bread",
    type: "food",
    emoji: "🍞",
  },
]

export const BINS: BinData[] = [
  {
    type: "recycle",
    label: "♻️ Recycle",
  },
  {
    type: "general",
    label: "🗑️ General",
  },
  {
    type: "food",
    label: "🍎 Food",
  },
]

export const GAME_DURATION = 30

export const INITIAL_FALL_SPEED = 120

export const MAX_FALL_SPEED = 320

export const SPEED_INCREASE = 5

export const SPAWN_INTERVAL = 900

export const MAX_PLAYS_PER_DAY = 3
