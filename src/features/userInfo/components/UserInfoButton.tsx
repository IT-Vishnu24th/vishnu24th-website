"use client"

import { UserRound } from "lucide-react"

import { UserInfoModal } from "@/features/userInfo/components/UserInfoModal"
import { modalStore } from "@/stores/modalStore"
import useAuth from "@/hooks/useAuth"

export const UserInfoButton = () => {
  const { user } = useAuth()

  const name = user ? user.name[user.prefLanguage] : null

  return (
    <button
      type="button"
      onClick={() => modalStore.open(<UserInfoModal />)}
      className="flex items-center gap-2 rounded-4xl bg-midnight border-3 border-midnight-light px-3 py-2 text-white transition hover:bg-neutral-800"
    >
      <UserRound size={20} color="turquoise" strokeWidth={2.5} />

      <span className="text-md font-kanit text-turqoise">
        {user?.role === "participant" ? "น้อง" : ""}
        {name?.nickname || name?.firstName || "ข้อมูล"}
      </span>
    </button>
  )
}
