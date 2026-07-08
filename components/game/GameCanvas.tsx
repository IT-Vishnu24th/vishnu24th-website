"use client";

import { useCallback, useRef } from "react";

import Trash from "@/components/game/Trash";
import TrashBin from "@/components/game/TrashBin";

import type {
  FallingTrash,
  TrashType,
} from "@/types/game";

import type {
  CollisionBox,
} from "@/utils/collision";


type GameCanvasProps = {
  trash: FallingTrash[];

  onDragStart?: (id: string) => void;

  onDragMove?: (
    id: string,
    position: {
      x: number;
      y: number;
    }
  ) => void;

  onDragEnd?: (
    id: string,
    position: {
      x: number;
      y: number;
    }
  ) => void;


  onBinsUpdate?: (
    bins: Record<
      TrashType,
      CollisionBox
    >
  ) => void;
};


const binList: {
  type: TrashType;
  label: string;
}[] = [
  {
    type: "recycle",
    label: "Recycle",
  },
  {
    type: "general",
    label: "General",
  },
  {
    type: "food",
    label: "Food",
  },
];


export default function GameCanvas({
  trash,
  onDragStart,
  onDragMove,
  onDragEnd,
  onBinsUpdate,
}: GameCanvasProps) {


  const canvasRef =
    useRef<HTMLDivElement | null>(null);


  const binsRef =
    useRef<
      Partial<Record<
        TrashType,
        CollisionBox
      >>
    >({});



  const registerBin =
    useCallback(
      (
        type: TrashType,
        box: CollisionBox
      ) => {

        binsRef.current[type] =
          box;


        if (
          binsRef.current.recycle &&
          binsRef.current.general &&
          binsRef.current.food
        ) {

          onBinsUpdate?.(
            binsRef.current as Record<
              TrashType,
              CollisionBox
            >
          );

        }

      },
      [
        onBinsUpdate,
      ]
    );



  return (
    <div
      ref={canvasRef}
      className="
        relative
        h-[600px]
        w-full
        overflow-hidden
        rounded-xl
        bg-green-50
      "
    >

      {trash.map(
        (item) => (
          <Trash
            key={item.id}
            trash={item}

            canvasRef={canvasRef}

            onDragStart={
              onDragStart
            }

            onDragMove={
              onDragMove
            }

            onDragEnd={
              onDragEnd
            }
          />
        )
      )}



      <div
        className="
          absolute
          bottom-4
          left-0
          flex
          w-full
          justify-center
          gap-4
          px-4
        "
      >

        {binList.map(
          (bin) => (

            <TrashBin
              key={bin.type}

              type={bin.type}

              label={bin.label}

              onRegister={
                registerBin
              }
            />

          )
        )}

      </div>


    </div>
  );
}