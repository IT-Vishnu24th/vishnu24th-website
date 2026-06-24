"use client"

import * as Dialog from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import { UserInfoSection } from "@/features/userInfo/components/UserInfoSection"
import { UserProfileSection } from "@/features/userInfo/components/UserProfileSection"
import { YarnSection } from "@/features/userInfo/components/YarnSection"
import { modalStore } from "@/stores/modalStore"
import { getMockUser } from "../const/mock"

export const UserInfoModal = () => {
  const displayUser = getMockUser()

  return (
    <section className="fixed inset-y-0 left-1/2 z-60 min-h-svh w-full max-w-98.25 -translate-x-1/2 overflow-y-auto bg-white text-black focus-visible:outline-none">
      <Dialog.Title className="sr-only">ข้อมูลนิสิต</Dialog.Title>
      <Dialog.Description className="sr-only">
        แสดงข้อมูลนิสิต กลุ่ม ยาน และข้อมูลส่วนตัว
      </Dialog.Description>

      <div className="flex items-center justify-between px-4.5 pt-12">
        <div></div>
        <button
          type="button"
          aria-label="ปิด"
          onClick={modalStore.close}
          className="grid size-11.5 cursor-pointer place-items-center rounded-full bg-[#2d2d2d] text-white transition hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          <X aria-hidden="true" size={25} strokeWidth={2.2} />
        </button>
      </div>

      <UserProfileSection user={displayUser} />
      <YarnSection user={displayUser} />
      <UserInfoSection user={displayUser} />
    </section>
  )
}
