import Image from "next/image"
import { club_data } from "@/features/clubs/const/club-data"

type BuildingInfoProps = {
  buildingName: string
}

export default function BuildingInfo({ buildingName }: BuildingInfoProps) {
  return (
    <div className="-mt-7">
      <div className="relative h-8 w-full overflow-hidden">
        <Image
          src="/map/orange-line.png"
          alt=""
          fill
          className="object-fill scale-102 translate-y-2"
        />
      </div>

      <div className="-mt-1 bg-brick-orange">
        <div className="flex flex-col items-center pt-3">
          <h2 className="font-sov-yeehor text-6xl">{buildingName}</h2>

          <h3 className="mt-2 mb-4 text-center font-fc-quantum text-sm text-clay-light">
            ผังบูธชมรมและจุดพยาบาล
            <br />
            เฉพาะวัน Intania First Date
          </h3>
        </div>

        <div className="mx-4 my-3 overflow-hidden rounded-2xl border-2 border-brownie">
          <Image
            src="/map/larngear-map.svg"
            alt="ลานเกียร์"
            width={800}
            height={500}
            className="w-full rounded-2xl"
          />
        </div>

        <div className="mt-5">
          <div className="relative h-8 w-full overflow-hidden">
            <Image
              src="/map/brick-line.png"
              alt=""
              fill
              className="object-fill scale-102 translate-y-2"
            />
          </div>

          <div className="-mt-1 bg-brownie-light px-4 pb-13">
            <h3 className="mb-4 text-center font-sov-yeehor text-4xl">หมายเลขชมรม</h3>

            <div className="flex flex-col gap-3">
              {club_data
                .filter((club) => Number(club.id) <= 23)
                .map((club) => {
                  const hasImage = club.imageUrl && club.imageUrl !== "you check by your own"

                  return (
                    <div
                      key={club.id}
                      className="mx-2 flex items-center gap-3 rounded-2xl bg-brownie pr-4"
                    >
                      <div className="flex items-center gap-2 rounded-full bg-brownie-dark py-1 pl-1 pr-3">
                        <div
                          className="h-9 w-9 shrink-0 overflow-hidden rounded-full bg-gray-400"
                          aria-hidden="true"
                        >
                          {hasImage && (
                            <Image
                              src={`/club/clublogo/${club.imageUrl}`}
                              alt={club.name.th}
                              width={36}
                              height={36}
                              className="h-full w-full rounded-full object-cover"
                            />
                          )}
                        </div>

                        <span className="px-1 font-sov-yeehor text-3xl leading-none -translate-y-1.5 text-cream-tanned">
                          {club.id}
                        </span>
                      </div>

                      <span className="truncate text-cream-tanned">{club.name.th}</span>
                    </div>
                  )
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
