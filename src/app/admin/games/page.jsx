"use client";
import React from "react";
import GameList from "@/components/admin/gameList";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation"; // Import useRouter

const Page = () => {
  const router = useRouter(); // Initialize router

  const handleAddGame = () => {
    router.push("/admin/games/add"); // Navigate to the add game page
  };

  return (
    <div>
      <div className="flex justify-between items-center my-4">
        <h1 className="text-2xl font-bold">Game</h1>
        <Button
          onPress={handleAddGame}
          size="sm"
          className="bg-black text-white"
        >
          Add Game
        </Button>
      </div>
      <GameList />
    </div>
  );
};

export default Page;
