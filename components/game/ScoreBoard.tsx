"use client";

interface ScoreBoardProps {
  score: number;
  bestScore: number;
  remainingPlays: number;
}

export default function ScoreBoard({
  score,
  bestScore,
  remainingPlays,
}: ScoreBoardProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <StatCard
        title="Score"
        value={score}
        color="text-green-600"
      />

      <StatCard
        title="Best"
        value={bestScore}
        color="text-blue-600"
      />

      <StatCard
        title="Plays Left"
        value={remainingPlays}
        color="text-orange-600"
      />
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: number;
  color: string;
}

function StatCard({
  title,
  value,
  color,
}: StatCardProps) {
  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <p className="text-sm text-gray-500">
        {title}
      </p>

      <p className={`mt-2 text-3xl font-bold ${color}`}>
        {value}
      </p>
    </div>
  );
}