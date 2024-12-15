"use client";
import { useState, useEffect } from "react";
import React from "react";

const TopArea = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchGames = async () => {
    try {
      const response = await fetch("/api/game?dataCollection=GameList" ,  {cache: "force-cache"});
      if (!response.ok) {
        throw new Error("Failed to fetch games");
      }
      const data = await response.json();
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
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (games.length === 0) {
    return <p>No games available.</p>;
  }

  return (
    <div>
      <div className="flex gap-4 justify-center items-center overflow-hidden">
        <img
          className="w-[25%] h-[300px] rounded-md"
          src={games[0]?.image}
          alt=""
        />
        <div className="w-[50%] grid grid-cols-4 gap-2">
          <img
            className="h-[146px] w-full rounded-md"
            src={games[1]?.image}
            alt=""
          />
          <img
            className="h-[146px] w-full rounded-md"
            src={games[2]?.image}
            alt=""
          />
          <img
            className="h-[146px] w-full rounded-md"
            src={games[3]?.image}
            alt=""
          />
          <img
            className="h-[146px] w-full rounded-md"
            src={games[4]?.image}
            alt=""
          />
          <img
            className="h-[146px] w-full rounded-md"
            src={games[5]?.image}
            alt=""
          />
          <img
            className="h-[146px] w-full rounded-md"
            src={games[6]?.image}
            alt=""
          />
          <img
            className="h-[146px] w-full rounded-md"
            src={games[7]?.image}
            alt=""
          />
          <img
            className="h-[146px] w-full rounded-md"
            src={games[8]?.image}
            alt=""
          />
        </div>
        <img
          className="w-[25%] h-[300px] rounded-md"
          src={games[9]?.image}
          alt=""
        />
      </div>
    </div>
  );
};

export default TopArea;
