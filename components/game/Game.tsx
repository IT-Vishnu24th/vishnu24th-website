"use client";

import GameCanvas from "@/components/game/GameCanvas";
import ScoreBoard from "@/components/game/ScoreBoard";
import Timer from "@/components/game/Timer";
import GameOverModal from "@/components/game/GameOverModal";

import { useGame } from "@/hooks/useGame";


export default function Game() {
  const {
    trash,
    score,
    timeLeft,

    status,

    startGame,
    closeGame,

    updateBins,

    handleDragStart,
    handleDragMove,
    handleDragEnd,
  } = useGame();


  return (
    <section className="flex w-full flex-col items-center gap-5">

      <div className="flex w-full max-w-3xl items-center justify-between rounded-xl bg-white p-4 shadow">
        <ScoreBoard
          score={score}
          bestScore={score}
          remainingPlays={3}
        />

        <Timer
          timeLeft={timeLeft}
        />
      </div>


      <GameCanvas
  trash={trash}
  onDragStart={handleDragStart}
  onDragMove={handleDragMove}
  onDragEnd={handleDragEnd}
  onBinsUpdate={updateBins}
/>


      {status === "ready" && (
        <button
          onClick={startGame}
          className="
            rounded-xl
            bg-green-600
            px-8
            py-3
            text-lg
            font-semibold
            text-white
            shadow-md
            transition
            hover:bg-green-700
            active:scale-95
          "
        >
          Start Sorting
        </button>
      )}


      <GameOverModal
        open={status === "finished"}
        score={score}
        bestScore={score}
        remainingPlays={3}
        onPlayAgain={startGame}
        onClose={closeGame}
      />

    </section>
  );
}