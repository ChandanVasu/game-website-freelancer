"use client";
import { useState, useEffect } from "react";
import React from "react";
import { Skeleton } from "@nextui-org/skeleton";
import Link from "next/link";

const TopArea = ({}) => {
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

      setGames(data.slice(0, 5));
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
      <div className="grid grid-cols-1 gap-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div className="shadow-one rounded-md" key={index}>
            <Skeleton className="h-28  w-full rounded-md" />
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
      <div className="grid grid-cols-1 gap-4">
        {games.map((game) => (
          <Link href={`/${game._id}`} key={game._id}>
            <div className="shadow-one rounded-md" key={game._id}>
              <img className="h-28 w-full rounded-md" src={game.image} alt="" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopArea;
