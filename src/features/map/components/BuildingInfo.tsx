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
        <h2 className="text-center font-sov-yeehor text-5xl mb-5">{buildingName}</h2>

        <div className="mx-4 my-3 overflow-hidden rounded-2xl">
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
                <div key={club.id} className="flex items-center gap-3">
                  <span className="text-cream-tanned w-5">{club.id}</span>

                  {/* <Image
                    src={`/club/${club.image}`}
                    alt={club.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  /> */}

                  <span>{club.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
