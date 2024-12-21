"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Input, Button } from "@nextui-org/react";
import { Spinner } from "@nextui-org/spinner"; // Import Spinner

// Dynamically import TinyMCE
const Editor = dynamic(
  () => import("@tinymce/tinymce-react").then((mod) => mod.Editor),
  { ssr: false }
);

const Page = () => {
  const [pages, setPages] = useState([]);
  const [newPage, setNewPage] = useState({
    title: "",
    content: "",
  });
  const [loading, setLoading] = useState(false); // Loading state

  const fetchPages = async () => {
    setLoading(true); // Start loading
    try {
      const response = await fetch("/api/game?dataCollection=Pages");
      const data = await response.json();
      setPages(data);
    } catch (error) {
      console.error("Error fetching pages:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const addPage = async () => {
    setLoading(true); // Start loading
    try {
      const response = await fetch("/api/game?dataCollection=Pages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPage),
      });

      if (response.ok) {
        fetchPages();
        setNewPage({ title: "", content: "" });
      } else {
        console.error("Error adding page:", await response.text());
      }
    } catch (error) {
      console.error("Error adding page:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const deletePage = async (id) => {
    setLoading(true); // Start loading
    try {
      const response = await fetch("/api/game?dataCollection=Pages", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        fetchPages();
      } else {
        console.error("Error deleting page:", await response.text());
      }
    } catch (error) {
      console.error("Error deleting page:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  return (
    <div className="my-2">
      <h1 className="text-2xl font-bold mb-10">Pages</h1>
      <div className="w-1/2 mb-6">
        <Input
          labelPlacement="outside"
          placeholder="Enter page title"
          color="secondary"
          label="Page Title"
          value={newPage.title}
          onChange={(e) =>
            setNewPage((prev) => ({ ...prev, title: e.target.value }))
          }
        />
      </div>
      <div className="mb-6">
        <Editor
          tinymceScriptSrc="https://cdn.jsdelivr.net/npm/tinymce@7.6.0/tinymce.min.js"
          className="h-full"
          init={{
            license_key: "gpl",
            height: 300,
            menubar: false,
            placeholder: "Type here...",
            plugins: [],
            toolbar: `bold italic align customImageUploadButton link table customIframe | forecolor backcolor`,
            statusbar: false,
            resize: false,
          }}
          onEditorChange={(content) =>
            setNewPage((prev) => ({ ...prev, content }))
          }
        />
      </div>
      <div>
        <Button onPress={addPage}>Add Page</Button>
      </div>
      <div className="mt-6">
        {loading ? (
          <div className="flex justify-center items-center">
            <Spinner size="lg" color="secondary" />
          </div>
        ) : (
          pages.map((item, index) => (
            <div
              key={item._id}
              className="mb-2 flex justify-between items-center bg-slate-100 p-2 rounded-md"
            >
              <div className="flex items-center gap-4">
                <h1 className="mr-2 text-lg font-bold opacity-50">
                  {index + 1}
                </h1>
                <h2 className="font-bold text-lg">{item.title}</h2>
              </div>
              <div>
                <Button
                  size="sm"
                  className="bg-blue-600 text-white"
                  onPress={() => {}}
                >
                  Update
                </Button>
                <Button
                  size="sm"
                  className="bg-red-600 text-white ml-3"
                  onPress={() => deletePage(item._id)}
                  color="error"
                >
                  Delete
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Page;
