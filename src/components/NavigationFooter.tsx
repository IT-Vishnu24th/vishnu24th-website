"use client"

import { Home, Compass, Ship, Gamepad, ShieldCheck } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import { useRef, useState, useEffect } from "react"
import Image from "next/image"

export default function FooterNavigation() {
  const router = useRouter()
  const pathname = usePathname()

  const [holdItem, setHoldItem] = useState<string | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)

  // เช็ค role ของ user ปัจจุบัน ว่าเป็น admin ไหม
  useEffect(() => {
    let cancelled = false

    const fetchRole = async () => {
      try {
        const res = await fetch("/api/users/me")
        if (!res.ok) return

        const { data } = await res.json()
        if (!cancelled && data?.role === "admin") {
          setIsAdmin(true)
        }
      } catch (err) {
        console.error("Failed to fetch user role:", err)
      }
    }

    fetchRole()

    return () => {
      cancelled = true
    }
  }, [])

  const menus = [
    { name: "Home", icon: Home, path: "/" },
    { name: "Explore", icon: Compass, path: "/explore" },
    { name: "Ranking", icon: Ship, path: "/ranking" },
    { name: "Game", icon: Gamepad, path: "/game" },
    ...(isAdmin ? [{ name: "Admin", icon: ShieldCheck, path: "/admin" }] : []),
  ]

  // กดค้างเริ่มแสดง text
  const handlePressStart = (item: (typeof menus)[0]) => {
    timerRef.current = setTimeout(() => {
      setHoldItem(item.name)
    }, 400) // กดค้าง 0.4 วิ
  }

  //ปล่อยมือ
  const handlePressEnd = (item: (typeof menus)[0]) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    setHoldItem(null)

    // ถ้าไม่ได้กดค้าง → ถือว่า click ปกติ
    if (!holdItem) {
      router.push(item.path)
    }
  }

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 h-40">
      <Image
        src="/navbar/navbar.svg"
        alt="navbar"
        fill
        className="object-fill scale-105 translate-y-2"
      />
      <div className="absolute bottom-0 left-0 w-full flex justify-between px-5 pb-4 pt-1 bg-[#2D3542]">
        {menus.map((item) => {
          const Icon = item.icon
          const selected = pathname === item.path
          const showHold = holdItem === item.name

          return (
            <button
              key={item.name}
              className="relative flex flex-col items-center w-full"
              onMouseDown={() => handlePressStart(item)}
              onMouseUp={() => handlePressEnd(item)}
              onMouseLeave={() => handlePressEnd(item)}
              onTouchStart={() => handlePressStart(item)}
              onTouchEnd={() => handlePressEnd(item)}
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
