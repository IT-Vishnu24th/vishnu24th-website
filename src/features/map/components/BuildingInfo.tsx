import Image from "next/image"
type Club = {
  id: number
  name: string
}

type BuildingInfoProps = {
  buildingName: string
  clubs: Club[]
}

export default function BuildingInfo({ buildingName, clubs }: BuildingInfoProps) {
  return (
    <div className="-mt-7">
      {/* Building Title */}
      <div className="relative w-full h-8 overflow-hidden">
        <Image
          src="/map/orange-line.png"
          alt=""
          fill
          className="object-fill scale-102 translate-y-2"
        />
      </div>
      <div className="bg-brick-orange">
        <h2 className="text-center font-sov-yeehor text-5xl font-serif mb-5">{buildingName}</h2>
        {/* Building Map Placeholder */}
        <div className="mx-4 my-3 rounded-2xl bg-gray-200 min-h-[200px] flex items-center justify-center ">
          {/* ใส่รูปแผนที่อาคารที่นี่ */}
          {/* <Image src={`/maps/${buildingId}.png`} alt={buildingName} width={400} height={200} className="w-full rounded-2xl" /> */}
          <span className="text-gray-400 text-sm">แผนที่อาคาร {buildingName}</span>
        </div>

        {/* Legend */}
        <div className="mx-4 mt-2 flex flex-col gap-2 rounded-xl bg-white p-3 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded bg-red-300 flex items-center justify-center text-red-600 text-xs font-bold">
              +
            </span>
            <span>เต็นท์พยาบาล</span>
          </div>
        </div>

        {/* Club List */}
        <div className="mt-5 ">
          <div className="relative w-full h-8 overflow-hidden">
            <Image
              src="/map/brick-line.png"
              alt=""
              fill
              className="object-fill scale-102 translate-y-2 z-index-20"
            />
          </div>
          <div className="px-4 bg-brownie-light pb-13">
            <h3 className="text-center font-sov-yeehor text-4xl mb-4">หมายเลขชมรม</h3>
            {clubs.length === 0 ? (
              <p className="text-center text-sm text-gray-400">ไม่มีชมรมในอาคารนี้</p>
            ) : (
              <div className="flex flex-col gap-3">
                {clubs.map((club) => (
                  <div key={club.id} className="flex items-center gap-3">
                    <span className="text-cream-tanned w-4 text-sm">{club.id}</span>
                    <div className="w-9 h-9 rounded-full bg-gray-400 flex-shrink-0" />
                    <span className="text-base">{club.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
