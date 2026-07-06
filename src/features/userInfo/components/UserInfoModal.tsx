"use client"

import * as Dialog from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import { UserProfileSection } from "@/features/userInfo/components/UserProfileSection"
import { YarnSection } from "@/features/userInfo/components/YarnSection"
import { modalStore } from "@/stores/modalStore"
import { getMockUser } from "../const/mock"
import { UserInfoSection } from "./UserInfoSection"
import { motion } from "motion/react"
import { LanguageChangerButton } from "@/features/i18n/components/LanguageChangerButton"

export const UserInfoModal = () => {
  const displayUser = getMockUser()

  return (
    <section className="fixed inset-y-0 left-1/2 z-60 min-h-svh w-full -translate-x-1/2 overflow-y-auto bg-[linear-gradient(180deg,#2D3542_0%,#2D4B5F_42.31%,rgba(147,78,67,0.8)_100%)] focus-visible:outline-none">
      <Dialog.Title className="sr-only">ข้อมูลนิสิต</Dialog.Title>
      <Dialog.Description className="sr-only">
        แสดงข้อมูลนิสิต กลุ่ม ยาน และข้อมูลส่วนตัว
      </Dialog.Description>

      <div className="flex items-center justify-between px-4.5 pt-12">
        <LanguageChangerButton />
        <button
          type="button"
          aria-label="ปิด"
          onClick={modalStore.close}
          className="grid size-11.5 cursor-pointer place-items-center rounded-full bg-midnight outline-2 outline-midnight-light text-white transition hover:bg-neutral-800"
        >
          <X aria-hidden="true" className="text-turqoise" size={22} strokeWidth={2.6} />
        </button>
      </div>

      <motion.div
        key={modalStore.isOpen() ? "open" : "closed"}
        initial={{ y: 18, opacity: 0 }}
        animate={{ y: [18, 62, 62], opacity: [0, 1, 1] }}
      >
        <UserProfileSection user={displayUser} />
        <YarnSection user={displayUser} />
        <UserInfoSection user={displayUser} />
      </motion.div>
    </section>
  )
}
