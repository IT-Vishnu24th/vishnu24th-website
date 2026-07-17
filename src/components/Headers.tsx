"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { LoginButton } from "@/features/auth/components/LoginButton"
import { UserInfoButton } from "@/features/auth/components/UserInfoButton"
import { LanguageChangerButton } from "@/features/i18n/components/LanguageChangerButton"

export const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await fetch("/api/users/me")
        setIsLoggedIn(res.ok)
      } catch {
        setIsLoggedIn(false)
      } finally {
        setLoading(false)
      }
    }

    checkLogin()
  }, [])

  return (
    <header className="relative h-[75px] w-full overflow-hidden">
      {/* Decorative Background */}
      <Image
        src="/game/sustain-header.png"
        alt=""
        fill
        priority
        className="object-cover object-top pointer-events-none select-none"
      />

      {/* Header Content */}
      <div className="relative z-10 flex h-full items-start justify-between px-4 pt-4">
        <LanguageChangerButton />

        <div className="flex items-center gap-2">
          {!loading && (isLoggedIn ? <UserInfoButton /> : <LoginButton />)}
        </div>
      </div>
    </header>
  )
}

export const Header2 = ({ url, title }: { url: string; title: string }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await fetch("/api/users/me")
        setIsLoggedIn(res.ok)
      } catch {
        setIsLoggedIn(false)
      } finally {
        setLoading(false)
      }
    }

    checkLogin()
  }, [])

  return (
    <header className="relative h-[90px] w-full overflow-hidden">
      {/* Decorative Background */}
      <Image
        src="/game/sustain-header.png"
        alt=""
        fill
        priority
        className="object-cover object-top pointer-events-none select-none"
      />

      {/* Header Content */}
      <div className="relative z-10 flex h-full items-start justify-between px-4 pt-4">
        <Link
          href={url}
          className="flex items-center gap-2 rounded-full border-2 border-midnight-light bg-midnight px-3 py-2 text-white transition hover:bg-neutral-800"
        >
          <ArrowLeft size={20} color="turquoise" strokeWidth={2.5} />
          <span className="font-kanit text-md text-turqoise">{title}</span>
        </Link>

        <div className="flex items-center gap-2">
          {!loading && (isLoggedIn ? <UserInfoButton /> : <LoginButton />)}
        </div>
      </div>
    </header>
  )
}
