"use client"

import { MapPin } from "lucide-react"
import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { QuestionaireTitleScreen } from "./QuestionaireTitleScreen"
import { YaanAcceptButton } from "./YaanAcceptButton"
import { useUpdateMe } from "@/hooks/useApi"
import { useQueryClient } from "@tanstack/react-query"
import { scenario } from "../const/scenario"

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
            className="relative overflow-x-hidden"
          >
            <div className="flex w-full flex-col items-center bg-white min-h-screen">
              <div className="text-black flex items-center gap-2 mb-6 z-30">
                <MapPin />
                <div className="font-sov-yeehor mb-5 text-[48px]">{currentScenario.location}</div>
              </div>

              <div className="relative z-30">
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
                      className="absolute inset-0 flex flex-col items-center justify-center z-30"
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
                              isOneRow ? "w-92.5 h-18" : "w-92.5 h-28"
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

              <div className="relative w-91 h-80 mt-12 z-30">
                <p className="absolute whitespace-break-spaces z-10 w-full h-full py-4 px-4 text-brownie-dark font-fc-quantum text-[18px]">
                  {displayedText}
                  {displayedText.length < currentScenario.text.length && (
                    <span className="animate-pulse">|</span>
                  )}
                </p>

                <img src="/yaan/paper.png" className="absolute" />
              </div>
            </div>
            <img src="/yaan/game_bg.png" className="top-0 absolute inset-0 w-full h-full" />
          </motion.section>
        ) : (
          <motion.section
            key="finish"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="relative overflow-x-hidden"
          >
            <div className="flex w-full flex-col items-center bg-white min-h-screen">
              <div className="text-black flex items-center gap-2 mb-6 z-30">
                <MapPin />
                <div className="font-sov-yeehor mb-5 text-[48px]">???</div>
              </div>

              <img src="/yaan/bro.png" className="w-90 z-30" />

              <div className="relative w-91 h-40 z-30">
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
                className="mt-8 mb-10 animate-bounce z-30"
              />
            </div>
            <img src="/yaan/game_bg.png" className="top-0 absolute inset-0 w-full h-full" />
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  )
}
