"use client";
import React, { use } from "react";
import GameList from "@/components/admin/gameList";
import { IoLogoGameControllerB } from "react-icons/io";
import { MdComment } from "react-icons/md";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { MdBugReport } from "react-icons/md";
import { useEffect, useState } from "react";

const page = () => {
  const [games, setGames] = useState(99);
  const [categories, setCategories] = useState(99);

  const fetchGames = async () => {
    try {
      const response = await fetch("/api/game?dataCollection=GameList");
      const data = await response.json();
      setGames(data.length);
    } catch (error) {
      console.error("Error fetching games:", error);
    } finally {
      console.log("done");
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/game?dataCollection=Categories");
      const data = await response.json();
      setCategories(data.length);
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  };

  useEffect(() => {
    fetchGames();
    fetchCategories();
  }, []);

  return (
    <div>
      <div className="mb-10 mt-5 grid-cols-1 md:grid-cols-4 grid gap-5">
        <div className="h-32 w-full rounded-md shadow-two border-b-1 border-blue-400 bg-white p-5">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold"> GAMES</h1>
              <h2 className="text-lg font-semibold">{games}</h2>
            </div>
            <IoLogoGameControllerB className="text-3xl opacity-65" />
          </div>
          <p className="mt-2 text-sm">There are total games</p>
        </div>
        <div className="h-32 w-full rounded-md shadow-two border-b-1 border-red-400 bg-white p-5">
          {" "}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold"> COMMENTS</h1>
              <h2 className="text-lg font-semibold">45</h2>
            </div>
            <MdComment className="text-3xl opacity-65" />
          </div>
          <p className="mt-2 text-sm">There are total comments</p>
        </div>

        <div className="h-32 w-full rounded-md shadow-two border-b-1 border-purple-600 bg-white p-5">
          {" "}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold"> CATEGORY</h1>
              <h2 className="text-lg font-semibold">{categories}</h2>
            </div>
            <BiSolidCategoryAlt className="text-3xl opacity-65" />
          </div>
          <p className="mt-2 text-sm">There are total category</p>
        </div>
        <div className="h-32 w-full rounded-md shadow-two border-b-1 border-orange-400 bg-white p-5">
          {" "}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold"> REPORTS</h1>
              <h2 className="text-lg font-semibold">210</h2>
            </div>
            <MdBugReport className="text-3xl opacity-65" />
          </div>
          <p className="mt-2 text-sm">There are total reports</p>
        </div>
      </div>
      <GameList />
    </div>
  );
};

export default page;
