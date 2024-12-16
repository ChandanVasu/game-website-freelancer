"use client";
import { useState, useEffect } from "react";
import React from "react";
import { Skeleton } from "@nextui-org/skeleton";

const TopArea = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchGames = async () => {
    try {
      const response = await fetch("/api/game?dataCollection=GameList", {
        cache: "force-cache",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch games");
      }
      let data = await response.json();

      data.sort((a, b) => new Date(b.date) - new Date(a.date));

      console.log(data);
      setGames(data);
    } catch (err) {
      console.error("Error fetching games:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col md:flex-row gap-4 justify-center items-center overflow-hidden">
        {/* Left image skeleton */}
        <Skeleton className="w-full md:w-[25%] h-[200px] md:h-[300px] rounded-md" />

        {/* Center grid skeleton */}
        <div className="w-full md:w-[50%] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton
              key={index}
              className="h-[100px] sm:h-[146px] w-full rounded-md"
            />
          ))}
        </div>

        {/* Right image skeleton */}
        <Skeleton className="w-full md:w-[25%] h-[200px] md:h-[300px] rounded-md" />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  if (games.length === 0) {
    return <p>No games available.</p>;
  }

  return (
    <div className="">
      <div className="flex flex-col md:flex-row gap-4 justify-center items-center overflow-hidden">
        {/* Left image */}
        <img
          className="w-full md:w-[25%] h-[200px] md:h-[300px] rounded-md shadow-one"
          src={games[0]?.image}
          alt=""
        />

        {/* Center grid */}
        <div className="w-full md:w-[50%] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-2">
          {games.slice(1, 7).map((game, index) => (
            <img
              key={index}
              className="h-[100px] sm:h-[146px] w-full rounded-md shadow-one"
              src={game?.image}
              alt=""
            />
          ))}
        </div>

        {/* Right image */}
        <img
          className="w-full md:w-[25%] h-[200px] md:h-[300px] rounded-md shadow-one"
          src={games[9]?.image}
          alt=""
        />
      </div>
    </div>
  );
};

export default TopArea;
