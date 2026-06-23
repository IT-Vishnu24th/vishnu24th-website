import type { User } from "@/types/user"

type YarnSectionProps = {
  user: User
}

export const YarnSection = ({ user }: YarnSectionProps) => {
  return (
    <section className="mt-11 w-full text-center">
      <div className="font-sans text-[25px] font-semibold leading-[0.9] text-[#ff22e6]">
        <p>ยาน</p>
        <p>logo</p>
      </div>
      <h2 className="mt-2.75 font-serif text-[38px] leading-none tracking-[-0.045em]">
        {user.group.vesselNameTh}
      </h2>
    </section>
  )
}
