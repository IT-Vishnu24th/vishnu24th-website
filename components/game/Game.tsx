"use client";

import GameCanvas from "./GameCanvas";
import ScoreBoard from "./ScoreBoard";
import Timer from "./Timer";
import GameOverModal from "./GameOverModal";

import {
  getBestScore,
  getRemainingPlays,
} from "@/utils/storage";

import {
  useGame,
} from "@/hooks/useGame";





export default function Game(){


  const {
  trash,
  bins,
  score,
  timeLeft,
  status,

  startGame,
  finishGame,
  resetGame,

  handleDragStart,
  handleDragMove,
  handleDragEnd,

} = useGame();

const bestScore = getBestScore();
const remainingPlays = getRemainingPlays();

  return (

    <div

      className="
        flex
        flex-col
        items-center
        gap-6
        w-full
      "

    >





      <div

        className="
          flex
          justify-between
          items-center
          w-full
          max-w-3xl
        "

      >


        <ScoreBoard

  score={
    score
  }

  bestScore={
    bestScore
  }

  remainingPlays={
    remainingPlays
  }

/>



        <Timer

          timeLeft={
            timeLeft
          }

        />


      </div>









      {
        status === "idle" && (

          <button

            onClick={
              startGame
            }


            className="
              rounded-xl
              bg-green-600
              px-8
              py-3
              font-bold
              text-white
              hover:bg-green-700
            "

          >

            Start Game

          </button>

        )
      }









      {
        status === "playing" && (

          <GameCanvas


            trash={
              trash
            }


            bins={
              bins
            }



            onDragStart={
              handleDragStart
            }


            onDragMove={
              handleDragMove
            }


            onDragEnd={
              handleDragEnd
            }


          />

        )
      }









      {
        status === "playing" && (

          <button

            onClick={
              finishGame
            }


            className="
              rounded-lg
              bg-red-500
              px-6
              py-2
              font-semibold
              text-white
            "

          >

            End Game

          </button>

        )
      }









{
  status === "finished" && (

    <GameOverModal

      open={
        true
      }


      score={
        score
      }


      bestScore={
        bestScore
      }


      remainingPlays={
        remainingPlays
      }


      onPlayAgain={
        startGame
      }


      onClose={
        resetGame
      }

    />

  )
}







    </div>

  );

}