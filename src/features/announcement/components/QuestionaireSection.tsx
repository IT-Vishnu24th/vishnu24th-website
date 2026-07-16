"use client"

import { MapPin } from "lucide-react"
import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { QuestionaireTitleScreen } from "./QuestionaireTitleScreen"
import { YaanAcceptButton } from "./YaanAcceptButton"
import { useUpdateMe } from "@/hooks/useApi"
import { useQueryClient } from "@tanstack/react-query"

interface ScenarioType {
  order: number
  location: string
  text: string
  choices: string[]
  choicesRow: number[]
  img: string
  card: boolean
}

const scenario: ScenarioType[] = [
  {
    order: 0,
    location: "เรือโจรสลัด",
    text: "คุณตื่นขึ้นมาบนเรือโจรสลัดที่มีแค่คุณ\nคนเดียว รอบข้างเป็นทะเลที่เต็มไปด้วยหมอก",
    choices: ["...ลองมองไปรอบ ๆ"],
    choicesRow: [1],
    img: "/yaan/yaan_0.png",
    card: false,
  },
  {
    order: 1,
    location: "เรือโจรสลัด",
    text: "จู่ ๆ ก็มีหมึกยักษ์ที่กำลังหิวกระหายโผล่ขึ้นมา\nแล้วขออาหารคุณ\nคุณเลือกที่จะให้อาหารอะไรกับสัตว์ประหลาด",
    choices: [
      "ไข่นกกระจอกเทศเจียว",
      "หมึกชุบแป้งทอด",
      "ข้าวเหนียวไก่ทอดวิศวะ",
      "ซอยจุ๊",
      "กินเรามั้ย UwU 👉👈",
    ],
    choicesRow: [1, 1, 1, 1, 1],
    img: "/yaan/yaan_1.png",
    card: true,
  },
  {
    order: 2,
    location: "เรือโจรสลัด",
    text: 'จู่ๆ มีเสียงดัง ตึ่ก...ตึ่ก...\nคุณหันไปมองในหมอกหนา\nสิ่งแรกที่คุณเจอคือ\n"โครงกระดูกโจรสลัดขาเป๋...\nกำลังถือไม้ถูพื้นไล่ทำความสะอาดเรือ\nอย่างบ้าคลั่ง" สิ่งแรกที่คุณจะทำคืออะไร',
    choices: [
      "รีบหยิบไม้กวาดมาช่วยถู จะได้ไม่โดนฟันหัวขาด",
      'ตะโกน "ถูยังไงให้เป็นคราบ! ยังสกปรกอยู่เลย!"\nสวมบทวิญญาณแม่บ้านเหวี่ยง',
      "ถอดกระดูกขาข้างที่ดีออกมาทำเป็นอาวุธป้องกันตัว",
      "แกล้งทำตัวเป็นหุ่นลองเสื้อ ยืนนิ่งๆ กลั้นหายใจ\nเผื่อกระดูกสายตาไม่ดี",
      "ชวนมาถ่าย TikTok\nเผื่อคลิปไวรัลแล้วจะมีฮีโร่มาช่วย",
    ],
    choicesRow: [1, 2, 1, 2, 2],
    img: "/yaan/yaan_2.png",
    card: true,
  },
  {
    order: 3,
    location: "ห้องกัปตัน",
    text: "คุณเดินไปสำรวจบนห้องกัปตันเพื่อหา\nเบาะแสเพิ่มเติม บนโต๊ะมีของวางอยู่ 4 ชิ้น\nคุณจะหยิบชิ้นไหนขึ้นมาสำรวจก่อน",
    choices: [
      "สมุดบันทึกของกัปตัน",
      "กล้องส่องทางไกลเก่า ๆ",
      "แผนที่ตามล่าขุมทรัพท์สุดขอบฟ้า",
      "เข็มทิศของแจ็ค สแปร์ลู่",
      "สำรวจห้องอื่นก่อน",
    ],
    choicesRow: [1, 1, 1, 1, 1],
    img: "/yaan/yaan_3.png",
    card: true,
  },
  {
    order: 4,
    location: "เกาะอะไรเอ่ย",
    text: 'เรือโจรสลัดจอดที่เกาะแห่งหนึ่ง\nเมื่อคุณลงไปสำรวจก็พบกับสมบัติ 4\nชิ้นพร้อมข้อความว่า\n"จงเลือกของที่มีคุณค่ามากที่สุด\nกลับไปเพียงชิ้นเดียว"',
    choices: [
      "มงกุฎทองคำที่มีมูลค่ามหาศาล",
      "คัมภีร์ที่รวบรวมความรู้นับพันปี",
      "กล้องที่ถ่ายภาพอนาคตได้",
      "กระจกเงาที่สะท้อนตัวตน",
      "ไม่สนคำเตือน หยิบทุกชิ้น",
    ],
    choicesRow: [1, 1, 1, 1, 1],
    img: "/yaan/yaan_4.png",
    card: true,
  },
]

export const QuestionaireSeciton = ({
  setYarnAccepted,
}: {
  setYarnAccepted: (e: boolean) => void
}) => {
  const { mutate, isPending } = useUpdateMe()
  const queryClient = useQueryClient()

  const [start, setStart] = useState(false)
  const [finish, setFinish] = useState(false)
  const [scenarioIdx, setScenarioIdx] = useState(0)
  const [playGlitch, setPlayGlitch] = useState(false)

  const currentScenario = scenario[scenarioIdx]
  const [typedLength, setTypedLength] = useState(0)
  const displayedText = currentScenario.text.slice(0, typedLength)
  const showChoice = typedLength >= currentScenario.text.length

  useEffect(() => {
    if (!start) return

    const interval = setInterval(() => {
      setTypedLength((length) => {
        if (length >= currentScenario.text.length) {
          clearInterval(interval)
          return length
        }

        return length + 1
      })
    }, 35)

    return () => clearInterval(interval)
  }, [currentScenario.text, start])

  return (
    <div className="bg-white">
      <AnimatePresence mode="wait">
        {!start ? (
          <QuestionaireTitleScreen
            playGlitch={playGlitch}
            setPlayGlitch={setPlayGlitch}
            setStart={setStart}
          />
        ) : !finish ? (
          <motion.section
            key="questionnaire"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="flex w-full flex-col items-center bg-white min-h-screen"
          >
            <div className="text-black flex items-center gap-2 mb-6">
              <MapPin />
              <div className="font-sov-yeehor mb-5 text-[48px]">{currentScenario.location}</div>
            </div>

            <div className="relative">
              {!currentScenario.card && <img src={currentScenario.img} className="size-70" />}
              {currentScenario.card && (
                <>
                  <img
                    src={currentScenario.img}
                    className="size-70 left-1/2 -translate-x-1/2 top-10 absolute"
                  />
                  <img src="/yaan/card.png" className="w-70 inset-0" />
                </>
              )}
              <AnimatePresence>
                {showChoice && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 flex flex-col items-center justify-center"
                  >
                    {currentScenario.choices.map((choice, index) => {
                      const isOneRow = currentScenario.choicesRow[index] === 1

                      return (
                        <div
                          key={index}
                          onClick={() => {
                            if (scenarioIdx < scenario.length - 1) {
                              setTypedLength(0)
                              setScenarioIdx((prev) => prev + 1)
                            } else {
                              setFinish(true)
                            }
                          }}
                          className={`relative cursor-pointer transition-transform hover:scale-105 flex items-center justify-center text-center whitespace-pre-line leading-5 font-fc-quantum text-cream bg-no-repeat bg-contain bg-center ${
                            isOneRow ? "w-[370px] h-[72px]" : "w-[370px] h-[112px]"
                          }`}
                          style={{
                            backgroundImage: `url(/yaan/${isOneRow ? "1" : "2"}_row_choice.png)`,
                          }}
                        >
                          <span className="">{choice}</span>
                        </div>
                      )
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="relative w-91 h-80 mt-12">
              <p className="absolute whitespace-break-spaces z-10 w-full h-full py-4 px-4 text-brownie-dark font-fc-quantum text-[18px]">
                {displayedText}
                {displayedText.length < currentScenario.text.length && (
                  <span className="animate-pulse">|</span>
                )}
              </p>

              <img src="/yaan/paper.png" className="absolute" />
            </div>
          </motion.section>
        ) : (
          <motion.section
            key="finish"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="flex w-full flex-col items-center bg-white min-h-screen"
          >
            <div className="text-black flex items-center gap-2 mb-6">
              <MapPin />
              <div className="font-sov-yeehor mb-5 text-[48px]">???</div>
            </div>

            <img src="/yaan/bro.png" className="w-90" />

            <div className="relative w-91 h-40">
              <p className="absolute whitespace-break-spaces z-10 w-full h-full py-4 px-4 text-brownie-dark font-fc-quantum text-[18px]">
                ...เป็นการตัดสินใจที่น่าสนใจ{"\n"}
                ข้อมูลทั้งหมดถูกส่งให้กัปตันแล้ว{"\n"}
                เตรียมรับฟังคำตัดสิน!
              </p>

              <img src="/yaan/paper_2.png" className="absolute" />
            </div>
            <YaanAcceptButton
              onClick={() => {
                mutate(
                  { yarnAccepted: true },
                  {
                    onSuccess: () => {
                      setYarnAccepted(true)
                      queryClient.invalidateQueries({ queryKey: ["me"] })
                    },
                  }
                )
              }}
              text={isPending ? "รอสักครู่..." : "ยานของเราคือ..."}
              className="mt-8 mb-10 animate-bounce"
            />
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  )
}
