"use client";
import React, { useEffect, useState } from "react";
import { Button, Input } from "@nextui-org/react";

const GameList = () => {
  const [games, setGames] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [newImage, setNewImage] = useState("");

  // Fetch games/categories from the API
  const fetchGames = async () => {
    try {
      const response = await fetch("/api/game?dataCollection=Categories");
      const data = await response.json();
      setGames(data);
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  };

  // Handle POST request to add a new category
  const handleAddCategory = async () => {
    if (!newCategory.trim() || !newImage.trim()) return;

    try {
      const response = await fetch("/api/game?dataCollection=Categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newCategory, image: newImage }),
      });

      if (response.ok) {
        const addedCategory = await response.json();
        setGames((prevGames) => [addedCategory, ...prevGames]); // Add the new category to the top of the list
        setNewCategory(""); // Clear the name input field
        setNewImage(""); // Clear the image input field
        fetchGames(); // Fetch the updated list of categories
      } else {
        console.error("Failed to add category");
      }
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  // Handle DELETE request to remove a category
  const handleDeleteCategory = async (id) => {
    try {
      const response = await fetch("/api/game?dataCollection=Categories", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        setGames((prevGames) => prevGames.filter((game) => game._id !== id)); // Remove the category from the state
      } else {
        // console.error("Failed to delete category");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold my-5">Categories</h1>
      <div className="my-5 flex flex-col gap-6 ">
        <Input
          placeholder="Enter category name"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          fullWidth
          className="w-[50%]"

        />
        <Input
          placeholder="Enter category image URL"
          value={newImage}
          className="w-[50%]"
          onChange={(e) => setNewImage(e.target.value)}
          fullWidth
        />
        <Button
          size="md"
          className="bg-black text-white w-[20%]"
          onPress={handleAddCategory}
        >
          Add
        </Button>
      </div>

      {/* Categories List */}
      <div className="space-y-2">
        {games.map((game, index) => (
          <div
            className="bg-white p-3 rounded-md shadow-two flex justify-between items-center gap-5"
            key={index}
          >
            <div className="flex gap-2 items-center">
              <h1>{index + 1}.</h1>
              <img
                src={game.image }
                alt={game.name}
                className="w-10 h-10 rounded"
              />
              <p>{game.name}</p>
            </div>
            <div className="flex gap-2">
              <Button
                onPress={() => handleDeleteCategory(game._id)} // Correctly pass the id as a function reference
                size="sm"
                className="bg-black text-white"
              >
                Delete
              </Button>
              <Button size="sm" className="bg-black text-white">
                Edit
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameList;
