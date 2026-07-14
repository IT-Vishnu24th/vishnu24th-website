"use client"

interface TimerProps {
  timeLeft: number
}

export default function Timer({ timeLeft }: TimerProps) {
  const progress = (timeLeft / 30) * 100

  let color = "bg-green-500"

  if (timeLeft <= 20) {
    color = "bg-yellow-500"
  }

  if (timeLeft <= 10) {
    color = "bg-red-500"
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-600">Time Remaining</span>

        <span className="text-2xl font-bold">{timeLeft}s</span>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-gray-200">
        <div
          className={`h-full transition-all duration-300 ${color}`}
          style={{
            width: `${progress}%`,
          }}
        />
      </div>
    </div>
  )
}
