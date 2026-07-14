"use client"

import { useEffect, useState } from "react"
import { LoginButton } from "@/features/auth/components/LoginButton"
import { LanguageChangerButton } from "@/features/i18n/components/LanguageChangerButton"
import { UserInfoButton } from "@/features/auth/components/UserInfoButton"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

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

export const Header2 = ({ url, title }: { url: string; title: string }) => {
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
      <Link
        href={url}
        className="bg-midnight hover:bg-neutral-800 border-3 border-midnight-light text-white rounded-4xl px-3 py-2 flex items-center gap-2 transition"
      >
        <ArrowLeft size={20} color="turquoise" strokeWidth={2.5} />
        <span className="text-md text-turqoise font-fc-quantum mb-1">{title}</span>
      </Link>
      <div className="flex items-center gap-2">
        {!loading && (isLoggedIn ? <UserInfoButton /> : <LoginButton />)}
      </div>
    </div>
  )
}
