import { motion } from "motion/react"

const QuestionaireTitle = () => {
  return (
    <div className="relative">
      <div className="flex h-15 z-30 relative">
        <p className="text-[64px] tracking-[1.28px]">เหตุการณ์</p>
        <p className="text-[80px] leading-20 tracking-[1.6px] text-turqoise-light">ชี้ชะตา</p>
      </div>

      <div className="flex z-30 relative">
        <p className="text-[80px] leading-20 tracking-[1.6px] text-turqoise-light">คัดสรร</p>
        <p className="text-[64px] tracking-[1.28px]">อนาคต</p>
      </div>

      <img
        src="/yaan/hand_reaching.png"
        className="absolute -top-15 left-1/2 -translate-x-1/2 -z-10 w-125 max-w-none"
      />
    </div>
  )
}

export const QuestionaireTitleScreen = ({
  playGlitch,
  setPlayGlitch,
  setStart,
}: {
  playGlitch: boolean
  setPlayGlitch: (e: boolean) => void
  setStart: (e: boolean) => void
}) => {
  return (
    <motion.section
      key="start"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onClick={() => {
        if (playGlitch) return

        setPlayGlitch(true)

        setTimeout(() => {
          setStart(true)
        }, 350)
      }}
      className="cursor-pointer relative"
    >
      <div className="flex w-full min-h-screen flex-col text-black items-center z-20">
        {" "}
        <div className="relative mt-32 font-sov-yeehor select-none">
          {/* ===== Base Title ===== */}
          <motion.div
            animate={
              playGlitch
                ? {
                    x: [0, 2, -2, 1, 0],
                  }
                : {}
            }
            transition={{ duration: 0.35 }}
            className="relative z-20 text-midnight"
          >
            <QuestionaireTitle />
          </motion.div>

          {/* ===== Cyan Glitch ===== */}
          {[
            "inset(0 0 82% 0)",
            "inset(18% 0 58% 0)",
            "inset(38% 0 36% 0)",
            "inset(58% 0 18% 0)",
            "inset(82% 0 0 0)",
          ].map((clip, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 z-10 text-turqoise pointer-events-none"
              style={{ clipPath: clip }}
              animate={
                playGlitch
                  ? {
                      opacity: [0, 1, 1, 0],
                      x: [0, -10, 8, -6, 3, 0],
                      y: [0, 1, -1, 0],
                    }
                  : { opacity: 0 }
              }
              transition={{
                duration: 0.32,
                delay: i * 0.025,
              }}
            >
              <QuestionaireTitle />
            </motion.div>
          ))}

          {/* ===== White Glitch ===== */}
          {[
            "inset(8% 0 70% 0)",
            "inset(28% 0 46% 0)",
            "inset(48% 0 26% 0)",
            "inset(70% 0 8% 0)",
          ].map((clip, i) => (
            <motion.div
              key={`w${i}`}
              className="absolute inset-0 z-0 text-white pointer-events-none"
              style={{ clipPath: clip }}
              animate={
                playGlitch
                  ? {
                      opacity: [0, 0.9, 0.7, 0],
                      x: [0, 8, -12, 6, -3, 0],
                      y: [0, -1, 1, 0],
                    }
                  : { opacity: 0 }
              }
              transition={{
                duration: 0.32,
                delay: i * 0.03,
              }}
            >
              <QuestionaireTitle />
            </motion.div>
          ))}
        </div>
        <motion.div
          animate={
            playGlitch
              ? {
                  opacity: [1, 0.2, 1, 0],
                  x: [0, 4, -4, 0],
                }
              : {}
          }
          transition={{
            duration: 0.35,
          }}
          className="flex flex-col items-center text-[16px] z-20 font-fc-quantum mt-65 tracking-[0.64px]"
        >
          <p>แตะหน้าจอ</p>
          <p>เพื่อเริ่มการคัดสรร</p>
        </motion.div>
      </div>
      <img src="/yaan/opening_bg.png" className="absolute top-0 w-full h-full" />
    </motion.section>
  )
}
