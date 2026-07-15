"use client"

import { motion } from "motion/react"
import { LineSection } from "./LineSection"
import { YarnHeroSection } from "./YarnHeroSection"
import { useMe } from "@/hooks/useApi"

export const YarnSection = () => {
  const { data, isLoading } = useMe()
  const yaan = data?.data.group.vesselName?.en
  return (
    <div className="w-full bg-white min-h-screen flex flex-col justify-between">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <YarnHeroSection yarnName={data?.data.group.vesselName?.th} />
      </motion.div>

      <motion.div
        className="w-full pt-20 flex flex-col items-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
      >
        {isLoading ? (
          <div></div>
        ) : (
          <motion.img
            className="w-67.75"
            src={`/yaan_banner/${yaan?.replaceAll(" ", "_")}.jpg`}
            alt=""
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 0.5,
              duration: 0.6,
              ease: "backOut",
            }}
          />
        )}

        <motion.div
          className="text-turqoise font-[20px] mt-2 font-fc-quantum"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          ขอให้โชคดีกับการล่าสมบัติ
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <LineSection />
      </motion.div>
    </div>
  )
}
