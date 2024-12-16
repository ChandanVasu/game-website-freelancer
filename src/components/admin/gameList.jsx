"use client";
import React, { useEffect, useState } from "react";
import { Spinner } from "@nextui-org/spinner";
import { Button } from "@nextui-org/react";

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

  const handleDeleteCategory = async (id) => {
    try {
      const response = await fetch("/api/game?dataCollection=GameList", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        setGames((prevGames) => prevGames.filter((game) => game._id !== id)); // Remove the category from the state
      } else {
        console.error("Failed to delete category");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const truncateTitle = (title, value) => {
    if (!title) return "No Title";
    return title.length > value ? title.slice(0, value) + "..." : title;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };


  return (
    <div className="space-y-2">
      {loading ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <Spinner size="xl" />
        </div>
      ) : games.length === 0 ? ( // Check if games array is empty
        <div className="flex justify-center items-center min-h-[50vh]">
          <p className="text-lg text-gray-500">No games found</p>
        </div>
      ) : (
        games.map((game, index) => (
          <div
            className="bg-white p-3 rounded-md shadow-one flex gap-3"
            key={index}
          >
            <img
              className="rounded-md w-20 h-12 mb-1"
              src={game.image}
              alt=""
            />

            <div className="grid grid-cols-3 justify-between items-center">
              <div className="flex gap-4 col-span-2">
                <h1 className="text-4xl font-bold opacity-15">{index + 1}</h1>
                <div>
                  <h2 className="md:text-lg text-sm font-semibold">
                    {truncateTitle(game.title, 20)}
                  </h2>
                  <h2 className="md:text-sm text-xs">Date: {formatDate(game.date)}</h2>
                </div>
              </div>
              <div className="flex gap-1 flex-col md:flex-row">
                <Button
                  onPress={() => {
                    handleDeleteCategory(game._id);
                  }}
                  size="sm"
                  className="bg-black text-white"
                >
                  Delete
                </Button>
                <Button size="sm" className="bg-black text-white">
                  Edit
                </Button>
              </div>
              <div></div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default GameList;
