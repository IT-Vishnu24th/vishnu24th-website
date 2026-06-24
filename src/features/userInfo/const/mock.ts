import type { User } from "@/types/user"

export const getMockUser = (id = "1234567890"): User => ({
  id,
  role: "participant",
  nameEn: {
    title: "Mr.",
    firstName: "Karen",
    surname: "Speed",
    nickname: "Speed",
  },
  nameTh: {
    title: "นาย",
    firstName: "แคเรน",
    surname: "สปีด วัดสกีน",
    nickname: "สปีด",
  },
  group: {
    label: "ยาน",
    vesselNameEn: "Among Us",
    vesselNameTh: "ยานอามองอัส",
    score: 240,
  },
  departmentEn: "Information Technology",
  departmentTh: "เทคโนโลยีสารสนเทศ",
  prefLanguage: "th",
})

export const mockRows = [
  [
    { label: "pronoun", value: "he/speed" },
    { label: "วันเกิด", value: "1234567890" },
  ],
  [
    { label: "โรงเรียน", value: "he/speed" },
    { label: "ศาสนา", value: "1234567890" },
  ],
  [
    { label: "id line", value: "he/speed" },
    { label: "facebook", value: "1234567890" },
  ],
  [
    { label: "เบอร์ติดต่อ", value: "065-111-6767" },
    { label: "เบอร์ติดต่อฉุกเฉิน", value: "123-456-7890 (แม่)" },
  ],
  [
    { label: "โรคประจำตัว", value: "SUIIIII" },
    { label: "ยาประจำตัว", value: "Ronaldo" },
  ],
]
