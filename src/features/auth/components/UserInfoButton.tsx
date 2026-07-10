"use client"

import { UserInfoModal } from "@/features/auth/components/UserInfoModal"
import { modalStore } from "@/stores/modalStore"
import useAuth from "@/hooks/useAuth"
import { LoginButton } from "./LoginButton"

export const UserInfoButton = () => {
  const { user, loading } = useAuth()
  const name = user ? user.name[user.prefLanguage] : null

  if (!user || loading) return <LoginButton />

  return (
    <button
      type="button"
      onClick={() => modalStore.open(<UserInfoModal />)}
      className="relative flex items-center gap-2 rounded-4xl bg-midnight border-3 border-midnight-light px-3 py-2 text-white transition hover:bg-neutral-800"
    >
      <span className="text-md font-kanit text-turqoise pr-9">
        {user?.role === "participant" ? "น้อง" : ""}
        {name?.nickname || name?.firstName || "ข้อมูล"}
      </span>
      <img
        src={`/auth/profile/profile_${(Number(user?.id) || 0) % 3}.png`}
        className="absolute size-10 rounded-full object-cover right-0"
      />
    </button>
  )
}
