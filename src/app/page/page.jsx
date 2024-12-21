"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

const PageContent = () => {
  const searchParams = useSearchParams();
  const pageId = searchParams?.get("pageId");

  const [pages, setPages] = useState([]);
  const [error, setError] = useState(null);

  const fetchPages = async () => {
    try {
      const response = await fetch("/api/game?dataCollection=Pages", {
        cache: "force-cache",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      let data = await response.json();

      data = data.filter((item) => item._id === pageId);

      setPages(data);
    } catch (error) {
      console.error("Error fetching pages:", error);
      setError("Failed to load pages. Please try again later.");
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="px-2 md:px-6 mt-2 md:mt-4">
      {pages.length > 0 ? (
        pages.map((item) => (
          <div key={item._id}>
            <h1 className="text-2xl font-bold">{item.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: item.content }} />
          </div>
        ))
      ) : (
        <div>Loading pages...</div>
      )}
    </div>
  );
};

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContent />
    </Suspense>
  );
};

export default Page;
