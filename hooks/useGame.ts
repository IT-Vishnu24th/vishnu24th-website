"use client";

import { useRef, useState } from "react";

import useAnimation from "@/hooks/useAnimation";
import useSpawner from "@/hooks/useSpawner";
import useTimer from "@/hooks/useTimer";

import {
  checkCollision,
  CollisionBox,
} from "@/utils/collision";

import { calculateNextY } from "@/utils/physics";

import type {
  FallingTrash,
  GameStatus,
  TrashType,
} from "@/types/game";


const GAME_DURATION = 30;

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;


export function useGame() {

  const trashRef =
    useRef<FallingTrash[]>([]);


  const binsRef =
    useRef<
      Partial<Record<
        TrashType,
        CollisionBox
      >>
    >({});


  const [
    trash,
    setTrash,
  ] = useState<FallingTrash[]>([]);


  const [
    score,
    setScore,
  ] = useState(0);


  const [
    status,
    setStatus,
  ] = useState<GameStatus>("ready");



  function syncTrash() {
    setTrash([
      ...trashRef.current,
    ]);
  }



  function updateBins(
    bins: Record<
      TrashType,
      CollisionBox
    >
  ) {

    binsRef.current = bins;

  }



  function endGame() {

    setStatus("finished");

    trashRef.current = [];

    setTrash([]);

  }



  const {
    timeLeft,
    start,
    reset,
  } = useTimer({
    duration: GAME_DURATION,
    onComplete: endGame,
  });



  const {
    updateSpawner,
    resetSpawner,
  } = useSpawner({

    gameWidth: GAME_WIDTH,

    onSpawn: (
      newTrash
    ) => {

      trashRef.current.push(
        newTrash
      );

    },

  });



  function updateFrame(
    deltaTime: number
  ) {

    if (
      status !== "playing"
    ) {
      return;
    }



    updateSpawner(
      deltaTime
    );



    trashRef.current =
      trashRef.current
        .map(
          (item) => ({
            ...item,

            y:
              calculateNextY(
                item.y,
                item.speed,
                deltaTime
              ),

          })
        )
        .filter(
          (item) =>
            item.y < GAME_HEIGHT
        );



    syncTrash();

  }



  useAnimation(
    updateFrame,
    status === "playing"
  );



  function startGame() {

    trashRef.current = [];

    setTrash([]);

    setScore(0);


    resetSpawner();

    reset();


    setStatus(
      "playing"
    );


    start();

  }

function closeGame() {
  setStatus("ready");
}

  function handleDragStart(
    id: string
  ) {}



  function handleDragMove(
    id: string,
    position:{
      x:number;
      y:number;
    }
  ) {

    if (
      status !== "playing"
    ) return;



    const item =
      trashRef.current.find(
        t =>
          t.id === id
      );


    if (!item) return;



    item.x =
      position.x;

    item.y =
      position.y;

  }




  function handleDragEnd(
    id:string,
    position:{
      x:number;
      y:number;
    }
  ) {

    if (
      status !== "playing"
    ) return;



    const item =
      trashRef.current.find(
        t =>
          t.id === id
      );


    if (!item) return;



    const bin =
      binsRef.current[
        item.type
      ];



    if (
      bin &&
      checkCollision(
        {
          x:item.x,
          y:item.y,
          size:50,
        },
        bin
      )
    ) {

      setScore(
        value =>
          value + 1
      );


      trashRef.current =
        trashRef.current.filter(
          t =>
            t.id !== id
        );


    }



    syncTrash();

  }



  return {

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

};

}