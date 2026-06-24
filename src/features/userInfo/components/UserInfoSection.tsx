import type { User } from "@/types/user"
import { Fragment } from "react"
import { mockRows } from "../const/mock"

type UserInfoSectionProps = {
  user: User
}

export const UserInfoSection = ({ user }: UserInfoSectionProps) => {
  return (
    <section className="mt-11.75 w-full pb-8">
      <div className="text-center">
        <p className="font-serif text-[25px] leading-none tracking-[-0.03em]">รหัสนิสิต</p>
        <p className="mt-1 text-[19px] leading-none">{user.id}</p>

        <p className="mt-4.75 font-serif text-[25px] leading-none tracking-[-0.03em]">ภาควิชา</p>
        <p className="mt-1 text-[19px] leading-none">{user.departmentTh}</p>
      </div>

      <div className="mx-3 mt-12.25 rounded-[11px] bg-[#e9e9e9] px-6.25 pb-5.25 pt-5.5">
        <dl className="grid grid-cols-2 gap-x-9 gap-y-5 text-[17px] leading-[1.2]">
          {mockRows.map((row, index) => (
            <Fragment key={row.map((item) => item.label).join("-")}>
              {(index === 2 || index === 4) && <div className="col-span-2 h-px bg-white" />}
              {row.map((item) => (
                <div key={item.label} className="min-w-0">
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </Fragment>
          ))}
        </dl>
      </div>
    </section>
  )
}
