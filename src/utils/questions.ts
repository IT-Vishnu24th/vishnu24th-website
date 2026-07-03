import type { MultiLang } from "@/types/util"

export type QuestionType = "numeric" | "single-choice" | "multi-choice" | "text"

export interface QuestionDef {
  id: string
  phaseId: string
  type: QuestionType
  correctAnswer: string | string[] // For single-choice/multi-choice, these are string indices. For text/numeric, can be an array of acceptable alternatives.
  title: MultiLang
  choices?: MultiLang<string[]>
  imageAsset?: string
  revealTime: string // ISO 8601 string
}

export const QUESTIONS: Record<string, QuestionDef> = {
  q1: {
    id: "q1",
    phaseId: "mission-1",
    type: "numeric",
    correctAnswer: "24",
    title: {
      th: "ค่ายวิษณุกรรมบุตรปีนี้เป็นครั้งที่เท่าไหร่?",
      en: "Which edition is this year's Vishnu Camp?",
    },
    revealTime: "2026-07-21T12:30:00+07:00",
  },
  q2: {
    id: "q2",
    phaseId: "mission-2",
    type: "single-choice",
    correctAnswer: "3",
    title: {
      th: "สีประจำคณะวิศวกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย คือสีอะไร?",
      en: "What is the official color of the Faculty of Engineering, Chulalongkorn University?",
    },
    choices: {
      th: ["สีเเดงเลือดนก", "สีเเดงเลือดหมี", "สีแดงเลือดกวาง", "สีเเดงเลือดหมู"],
      en: ["Crimson", "Bear-blood", "Deer-blood", "Maroon"],
    },
    revealTime: "2026-07-21T18:30:00+07:00",
  },
  q3: {
    id: "q3",
    phaseId: "mission-3",
    type: "single-choice",
    correctAnswer: "2",
    title: {
      th: "ทำไมจุฬาเข้าแล้วออกไม่ได้?",
      en: "Why can't you leave Chula?",
    },
    choices: {
      th: ["จุฬาลงบรรได", "จุฬาลงลิฟต์", "จุฬาลงกลอน", "จุฬาลงวิชาเรียน"],
      en: ["Chulalongbandai", "Chulalonglift", "Chulalongklon", "Chulalongwicharian"],
    },
    revealTime: "2026-07-22T12:30:00+07:00",
  },
  q4: {
    id: "q4",
    phaseId: "mission-4",
    type: "multi-choice",
    correctAnswer: ["0", "1", "2", "3"],
    title: {
      th: "ข้อใดไม่ใช่ภาควิชาของคณะวิศวกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย?",
      en: "Which of the following is NOT a department in the Faculty of Engineering, Chulalongkorn University?",
    },
    choices: {
      th: [
        "ภาควิชาวิศวกรรมเวทมนต์และไสยศาสตร์",
        "ภาควิชาวิศวกรรมตามทัน",
        "ภาควิชาวิศวกรรมโดนัทและขนมหวาน",
        "ภาควิชาวิศวกรรมสมบัติและทวีปมืด",
      ],
      en: [
        "Department of Magical and Occult Engineering",
        "Department of Catch-up Engineering",
        "Department of Donut and Dessert Engineering",
        "Department of Treasure and Dark Continent Engineering",
      ],
    },
    revealTime: "2026-07-22T18:30:00+07:00",
  },
  q5: {
    id: "q5",
    phaseId: "mission-5",
    type: "text",
    correctAnswer: ["อิคคิวซัง", "Ikkyusan", "ikkyusan", "Ikkyu-san", "ikkyu-san"],
    title: {
      th: "ทายตัวละครจากแถบสี",
      en: "Guess the character from the color stripes",
    },
    imageAsset: "ikkyusan.png",
    revealTime: "2026-07-23T12:30:00+07:00",
  },
  q6: {
    id: "q6",
    phaseId: "mission-6",
    type: "single-choice",
    correctAnswer: "0",
    title: {
      th: "ทายเนื้อเพลง “ยังมีปราสาทสีแดง ดังศิลาแลงงดงาม.....แหล่งเมืองชมพู”",
      en: "Fill in the missing lyrics: “YangMi Prasat Si Daeng, Dang Silalaeng Ngotngam ..... Laeng Mueang Chomphu”",
    },
    choices: {
      th: ["เด่นแซง", "ดินแดง", "เปล่งแสง", "พริกแกง"],
      en: ["Den Saeng", "Din Daeng", "Pleng Saeng", "Prik Gaeng"],
    },
    revealTime: "2026-07-23T18:30:00+07:00",
  },
  q7: {
    id: "q7",
    phaseId: "mission-7",
    type: "single-choice",
    correctAnswer: "1",
    title: {
      th: "ชื่อจริง ๆ ของลานเกียร์คืออะไร?",
      en: "What is the actual name of Larn Gear?",
    },
    choices: {
      th: ["ลาน inside out", "ลาน intania", "ก็ลานเกียร์ไง", "ลาน into the sun 💜"],
      en: ["Larn Inside Out", "Larn Intania", "It is Larn Gear!", "Larn Into The Sun 💜"],
    },
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

  if (Array.isArray(userAnswer)) return false

  const userStr = userAnswer.trim().toLowerCase()

  if (Array.isArray(q.correctAnswer)) {
    return q.correctAnswer.some((correctVal) => String(correctVal).trim().toLowerCase() === userStr)
  }

  return userStr === String(q.correctAnswer).trim().toLowerCase()
}
