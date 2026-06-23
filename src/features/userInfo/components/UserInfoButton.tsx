"use client"

import { UserRound } from "lucide-react"

import { UserInfoModal } from "@/features/userInfo/components/UserInfoModal"
import { modalStore } from "@/stores/modalStore"

export const UserInfoButton = () => {
  return (
    <button
      type="button"
      onClick={() => modalStore.open(<UserInfoModal />)}
      className="flex items-center gap-2 rounded-4xl bg-black px-4 py-3 text-white transition hover:bg-neutral-800"
    >
      <UserRound size={20} />
      <span className="text-lg">ข้อมูล</span>
    </button>
  )
}
