"use client";

import type {
  CSSProperties,
} from "react";


import type {
  BinState,
} from "@/types/game";



type TrashBinProps = {

  bin:BinState;

};






export default function TrashBin({
  bin,
}:TrashBinProps){



  const style:CSSProperties = {

    position:"absolute",

    left:bin.x,

    top:bin.y,

    width:bin.width,

    height:bin.height,

  };





  return (

    <div

      style={
        style
      }


      className="
        flex
        items-center
        justify-center
        rounded-xl
        border-4
        border-white
        bg-white/70
        shadow-md
        text-center
        font-bold
        text-sm
      "

    >

      {bin.label}

    </div>

  );

}