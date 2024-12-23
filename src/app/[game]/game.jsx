"use client";

import React from "react";
import { useEffect, useState } from "react";
import { Image } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import SideGame from "./sideGame";
import Side from "@/components/main/ad/side";
import { FaEye } from "react-icons/fa";

export default function Game({ id }) {
  const [game, setGame] = useState([]);
  const [play, setPlay] = useState(false);

  const fetchGame = async () => {
    console.log("fetching game");

    try {
      const response = await fetch(`/api/findgame?id=${id}`, {
        cache: "force-cache",
      });
      const data = await response.json();
      console.log(data);
      setGame(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchGame();
  }, []);

  return (
    <div className="px-2 md:px-6 mt-3">
      <div className="flex md:flex-row flex-col gap-5">
        <div className="w-[300px] hidden md:block">
          <SideGame />
        </div>
        <div className=" w-full h-[550px] rounded-md shadow-one">
          <div>
            {!play && (
              <div className="flex flex-col items-center min-h-[550px]  justify-center">
                <Image className="w-[200px] h-[150px]" src={game.image}></Image>
                <h1>{game.title}</h1>
                <Button
                  onPress={() => {
                    setPlay(true);
                  }}
                >
                  Play Game
                </Button>
              </div>
            )}
            {play && (
              <div>
                <iframe
                  className="w-full h-[550px] rounded-md shadow-one"
                  src={game.url}
                ></iframe>
              </div>
            )}
          </div>
          <div className="h-12 w-full shadow-one mt-2 rounded-md bg-slate-200 flex justify-between items-center px-5">
            <h1 className="text-lg font-bold">{game.title}</h1>
            <div className="flex gap-1 justify-center items-center">
              <span>
                <FaEye />
              </span>
              <span> {game.views}</span>
            </div>
          </div>
        </div>
        <div className="w-[450px]  hidden md:block">
          <Side />
        </div>
      </div>
      <div></div>
    </div>
  );
}
