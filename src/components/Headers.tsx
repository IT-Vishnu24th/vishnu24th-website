"use client"

import { useEffect, useState } from "react"
import { LoginButton } from "@/features/auth/components/LoginButton"
import { LanguageChangerButton } from "@/features/i18n/components/LanguageChangerButton"
import { UserInfoButton } from "@/features/auth/components/UserInfoButton"

export const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await fetch("/api/users/me")

        if (res.ok) {
          setIsLoggedIn(true)
        } else {
          setIsLoggedIn(false)
        }
      } catch {
        setIsLoggedIn(false)
      } finally {
        setLoading(false)
      }
    }

    checkLogin()
  }, [])

  return (
    <div className="flex justify-between items-center px-4 py-4">
      <LanguageChangerButton />

      <div className="flex items-center gap-2">
        {!loading && (isLoggedIn ? <UserInfoButton /> : <LoginButton />)}
      </div>
    </div>
  )
}
