"use client";
import React from "react";
import Link from "next/link";
const Header = () => {
  return (
    <div className="h-12 shadow-one sticky top-0 z-50 bg-white flex justify-between items-center px-5">
      <div className="flex justify-between items-center gap-4">
        <Link href={"/"}>
          <h1 className="text-lg font-bold">Game Website</h1>
        </Link>
      </div>
    </div>
  );
};

export default Header;
