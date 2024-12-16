"use client";
import React, { useState, useEffect } from "react";
import { Skeleton } from "@nextui-org/skeleton";

const Categorie = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/game?dataCollection=Categories");
      const data = await response.json();
      setCategories(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching games:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <div className="mb-2 flex justify-between items-center">
        <h1 className="text-lg font-bold">Categories</h1>
        <p className="text-xs md:text-sm text-blue-700">All Categories</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {loading
          ? Array.from({ length: 12 }).map((_, index) => (
              <div
                className="flex justify-start gap-2 items-center"
                key={index}
              >
                <Skeleton className="h-14 w-14 rounded-full" variant="circle" />
                <Skeleton className="w-24 h-6 rounded-md" />
              </div>
            ))
          : categories.map((categorie) => (
              <div
                className="flex justify-start gap-2 items-center"
                key={categorie._id}
              >
                <img
                  className="h-14 w-14 rounded-full shadow-one"
                  src={categorie.image}
                  alt=""
                />
                <p className="text-sm md:text-base">{categorie.name}</p>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Categorie;
