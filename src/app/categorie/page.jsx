"use client";

import React, { Suspense } from "react";
import GridGameOne from "@/components/main/gameGridOne";
import { useSearchParams } from "next/navigation";

const PageContent = () => {
  const searchParams = useSearchParams();
  const cat = searchParams.get("cat");

  return (
    <div className="px-2 md:px-6 mt-2 md:mt-4">
      <GridGameOne title={cat} filterData={cat}></GridGameOne>
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
