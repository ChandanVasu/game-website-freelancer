"use client";

import React from "react";
import { useEffect, useState } from "react";
import { Image } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import SideGame from "./sideGame";
import Side from "@/components/main/ad/side";
import { FaEye } from "react-icons/fa";
import Banner from "@/components/main/ad/banner";
import Banner2 from "@/components/main/ad/banner2";
import GridGameOne from "@/components/main/gameGridOne";
import Categorie from "@/components/main/categorie";

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
        <div className=" w-full h-[550px] md:h-[550px] rounded-md shadow-one">
          <div>
            {!play && (
              <div className="flex flex-col items-center min-h-[550px] gap-5  justify-center">
                <h1 className="text-3xl font-bold">{game.title}</h1>
                <Image className="w-[300px] h-[150px]" src={game.image}></Image>
                <Button
                  size="lg"
                  className="bg-blue-800 text-white "
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
      <div>
        <div className="mt-5">
          <GridGameOne title={"Related Games"}></GridGameOne>
        </div>
        <div className="space-y-4 ">
          <div className="mt-5">
            <Banner></Banner>
          </div>
          <GridGameOne
            sort={true}
            title={"Car Games"}
            filterData={"Car Games"}
          ></GridGameOne>
          <Banner2></Banner2>
          <GridGameOne
            sort={true}
            title={"Fighting"}
            filterData={"Fighting"}
          ></GridGameOne>
          <Banner></Banner>
        </div>
        <div className="mt-5">
          <Categorie></Categorie>
        </div>
      </div>
    </div>
  );
}
