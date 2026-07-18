export interface Slide {
  id: string
  title: string
  description?: string
  file: string
  releaseAt: string // ISO format
}

export const SLIDES: Slide[] = [
  {
    id: "1",
    title: "สไลด์แนะนำจุฬา & วิศวะจุฬาฯ",
    description: "ทำความรู้จักจุฬาฯ และชมรมต่างในวิศวะจุฬาฯ ",
    file: "FirstDate.pdf",
    releaseAt: "2026-07-18T06:40:00Z", // 18/07/2569 13:40 ไทย
    // releaseAt: "2026-06-23T04:55:00Z", //test
  },
  {
    id: "2",
    title: "สไลด์สอนน้องร้องเพลง",
    description: "เพลงประจำวิศวะจุฬาที่น้องๆต้องร้อง",
    file: "Engineering-song.pdf",
    releaseAt: "2026-07-23T04:55:00Z", // 23/07/2569 11:55 ไทย
    // releaseAt: "2026-06-23T04:55:00Z", //test
  },
]
