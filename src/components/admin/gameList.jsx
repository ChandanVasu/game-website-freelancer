"use client";
import React, { useEffect, useState } from "react";
import { Spinner } from "@nextui-org/spinner";

const GameList = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state to track the API call

  const fetchGames = async () => {
    try {
      const response = await fetch("/api/game?dataCollection=GameList");
      const data = await response.json();
      console.log(data);
      setGames(data);
    } catch (error) {
      console.error("Error fetching games:", error);
    } finally {
      setLoading(false); // Set loading to false once the data is fetched
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const truncateTitle = (title, value) => {
    if (!title) return "No Title";
    return title.length > value ? title.slice(0, value) + "..." : title;
  };

  return (
    <div className="space-y-2">
      {loading ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <Spinner size="xl" />
        </div>
      ) : (
        games.map((game, index) => (
          <div
            className="bg-white p-3 rounded-md shadow-one  flex gap-3 "
            key={index}
          >
            <img
              className="rounded-md w-20 h-12 mb-1"
              src={game.image}
              alt=""
            />

            <div className="flex gap-4 justify-start items-center">
              <h1 className="text-4xl font-bold  opacity-15">{index + 1}</h1>
              <div>
                <h2 className="text-lg font-semibold">
                  {truncateTitle(game.title, 20)}
                </h2>
                <h2 className="text-sm">Date: {game.date}</h2>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default GameList;
