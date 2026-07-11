"use client"

import useAuth from "@/hooks/useAuth"
import { modalStore } from "@/stores/modalStore"
import { useQueryClient } from "@tanstack/react-query"
import { CircleArrowLeft } from "lucide-react"
import { useState } from "react"

export const LogoutButton = () => {
  const { signOut, loading } = useAuth()
  const queryClient = useQueryClient()
  const [isLoading, setIsLoading] = useState(false)
  return (
    <button
      onClick={() => {
        setIsLoading(true)
        signOut()
        modalStore.close()
        queryClient.invalidateQueries({ queryKey: ["me"] })
        setIsLoading(false)
      }}
      disabled={loading || isLoading}
      className="bg-status-red-dark hover:bg-status-red hover:text-white hover:border-white transition duration-300 border-2 border-status-red text-status-red gap-1.5 flex items-center p-2.5 rounded-full"
    >
      <CircleArrowLeft />
      <p className="font-fc-quantum leading-[10.4px] text-[16px] pb-1">ออกจากระบบ</p>
    </button>
  )
}
