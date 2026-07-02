type Props = {
  rank: number | null
  vesselName: string
  score: number
}

export default function MyRank({ rank, vesselName, score }: Props) {
  return (
    <div className="mt-10 bg-gray-200 py-10">
      <h2 className="text-center text-3xl font-bold font-serif">อันดับของคุณ</h2>

      <div className="mx-auto mt-5 w-fit rounded-[24px] bg-gray-300 px-8 py-3">
        <span className="font-serif text-5xl font-black">#{rank ?? "-"}</span>
      </div>

      <p className="mt-8 break-words text-center font-serif text-3xl font-bold">ยาน{vesselName}</p>

      <p className="mt-2 text-center text-lg text-gray-600">{score.toLocaleString()} คะแนน</p>
    </div>
  )
}
