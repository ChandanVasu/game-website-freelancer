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

  const [Categories, setCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/game?dataCollection=Categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
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
    const selectedCategory = Array.from(selectedKeys).join(", ");
    setFormData((prev) => ({ ...prev, category: selectedCategory }));
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append("file", file);
    uploadData.append("upload_preset", "my_upload_preset"); // Replace with your Cloudinary preset
    uploadData.append("folder", "game-images"); // Optional folder in Cloudinary

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/ddmqg3fec/image/upload",
        {
          method: "POST",
          body: uploadData,
        }
      );
      const data = await response.json();

      if (data.secure_url) {
        setFormData((prev) => ({ ...prev, image: data.secure_url }));
        toast.success("Image uploaded successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        throw new Error("Image upload failed");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Image upload failed. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleSubmit = async () => {
    const { title, url, category, description } = formData;

    if (!title || !url || !category || !description) {
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
        // setFormData({
        //   title: "",
        //   url: "",
        //   image: "",
        //   category: "",
        //   description: "",
        // });
      } else {
        toast.error("Failed to add game. Please try again.", {
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
      if (isSubmitted) {
        setIsSubmitted(false); // Reset to allow future submissions
      }
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="my-5 flex">
        <h1 className="text-2xl font-bold">Add Game</h1>
      </div>
      <div className="flex flex-col gap-5 mb-5">
        <Input
          label="Game Title"
          placeholder="Enter Game Title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          labelPlacement="outside"
          color="secondary"
        />
        <Select
          label="Game Category"
          placeholder="Select Game Category"
          labelPlacement="outside"
          color="secondary"
          selectedKeys={new Set([formData.category])}
          onSelectionChange={handleCategoryChange}
        >
          {Categories.map((category) => (
            <SelectItem key={category.name}>{category.name}</SelectItem>
          ))}
        </Select>
        <Input
          label="Game URL"
          placeholder="Enter Game URL"
          name="url"
          value={formData.url}
          onChange={handleInputChange}
          labelPlacement="outside"
          color="secondary"
        />
        <Input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          label="Game Image"
          placeholder="Select Game Image"
          labelPlacement="outside"
          color="secondary"
        />
      </div>
      <Textarea
        label="Description"
        placeholder="Enter your description"
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        labelPlacement="outside"
        color="secondary"
      />
      <button
        type="button"
        className={`px-6 py-1 rounded-md mt-5 bg-blue-500 text-white `}
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default Page;
