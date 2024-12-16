"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@nextui-org/react";
import { Textarea } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    image: "",
    category: "",
    description: "",
  });

  const [gameCategory] = useState([
    "Action",
    "Adventure",
    "Racing",
    "Sports",
    "Strategy",
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [Categories, setCategories] = useState([]);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (selectedKeys) => {
    const selectedCategory = Array.from(selectedKeys).join(", "); // Convert Set to string
    setFormData((prev) => ({ ...prev, category: selectedCategory }));
  };

  const handleSubmit = async () => {
    const { title, url, banner, image, category, description } = formData;

    // Validate all fields
    if (
      !title.trim() ||
      !url.trim() ||
      !banner.trim() ||
      !image.trim() ||
      !category.trim() ||
      !description.trim()
    ) {
      toast.error("All fields are required. Please fill out all fields.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(
        "http://localhost:3000/api/game?dataCollection=GameList",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        toast.success("Game added successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setIsSubmitted(true);
        // Immediately reset the form and set the submission state
        // setFormData({
        //   title: "",
        //   url: "",
        //   banner: "",
        //   image: "",
        //   category: "",
        //   description: "",
        // });
        setIsSubmitted(false); // Reset the submission state immediately
      } else {
        toast.error("Failed to add game. Please try again later.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An unexpected error occurred.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="my-5 flex">
        <h1 className="text-2xl font-bold">Add Game</h1>
      </div>
      <div className="flex flex-col gap-5">
        <Input
          label="Game Title"
          labelPlacement="outside"
          className="w-full md:w-[50%]"
          color="secondary"
          placeholder="Enter Game Title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
        />
        <Select
          className="w-full md:w-[50%]"
          labelPlacement="outside"
          color="secondary"
          label="Game Category"
          placeholder="Select Game Category"
          selectedKeys={new Set([formData.category])}
          variant="bordered"
          onSelectionChange={handleCategoryChange}
        >
          {Categories.map((category) => (
            <SelectItem key={category.name}>{category.name}</SelectItem>
          ))}
        </Select>
        <Input
          label="Game URL"
          labelPlacement="outside"
          color="secondary"
          className="w-full md:w-[50%]"
          placeholder="Enter Game URL"
          name="url"
          value={formData.url}
          onChange={handleInputChange}
        />
        <Input
          label="Game Image URL"
          labelPlacement="outside"
          color="secondary"
          className="w-full md:w-[50%]"
          placeholder="Enter Game Image URL"
          name="image"
          value={formData.image}
          onChange={handleInputChange}
        />
      </div>

      <Textarea
        color="secondary"
        className="w-full md:w-[50%] my-5"
        label="Description"
        placeholder="Enter your description"
        name="description"
        value={formData.description}
        onChange={handleInputChange}
      />

      <button
        type="button"
        className={`px-4 py-2 rounded-md ${
          isSubmitting
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-secondary text-white"
        }`}
        onClick={handleSubmit}
        disabled={isSubmitting || isSubmitted}
      >
        {isSubmitting ? "Submitting..." : isSubmitted ? "Submitted" : "Submit"}
      </button>
    </div>
  );
};

export default Page;
