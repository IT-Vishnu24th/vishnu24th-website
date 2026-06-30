import type { User } from "@/types/user"

export const getMockUser = (id = "1234567890"): User => ({
  id,
  role: "participant",
  name: {
    en: {
      title: "Mr.",
      firstName: "Karen",
      surname: "Speed",
      nickname: "Speed",
    },
    th: {
      title: "นาย",
      firstName: "แคเรน",
      surname: "สปีด วัดสกีน",
      nickname: "สปีด",
    },
  },
  group: {
    label: "ยาน",
    vesselName: {
      en: "Among Us",
      th: "ยานอามองอัส",
    },
    score: 240,
    scanScore: 0,
    registrationPoint: {
      firstdate: "EN100",
      vishnu: "EN100",
    },
  },
  department: {
    en: "Information Technology",
    th: "เทคโนโลยีสารสนเทศ",
  },
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
