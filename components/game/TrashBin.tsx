"use client";

import { useEffect, useRef } from "react";

import type { TrashType } from "@/types/game";

import type { CollisionBox } from "@/utils/collision";


interface TrashBinProps {
  type: TrashType;
  label: string;

  onRegister?: (
    type: TrashType,
    box: CollisionBox
  ) => void;
}


const BIN_SIZE = {
  width: 100,
  height: 100,
};


export default function TrashBin({
  type,
  label,
  onRegister,
}: TrashBinProps) {

  const binRef =
    useRef<HTMLDivElement | null>(null);


  useEffect(() => {
    const element =
      binRef.current;

    if (!element || !onRegister) {
      return;
    }


    const updatePosition = () => {
      const rect =
  element.getBoundingClientRect();


const parent =
  element.parentElement
    ?.getBoundingClientRect();


if (!parent) {
  return;
}


onRegister(
  type,
  {
    x: rect.left - parent.left,
    y: rect.top - parent.top,
    width: rect.width,
    height: rect.height,
  }
);
    };


    updatePosition();


    window.addEventListener(
      "resize",
      updatePosition
    );


    return () => {
      window.removeEventListener(
        "resize",
        updatePosition
      );
    };

  }, [
    type,
    onRegister,
  ]);


  return (
    <div
      ref={binRef}
      className="
        flex
        h-24
        w-24
        flex-col
        items-center
        justify-center
        rounded-xl
        bg-white
        shadow-md
        select-none
      "
    >
      <div className="text-3xl">
        {type === "recycle" && "♻️"}
        {type === "general" && "🗑️"}
        {type === "food" && "🍎"}
      </div>

      <span className="text-xs font-semibold">
        {label}
      </span>
    </div>
  );
}