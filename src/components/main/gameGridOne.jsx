"use client";
import { useState, useEffect } from "react";
import React from "react";

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
      const data = await response.json();
      console.log(data);
      setGames(data.slice(0, 16));
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
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (games.length === 0) {
    return <p>No games available.</p>;
  }

  return (
    <div className="">
      <div className="mb-2 flex justify-between items-center">
        <h1 className="text-lg font-bold">New Games</h1>
        <p className="text-sm text-blue-700">All Game</p>
      </div>
      <div className="grid grid-cols-8 gap-4 ">
        {games.map((game, index) => (
          <div className="shadow-one rounded-md" key={game._id}>
            <img className="h-40 w-full rounded-md" src={game.image} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopArea;
