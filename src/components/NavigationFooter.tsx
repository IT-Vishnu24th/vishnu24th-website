"use client"

import { Home, Compass, Ship, Gamepad2, UserRoundKey } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import { useRef, useState } from "react"
import Image from "next/image"
import useAuth from "@/hooks/useAuth"

export default function FooterNavigation() {
  const router = useRouter()
  const pathname = usePathname()
  const { user } = useAuth()

  const [holdItem, setHoldItem] = useState<string | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const isLongPress = useRef(false)

  const isLoggedIn = !!user
  const isAdmin = user?.role === "admin"

  const menus = [
    { name: "Home", icon: Home, path: "/", requiresAuth: false },
    { name: "Explore", icon: Compass, path: "/explore", requiresAuth: false },
    { name: "Ranking", icon: Ship, path: "/ranking", requiresAuth: true },
    { name: "Game", icon: Gamepad2, path: "/game", requiresAuth: true },
    ...(isAdmin ? [{ name: "Admin", icon: UserRoundKey, path: "/admin", requiresAuth: true }] : []),
  ]

  // กดค้างเริ่มแสดง text
  const handlePressStart = (item: (typeof menus)[0]) => {
    if (item.requiresAuth && !isLoggedIn) return

    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    isLongPress.current = false

    timerRef.current = setTimeout(() => {
      isLongPress.current = true
      setHoldItem(item.name)
    }, 400)
  }

  // ยกเลิกการกด (ลากออกนอกปุ่ม)
  const handlePressCancel = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    setHoldItem(null)
    isLongPress.current = false
  }

  // ปล่อยมือ
  const handlePressEnd = (item: (typeof menus)[0]) => {
    if (item.requiresAuth && !isLoggedIn) return

    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    setHoldItem(null)

    // ถ้าไม่ได้กดค้าง → ถือว่า click ปกติ
    if (!isLongPress.current) {
      router.push(item.path)
    }

    isLongPress.current = false
  }

  return (
    <footer className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[825px] z-50 h-40">
      <Image
        src="/navbar/navbar.svg"
        alt="navbar"
        fill
        className="object-fill scale-103 translate-y-2"
      />

      <div className="absolute bottom-0 left-0 w-full flex justify-between px-2 pb-4 pt-1.5 bg-[#2D3542]">
        {menus.map((item) => {
          const Icon = item.icon
          const selected = pathname === item.path
          const showHold = holdItem === item.name
          const disabled = item.requiresAuth && !isLoggedIn

          return (
            <button
              key={item.name}
              disabled={disabled}
              className={`relative flex flex-col items-center w-full ${
                disabled ? "opacity-40 cursor-not-allowed" : ""
              }`}
              onMouseDown={() => handlePressStart(item)}
              onMouseUp={() => handlePressEnd(item)}
              onMouseLeave={handlePressCancel}
              onTouchStart={() => handlePressStart(item)}
              onTouchEnd={() => handlePressEnd(item)}
              onTouchCancel={handlePressCancel}
            >
              {/* HOLD TEXT */}
              {showHold && (
                <span
                  className="
                    absolute -top-15
                    bg-[#2D3542] text-[#74DDCF] font-bold
                    text-md px-3 py-3
                    rounded-[10px]
                    shadow
                  "
                >
                  {item.name}
                </span>
              )}

              {/* ICON */}
              <div
                className={`px-4 py-2 rounded-full ${
                  selected ? "bg-[#74DDCF] text-black" : "text-[#74DDCF]"
                }`}
              >
                <Icon className="w-7 h-7" />
              </div>
            </button>
          )
        })}
      </div>
    </footer>
  )
}
