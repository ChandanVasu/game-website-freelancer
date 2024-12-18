"use client";
import { useState, useEffect } from "react";
import React from "react";
import { Skeleton } from "@nextui-org/skeleton";
import Link from "next/link";

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

      setGames(data);
    } catch (err) {
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
        <Skeleton className="w-full md:w-[25%] h-[300px] rounded-md" />

        {/* Center grid skeleton */}
        <div className="w-full md:w-[50%] grid grid-cols-2 sm:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-[150px] w-full rounded-md" />
          ))}
        </div>

        {/* Right image skeleton */}
        <Skeleton className="w-full md:w-[25%] h-[300px] rounded-md" />
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
    <div>
      <div className="flex flex-col md:flex-row gap-4 justify-center items-center overflow-hidden">
        {/* Left image */}
        <Link href={`/${games[0]?._id}`} className="w-full md:w-[25%]">
          <img
            className="w-full h-[300px] object-cover rounded-md shadow-one"
            src={games[0]?.image}
            alt=""
          />
        </Link>

        {/* Center grid */}
        <div className="w-full md:w-[50%] grid grid-cols-2 sm:grid-cols-3 gap-4">
          {games.slice(1, 7).map((game, index) => (
            <Link
              key={index}
              href={`/${game._id}`}
              className="block w-full h-[140px]"
            >
              <img
                className="w-full h-full object-cover rounded-md shadow-one"
                src={game?.image}
                alt=""
              />
            </Link>
          ))}
        </div>

        {/* Right image */}
        <Link href={`/${games[9]?._id}`} className="w-full md:w-[25%]">
          <img
            className="w-full h-[300px] object-cover rounded-md shadow-one"
            src={games[9]?.image}
            alt=""
          />
        </Link>
      </div>
    </div>
  );
};

export default TopArea;
