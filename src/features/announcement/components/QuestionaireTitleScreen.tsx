import { motion } from "motion/react"

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
      className="flex w-full min-h-screen flex-col text-black items-center cursor-pointer"
    >
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
          className="relative z-20 text-[#3F566E]"
        >
          <div className="flex h-15">
            <p className="text-[64px] tracking-[1.28px]">เหตุการณ์</p>
            <p className="text-[80px] leading-20 tracking-[1.6px]">ชี้ชะตา</p>
          </div>

          <div className="flex">
            <p className="text-[80px] leading-20 tracking-[1.6px]">คัดสรร</p>
            <p className="text-[64px] tracking-[1.28px]">อนาคต</p>
          </div>
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
            className="absolute inset-0 z-10 text-[#7EF4EC] pointer-events-none"
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
            <div className="flex h-15">
              <p className="text-[64px] tracking-[1.28px]">เหตุการณ์</p>
              <p className="text-[80px] leading-20 tracking-[1.6px]">ชี้ชะตา</p>
            </div>

            <div className="flex">
              <p className="text-[80px] leading-20 tracking-[1.6px]">คัดสรร</p>
              <p className="text-[64px] tracking-[1.28px]">อนาคต</p>
            </div>
          </motion.div>
        ))}

        {/* ===== White Glitch ===== */}
        {["inset(8% 0 70% 0)", "inset(28% 0 46% 0)", "inset(48% 0 26% 0)", "inset(70% 0 8% 0)"].map(
          (clip, i) => (
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
              <div className="flex h-15">
                <p className="text-[64px] tracking-[1.28px]">เหตุการณ์</p>
                <p className="text-[80px] leading-20 tracking-[1.6px]">ชี้ชะตา</p>
              </div>

              <div className="flex">
                <p className="text-[80px] leading-20 tracking-[1.6px]">คัดสรร</p>
                <p className="text-[64px] tracking-[1.28px]">อนาคต</p>
              </div>
            </motion.div>
          )
        )}
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
        className="flex flex-col items-center text-[16px] font-fc-quantum mt-65 tracking-[0.64px]"
      >
        <p>แตะหน้าจอ</p>
        <p>เพื่อเริ่มการคัดสรร</p>
      </motion.div>
    </motion.section>
  )
}
