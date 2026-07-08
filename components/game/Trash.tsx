"use client";

import { useRef } from "react";

import { usePointerDrag } from "@/hooks/usePointerDrag";

import type { FallingTrash } from "@/types/game";


type TrashProps = {
  trash: FallingTrash;

  canvasRef: React.RefObject<HTMLDivElement | null>;

  onDragStart?: (
    id: string
  ) => void;

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
};



export default function Trash({
  trash,
  canvasRef,
  onDragStart,
  onDragMove,
  onDragEnd,
}: TrashProps) {


  const trashRef =
    useRef<HTMLDivElement | null>(null);



  const {
    startDrag,
    moveDrag,
    endDrag,
  } =
    usePointerDrag({

      canvasRef,

      onDragStart,

      onDragMove,

      onDragEnd,

    });



  return (
    <div

      ref={trashRef}

      className="
        absolute
        flex
        h-12
        w-12
        cursor-grab
        touch-none
        select-none
        items-center
        justify-center
        rounded-full
        bg-white
        text-3xl
        shadow-md
        active:cursor-grabbing
      "

      style={{
        transform:
          `translate(${trash.x}px, ${trash.y}px)`,
      }}


      onPointerDown={
        (event) => {

          const element =
            trashRef.current;


          if (!element) {
            return;
          }


          startDrag(
            event,
            trash.id,
            element
          );

        }
      }


      onPointerMove={
        moveDrag
      }


      onPointerUp={
        endDrag
      }


      onPointerCancel={
        endDrag
      }

    >

      {trash.emoji}

    </div>
  );
}