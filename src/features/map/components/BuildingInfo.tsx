import Image from "next/image"
import { clubs } from "@/features/map/const/mock"

type BuildingInfoProps = {
  buildingName: string
}

export default function BuildingInfo({ buildingName }: BuildingInfoProps) {
  return (
    <div className="-mt-7">
      <div className="relative w-full h-8 overflow-hidden">
        <Image
          src="/map/orange-line.png"
          alt=""
          fill
          className="object-fill scale-102 translate-y-2"
        />
      </div>

      <div className="bg-brick-orange -mt-1">
        <h2 className="text-center font-sov-yeehor text-6xl mb-10 pt-3">{buildingName}</h2>

        <div className="mx-4 my-3 overflow-hidden rounded-2xl border-2 border-brownie">
          <Image
            src="/map/larngear-map.svg"
            alt="ลานเกียร์"
            width={800}
            height={500}
            className="w-full rounded-2xl"
          />
          {/* TODO : add img */}
        </div>

        <div className="mt-5">
          <div className="relative w-full h-8 overflow-hidden">
            <Image
              src="/map/brick-line.png"
              alt=""
              fill
              className="object-fill scale-102 translate-y-2"
            />
          </div>

          <div className="px-4 bg-brownie-light pb-13 -mt-1">
            <h3 className="text-center font-sov-yeehor text-4xl mb-4">หมายเลขชมรม</h3>

            <div className="flex flex-col gap-3">
              {clubs.map((club) => (
                <div
                  key={club.id}
                  className="flex items-center gap-3 rounded-2xl bg-brownie mx-2 pr-4"
                >
                  {/* กล่องเข้มคลุมทั้งวงกลม + เลข */}
                  <div className="flex items-center gap-2 rounded-full bg-brownie-dark py-1 pl-1 pr-3">
                    {/* วงกลมเทา (placeholder รูปชมรม) */}
                    <div className="h-9 w-9 shrink-0 rounded-full bg-gray-400" aria-hidden="true">
                      {/* <Image
              src={`/club/${club.image}`}
              alt={club.name}
              width={36}
              height={36}
              className="rounded-full object-cover"
            /> */}
                    </div>

                    <span className="font-sov-yeehor text-3xl leading-none text-cream-tanned -translate-y-1.5 px-1">
                      {club.id}
                    </span>
                  </div>

                  <span className="truncate text-cream-tanned">{club.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
