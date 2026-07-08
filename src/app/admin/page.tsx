import { Star, Volleyball } from "lucide-react"
import Link from "next/link"

import { Header } from "@/components/Headers"
import NavigationFooter from "@/components/NavigationFooter"
import SponsorFooter from "@/components/SponsorFooter"

const adminActions = [
  {
    label: "ฟีเจอร์",
    href: "/admin/website_settings",
    icon: Star,
  },
  {
    label: "สถานะชมรม",
    href: "/admin/stage_status",
    icon: Volleyball,
  },
]

export default function AdminPage() {
  return (
    <main className="flex min-h-svh w-full justify-center bg-neutral-100">
      <div className="w-full max-w-98.25 bg-white pb-40 text-black">
        <Header />

        <section className="text-center w-full px-4 pb-9 pt-11 ">
          <h1 className="whitespace-nowrap text-7xl font-bold leading-[1.2] tracking-[0.02em]">
            แอดมิน
          </h1>
          <p className="text-[20px] font-normal leading-[1.2]">67</p>
        </section>

        <section className="flex w-full flex-col items-center justify-center gap-2.5 py-16">
          {adminActions.map((action) => {
            const Icon = action.icon

            return (
              <Link
                key={action.label}
                href={action.href}
                className="flex items-center justify-center gap-1.5 rounded-full bg-[#2c2c2c] p-3 text-[#f5f5f5] transition hover:bg-neutral-800"
              >
                <Icon aria-hidden="true" size={20} strokeWidth={2.25} />
                <span className="text-[16px] leading-[1.4]">{action.label}</span>
              </Link>
            )
          })}
        </section>

        <SponsorFooter />
        <NavigationFooter />
      </div>
    </main>
  )
}
