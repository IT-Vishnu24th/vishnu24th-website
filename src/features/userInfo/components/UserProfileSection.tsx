import type { User } from "@/types/user"
import Image from "next/image"

type UserProfileSectionProps = {
  user: User
}

export const UserProfileSection = ({ user }: UserProfileSectionProps) => {
  const { title, firstName, surname, nickname } = user.name.th

  return (
    <section className="flex w-full flex-col items-center px-7 pt-25 text-center">
      <div className="size-25.75 rounded-full bg-white object-cover" />

      <h1 className="mt-7.25 font-serif text-[48px] leading-[0.9] tracking-[-0.04em] text-mint">
        น้อง{nickname}
      </h1>
      <p className="mt-2 text-[25px] leading-none tracking-[-0.03em] text-turqoise">{`${firstName} ${surname}`}</p>
    </section>
  )
}
