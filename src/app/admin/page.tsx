import { Calendar, Star, Volleyball } from "lucide-react"
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
    label: "อีเวนต์",
    href: "/admin/stage_status",
    icon: Calendar,
  },
]

const links = [
  {
    text: "Gantt Chart IT",
    link: "https://docs.google.com/spreadsheets/d/1d5W86pZRiK0aHRkIR2TRdyH9tfoNTC2cqLZlxXNHZxU/edit?usp=sharing",
  },
  {
    text: "Product & Sprint Backlogs",
    link: "https://docs.google.com/spreadsheets/d/1Yzfl57qETy20nbTvFFV6-ths4SODgRibz2dWqhp0gg0/edit?usp=sharing",
  },
  {
    text: "Requirements Form & Brief Template",
    link: "https://docs.google.com/document/d/1PAXkv1oRDxqcsQAqgbiTG_VBPul0I7jQUdvd-oa3cLk/edit?usp=sharing",
  },
  {
    text: "Development Guideline",
    link: "https://docs.google.com/document/d/1R1AIP3XXb6voYg-EbDRXG3PY3WQPI3KKDJ3UM69Xsi0/edit?usp=sharing",
  },
  {
    text: "Figma",
    link: "https://www.figma.com/design/7b6WTRmtYPCZBvW88t4cJD/Vishnu-25th?node-id=0-1&t=Kmv377oCuxZjSdGp-1",
  },
  {
    text: "GitHub Repository",
    link: "https://github.com/IT-Vishnu24th/vishnu24th-website.git",
  },
  {
    text: "IT วาระประชุมสามัญ",
    link: "https://docs.google.com/document/d/1yJ8oIFYWfEojhx00_bJb_F8In0eMbqFq3i7uTAXdcJc/edit?usp=sharing",
  },
]

export default function AdminPage() {
  return (
    <div className="w-full overflow-x-hidden text-black">
      <section className="w-full bg-[linear-gradient(180deg,#2D3542_38.94%,#2D4B5F_100%)] text-black">
        <Header />
        <div className="px-4 pb-8 flex w-full flex-col items-center justify-center gap-5 text-center">
          <h1 className="whitespace-nowrap text-[96px] font-sov-yeehor font-normal leading-none letter-spacing-[1.92px] text-turqoise-cream">
            แอดมิน
          </h1>
          <p className="max-w-75 text-[20px] font-normal font-fc-quantum leading-none text-turqoise">
            สู้ๆ 6767 นะ
          </p>
        </div>
        <div className="w-full relative h-3 [@media(min-width:480px)]:h-5">
          <img src="/explore/dark_blue_curve.svg" alt="" className="w-full absolute z-10" />
          <img src="/explore/blue_curve.svg" alt="" className="w-full absolute z-20" />
        </div>
      </section>

      <section className="flex w-full flex-col justify-center items-center gap-2.5 py-25 pt-35 bg-midnight">
        <div className="flex gap-2.5 mb-5">
          {adminActions.map((action) => {
            const Icon = action.icon

            return (
              <Link
                key={action.label}
                href={action.href}
                className="flex items-center font-fc-quantum justify-center gap-1.5 rounded-full p-3 transition hover:border-turqoise bg-midnight border-2 text-turqoise border-midnight-light"
              >
                <Icon aria-hidden="true" size={20} strokeWidth={2.25} />
                <span className="text-[16px] leading-[1.4]">{action.label}</span>
              </Link>
            )
          })}
        </div>
        <div>
          {links.map((e, index) => (
            <Link href={e.link} key={e.text} target="_blank">
              <div className="whitespace-normal text-turqoise text-[20px] font-fc-quantum flex gap-1">
                {index + 1}.<p className="underline whitespace-normal">{e.text}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <SponsorFooter />
      <NavigationFooter />
    </div>
  )
}
