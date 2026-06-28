type Club = {
  id: number
  name: string
}

type BuildingData = {
  name: string
  clubs: Club[]
} //TODO : add type

export const buildingData: Record<string, BuildingData> = {
  "building-1": {
    name: "ตึก 1",
    clubs: [],
  },
  "building-2": {
    name: "ตึก 2",
    clubs: [],
  },
  "building-3": {
    name: "ตึก 3",
    clubs: [],
  },
  "building-4": {
    name: "ตึก 4",
    clubs: [],
  },
  "building-100": {
    name: "อาคารวศ. 100 ปี",
    clubs: [],
  },
  "gear-yard": {
    name: "ลานเกียร์",
    clubs: [
      { id: 1, name: "ชมรมหกเจ็ด" },
      { id: 2, name: "ชมรมเจ็ดหก" },
      { id: 3, name: "ชมรม67" },
    ],
  },
  "faculty-sign": {
    name: "ป้ายคณะ",
    clubs: [],
  },
  "ruamjai-garden": {
    name: "สวนรวมใจ",
    clubs: [],
  },
  charoen: {
    name: "เจริญ",
    clubs: [],
  },
  colombo: {
    name: "โคลัมโบ",
    clubs: [],
  },
  hans: {
    name: "ฮันส์",
    clubs: [],
  },
  icanteen: {
    name: "iCanteen",
    clubs: [],
  },
  arun: {
    name: "อรุณ",
    clubs: [],
  },
  electrical: {
    name: "ไฟฟ้า",
    clubs: [],
  },
}
