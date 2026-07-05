"use client"

import { useEffect, useState } from "react"
import { UserRound } from "lucide-react"

import { UserInfoModal } from "@/features/userInfo/components/UserInfoModal"
import { modalStore } from "@/stores/modalStore"
import useAuth from "@/hooks/useAuth"
import type { User } from "@/types/user"

export const UserInfoButton = () => {
  const { user: auth } = useAuth()

  const [profile, setProfile] = useState<User | null>(null)

  // fetch user profile (ข้อมูลเต็ม)
  useEffect(() => {
    let cancelled = false
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/users/me")
        if (!res.ok) return
        const data = await res.json()
        if (!cancelled) setProfile(data.data)
      } catch (err) {
        console.error("Failed to fetch profile:", err)
      }
    }
    fetchProfile()
    return () => {
      cancelled = true
    }
  }, [])

  const lang = profile?.prefLanguage ?? auth?.prefLanguage ?? "th"
  const name = profile?.name?.[lang]

  const displayName = (() => {
    if (!name) return "ข้อมูล"

    const base = name.nickname || name.firstName

    if (auth?.role === "participant") {
      return `น้อง ${base}`
    }

    return base
  })()

  return (
    <button
      type="button"
      onClick={() => modalStore.open(<UserInfoModal />)}
      className="flex items-center gap-2 rounded-4xl bg-midnight border-3 border-midnight-light px-3 py-2 text-white transition hover:bg-neutral-800"
    >
      <UserRound size={20} color="turquoise" strokeWidth={2.5} />

      <span className="text-md font-kanit text-turqoise">{displayName}</span>
    </button>
  )
}
