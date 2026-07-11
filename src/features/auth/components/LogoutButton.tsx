"use client"

import useAuth from "@/hooks/useAuth"
import { modalStore } from "@/stores/modalStore"
import { useQueryClient } from "@tanstack/react-query"
import { CircleArrowLeft } from "lucide-react"

export const LogoutButton = () => {
  const { signOut } = useAuth()
  const queryClient = useQueryClient()
  return (
    <button
      onClick={() => {
        signOut()
        modalStore.close()
        queryClient.invalidateQueries({ queryKey: ["me"] })
      }}
      className="bg-status-red-dark hover:bg-status-red hover:text-white hover:border-white transition duration-300 border-2 border-status-red text-status-red gap-1.5 flex items-center p-2.5 rounded-full"
    >
      <CircleArrowLeft />
      <p className="font-fc-quantum leading-[10.4px] text-[16px] pb-1">ออกจากระบบ</p>
    </button>
  )
}
