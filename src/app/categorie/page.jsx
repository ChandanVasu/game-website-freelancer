"use client";
import GridGameOne from "@/components/main/gameGridOne";
import React from "react";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const searchParams = useSearchParams();
  const cat = searchParams.get("cat");

  return (
    <div className="px-2 md:px-6 mt-2 md:mt-4">
      <GridGameOne title={cat} filterData={cat}></GridGameOne>
    </div>
  );
};

export default Page;
