export type QuestionType = "numeric" | "single-choice" | "multi-choice" | "thai-text"

export interface QuestionDef {
  id: string
  phaseId: string
  type: QuestionType
  correctAnswer: string | string[] // For single-choice/multi-choice, these are string indices: e.g. "0", ["0", "1"]
  title: string
  choices?: string[]
  imageAsset?: string
  revealTime: string // ISO 8601 string
}

export const QUESTIONS: Record<string, QuestionDef> = {
  q1: {
    id: "q1",
    phaseId: "mission-1",
    type: "numeric",
    correctAnswer: "24",
    title: "ค่ายวิษณุกรรมบุตรปีนี้เป็นครั้งที่เท่าไหร่?",
    revealTime: "2026-07-21T12:30:00+07:00",
  },
  q2: {
    id: "q2",
    phaseId: "mission-2",
    type: "single-choice",
    correctAnswer: "3",
    title: "สีประจำคณะวิศวกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย คือสีอะไร?",
    choices: ["สีเเดงเลือดนก", "สีเเดงเลือดหมี", "สีแดงเลือดกวาง", "สีเเดงเลือดหมู"],
    revealTime: "2026-07-21T18:30:00+07:00",
  },
  q3: {
    id: "q3",
    phaseId: "mission-3",
    type: "single-choice",
    correctAnswer: "2",
    title: "ทำไมจุฬาเข้าแล้วออกไม่ได้?",
    choices: ["จุฬาลงบรรได", "จุฬาลงลิฟต์", "จุฬาลงกลอน", "จุฬาลงวิชาเรียน"],
    revealTime: "2026-07-22T12:30:00+07:00",
  },
  q4: {
    id: "q4",
    phaseId: "mission-4",
    type: "multi-choice",
    correctAnswer: ["0", "1", "2", "3"],
    title: "ข้อใดไม่ใช่ภาควิชาของคณะวิศวกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย?",
    choices: [
      "ภาควิชาวิศวกรรมเวทมนต์และไสยศาสตร์",
      "ภาควิชาวิศวกรรมตามทัน",
      "ภาควิชาวิศวกรรมโดนัทและขนมหวาน",
      "ภาควิชาวิศวกรรมสมบัติและทวีมืด",
    ],
    revealTime: "2026-07-22T18:30:00+07:00",
  },
  q5: {
    id: "q5",
    phaseId: "mission-5",
    type: "thai-text",
    correctAnswer: "อิคคิวซัง",
    title: "ทายตัวละครจากแถบสี (ตอบเป็นภาษาไทย)",
    imageAsset: "ikkyusang.png",
    revealTime: "2026-07-23T12:30:00+07:00",
  },
  q6: {
    id: "q6",
    phaseId: "mission-6",
    type: "single-choice",
    correctAnswer: "0",
    title: "ทายเนื้อเพลง “ยังมีปราสาทสีแดง ดังศิลาแลงงดงาม.......แหล่งเมืองชมพู”",
    choices: ["เด่นแซง", "ดินแดง", "เปล่งแสง", "พริกแกง"],
    revealTime: "2026-07-23T18:30:00+07:00",
  },
  q7: {
    id: "q7",
    phaseId: "mission-7",
    type: "single-choice",
    correctAnswer: "1",
    title: "ชื่อจริง ๆ ของลานเกียร์คืออะไร?",
    choices: ["ลาน inside out", "ลาน intania", "ก็ลานเกียร์ไง", "ลาน into the sun 💜"],
    revealTime: "2026-07-24T12:30:00+07:00",
  },
}

export function evaluateAnswer(questionId: string, userAnswer: string | string[]): boolean {
  const q = QUESTIONS[questionId]
  if (!q) return false

  if (q.type === "multi-choice") {
    if (!Array.isArray(userAnswer) || !Array.isArray(q.correctAnswer)) return false
    const sortedUser = [...userAnswer].sort()
    const sortedCorrect = [...q.correctAnswer].sort()
    return (
      sortedUser.length === sortedCorrect.length &&
      sortedUser.every((val, index) => val === sortedCorrect[index])
    )
  }

  return String(userAnswer).trim().toLowerCase() === String(q.correctAnswer).trim().toLowerCase()
}
