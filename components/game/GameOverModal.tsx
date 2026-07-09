"use client";

interface GameOverModalProps {
  open: boolean;
  score: number;
  bestScore: number;
  remainingPlays: number;
  onPlayAgain: () => void;
  onClose: () => void;
}

export default function GameOverModal({
  open,
  score,
  bestScore,
  remainingPlays,
  onPlayAgain,
  onClose,
}: GameOverModalProps) {
  if (!open) {
    return null;
  }

  const isNewBest = score >= bestScore && score > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
        <h2 className="text-center text-3xl font-bold">
          🎉 Game Over
        </h2>

        <div className="mt-8 space-y-4">
          <StatRow
            label="Final Score"
            value={score}
          />

          <StatRow
            label="Best Score"
            value={bestScore}
          />

          <StatRow
            label="Plays Remaining"
            value={remainingPlays}
          />
        </div>

        {isNewBest && (
          <div className="mt-6 rounded-xl bg-yellow-100 p-3 text-center font-semibold text-yellow-800">
            🏆 New High Score!
          </div>
        )}

        <div className="mt-8 flex flex-col gap-3">
          <button
            onClick={onPlayAgain}
            disabled={remainingPlays === 0}
            className="rounded-xl bg-green-600 px-4 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            {remainingPlays > 0 ? "Play Again" : "No Plays Remaining"}
          </button>

          <button
            onClick={onClose}
            className="rounded-xl border border-gray-300 px-4 py-3 font-semibold transition hover:bg-gray-100"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

interface StatRowProps {
  label: string;
  value: number;
}

function StatRow({
  label,
  value,
}: StatRowProps) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4">
      <span className="text-gray-600">
        {label}
      </span>

      <span className="text-xl font-bold">
        {value}
      </span>
    </div>
  );
}