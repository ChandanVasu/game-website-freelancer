"use client";
import React from "react";
import { useState, useEffect } from "react";

const categorie = () => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/game?dataCollection=Categories");
      const data = await response.json();
      setCategories(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div>
      <div className="mb-2 flex justify-between items-center">
        <h1 className="text-lg font-bold">Categories</h1>
        <p className="text-sm text-blue-700">All Categories</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {categories.map((categorie, index) => (
          <div className=" flex justify-start gap-2 items-center " key={categorie._id}>
            <img
              className="h-14 w-14 rounded-full shadow-one"
              src={categorie.image}
              alt=""
            />
            <p className="text-base">{categorie.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default categorie;
