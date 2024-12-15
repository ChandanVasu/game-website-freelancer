"use client";
import React, { useEffect, useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { Spinner } from "@nextui-org/spinner";

const GameList = () => {
  const [games, setGames] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [newImage, setNewImage] = useState("");
  const [loading, setLoading] = useState(false); // Loading state for API requests

  // Fetch games/categories from the API
  const fetchGames = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/game?dataCollection=Categories");
      const data = await response.json();
      setGames(data);
    } catch (error) {
      console.error("Error fetching games:", error);
    } finally {
      setLoading(false); // Stop spinner after fetch
    }
  };

  // Handle POST request to add a new category
  const handleAddCategory = async () => {
    if (!newCategory.trim() || !newImage.trim()) return;
    setLoading(true); // Start spinner

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
      } else {
        console.error("Failed to add category");
      }
    } catch (error) {
      console.error("Error adding category:", error);
    } finally {
      setLoading(false); // Stop spinner
    }
  };

  // Handle DELETE request to remove a category
  const handleDeleteCategory = async (id) => {
    setLoading(true); // Start spinner
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
        console.error("Failed to delete category");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    } finally {
      setLoading(false); // Stop spinner
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold my-5">Categories</h1>
      <div className="my-5 flex flex-col gap-6">
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
          isDisabled={loading} // Disable button while loading
        >
          Add
        </Button>
      </div>

      {/* Spinner or Categories List */}
      <div className="space-y-2 w-[50%]">
        {loading ? (
          <div className="flex justify-center items-center min-h-[50vh]">
            <Spinner size="lg" />
          </div>
        ) : games.length > 0 ? (
          games.map((game, index) => (
            <div
              className="bg-white p-3 rounded-md shadow-two flex justify-between items-center gap-5"
              key={index}
            >
              <div className="flex gap-2 items-center">
                <h1>{index + 1}.</h1>
                <img
                  src={game.image}
                  alt=""
                  className="w-16 h-10 rounded"
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
          ))
        ) : (
          <p className="text-gray-500">No categories found</p>
        )}
      </div>
    </div>
  );
};

export default GameList;
