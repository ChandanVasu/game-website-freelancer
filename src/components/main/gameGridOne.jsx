"use client";
import { useState, useEffect } from "react";
import React from "react";
import { Skeleton } from "@nextui-org/skeleton";
import Link from "next/link";

const TopArea = ({ filterData, title, sort }) => {
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

      if (filterData) {
        data = data.filter((item) => item.category === filterData);
      }

      if (sort) {
        data.sort((a, b) => new Date(b.date) - new Date(a.date));
      }

      setGames(data.slice(0, 12));
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
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
        {Array.from({ length: 12 }).map((_, index) => (
          <div className="shadow-one rounded-md" key={index}>
            <Skeleton className="h-20 md:h-40 w-full rounded-md" />
          </div>
        ))}
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
      <div className="mb-2 flex justify-between items-center">
        <h1 className="text-lg font-bold">{title || "New Game"}</h1>
        <p className="text-xs md:text-sm text-blue-700">All Game</p>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
        {games.map((game) => (
          <Link href={`/${game._id}`} key={game._id}>
            <div className="shadow-one rounded-md" key={game._id}>
              <img
                className="h-20 md:h-40 w-full rounded-md"
                src={game.image}
                alt=""
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopArea;
