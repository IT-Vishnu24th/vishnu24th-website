"use client"

import { Home, Compass, Rocket, Dices } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import { useRef, useState } from "react"

export default function FooterNavigation() {
  const router = useRouter()
  const pathname = usePathname()

  const [holdItem, setHoldItem] = useState<string | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const menus = [
    { name: "Home", icon: Home, path: "/" },
    { name: "Explore", icon: Compass, path: "/explore" },
    { name: "Ranking", icon: Rocket, path: "/ranking" },
    { name: "Game", icon: Dices, path: "/game" },
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
      <svg
        viewBox="0 0 100 28"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 w-full h-full"
      >
        <path d="M0,12 Q50,20 100,12 L100,28 L0,28 Z" fill="rgba(0,0,0,0.9)" />
      </svg>
      <div className="absolute bottom-0 left-0 w-full flex justify-between px-15 pb-4">
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
                  bg-black text-white font-bold
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
                  selected ? "bg-white text-black" : "text-white"
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
