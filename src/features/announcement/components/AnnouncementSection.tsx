"use client"

import AuthResult from "@/features/auth/components/AuthResult"
import useAuth from "@/hooks/useAuth"
import { useState } from "react"

export const AnnouncementSection = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useAuth()
  return (
    <>
      {!isOpen ? (
        <AuthResult isSuccess={user !== null} />
      ) : (
        <section className="flex w-full flex-col items-center"></section>
      )}
    </>
  )
}
