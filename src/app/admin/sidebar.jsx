"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Hook to get the current pathname
import { CiHome } from "react-icons/ci";
import { BiSolidCollection } from "react-icons/bi";
import { IoMdPricetag } from "react-icons/io";
import { TbUserFilled } from "react-icons/tb";
import { FaImages } from "react-icons/fa";
import { IoIosAnalytics } from "react-icons/io";
import { RiDiscountPercentFill } from "react-icons/ri";
import { SiMinutemailer } from "react-icons/si";
import { IoIosColorPalette } from "react-icons/io";
import { MdOutlineAutoGraph, MdSettings, MdUpdate } from "react-icons/md";
import { BsGearFill, BsTrash3 } from "react-icons/bs";
import { FaBlog, FaAd } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

const SideBar = () => {
  const pathname = usePathname(); // Get the current path

  return (
    <div>
      <ul className="flex flex-col gap-2">
        <Link href="/">
          <li
            className={`flex gap-2 items-center justify-start px-3 py-1 rounded-md text-base ${
              pathname === "/" ? "bg-white" : "hover:bg-white/60"
            }`}
          >
            <CiHome />
            <p className="font-medium text-sm">Dashboard</p>
          </li>
        </Link>

        <Link href="/games">
          <li
            className={`flex gap-2 items-center justify-start px-3 py-1 rounded-md text-base ${
              pathname === "/games" ? "bg-white" : "hover:bg-white/60"
            }`}
          >
            <BiSolidCollection />
            <p className="font-medium text-sm">Games</p>
          </li>
        </Link>

        <Link href="/featured-games">
          <li
            className={`flex gap-2 items-center justify-start px-3 py-1 rounded-md text-base ${
              pathname === "/featured-games" ? "bg-white" : "hover:bg-white/60"
            }`}
          >
            <IoMdPricetag />
            <p className="font-medium text-sm">Featured Games</p>
          </li>
        </Link>

        <Link href="/categories">
          <li
            className={`flex gap-2 items-center justify-start px-3 py-1 rounded-md text-base ${
              pathname === "/categories" ? "bg-white" : "hover:bg-white/60"
            }`}
          >
            <TbUserFilled />
            <p className="font-medium text-sm">Categories</p>
          </li>
        </Link>

        <Link href="/users">
          <li
            className={`flex gap-2 items-center justify-start px-3 py-1 rounded-md text-base ${
              pathname === "/users" ? "bg-white" : "hover:bg-white/60"
            }`}
          >
            <FaImages />
            <p className="font-medium text-sm">Users</p>
          </li>
        </Link>

        <Link href="/comments">
          <li
            className={`flex gap-2 items-center justify-start px-3 py-1 rounded-md text-base ${
              pathname === "/comments" ? "bg-white" : "hover:bg-white/60"
            }`}
          >
            <IoIosAnalytics />
            <p className="font-medium text-sm">Comments</p>
          </li>
        </Link>

        <Link href="/pages">
          <li
            className={`flex gap-2 items-center justify-start px-3 py-1 rounded-md text-base ${
              pathname === "/pages" ? "bg-white" : "hover:bg-white/60"
            }`}
          >
            <RiDiscountPercentFill />
            <p className="font-medium text-sm">Pages</p>
          </li>
        </Link>

        <Link href="/blog">
          <li
            className={`flex gap-2 items-center justify-start px-3 py-1 rounded-md text-base ${
              pathname === "/blog" ? "bg-white" : "hover:bg-white/60"
            }`}
          >
            <FaBlog />
            <p className="font-medium text-sm">Blog</p>
          </li>
        </Link>

        <Link href="/reports">
          <li
            className={`flex gap-2 items-center justify-start px-3 py-1 rounded-md text-base ${
              pathname === "/reports" ? "bg-white" : "hover:bg-white/60"
            }`}
          >
            <MdOutlineAutoGraph />
            <p className="font-medium text-sm">Reports</p>
          </li>
        </Link>

        <Link href="/auto-fetching">
          <li
            className={`flex gap-2 items-center justify-start px-3 py-1 rounded-md text-base ${
              pathname === "/auto-fetching" ? "bg-white" : "hover:bg-white/60"
            }`}
          >
            <MdUpdate />
            <p className="font-medium text-sm">Auto Fetching</p>
          </li>
        </Link>

        <Link href="/sections">
          <li
            className={`flex gap-2 items-center justify-start px-3 py-1 rounded-md text-base ${
              pathname === "/sections" ? "bg-white" : "hover:bg-white/60"
            }`}
          >
            <IoIosColorPalette />
            <p className="font-medium text-sm">Sections</p>
          </li>
        </Link>

        <Link href="/themes">
          <li
            className={`flex gap-2 items-center justify-start px-3 py-1 rounded-md text-base ${
              pathname === "/themes" ? "bg-white" : "hover:bg-white/60"
            }`}
          >
            <BsGearFill />
            <p className="font-medium text-sm">Themes</p>
          </li>
        </Link>

        <Link href="/advertisement">
          <li
            className={`flex gap-2 items-center justify-start px-3 py-1 rounded-md text-base ${
              pathname === "/advertisement" ? "bg-white" : "hover:bg-white/60"
            }`}
          >
            <FaAd />
            <p className="font-medium text-sm">Advertisement</p>
          </li>
        </Link>

        <Link href="/settings">
          <li
            className={`flex gap-2 items-center justify-start px-3 py-1 rounded-md text-base ${
              pathname === "/settings" ? "bg-white" : "hover:bg-white/60"
            }`}
          >
            <MdSettings />
            <p className="font-medium text-sm">Settings</p>
          </li>
        </Link>

        <Link href="/delete-all-games">
          <li
            className={`flex gap-2 items-center justify-start px-3 py-1 rounded-md text-base ${
              pathname === "/delete-all-games" ? "bg-white" : "hover:bg-white/60"
            }`}
          >
            <BsTrash3 />
            <p className="font-medium text-sm">Delete All Games</p>
          </li>
        </Link>

        <Link href="/logout">
          <li
            className={`flex gap-2 items-center justify-start px-3 py-1 rounded-md text-base ${
              pathname === "/logout" ? "bg-white" : "hover:bg-white/60"
            }`}
          >
            <FiLogOut />
            <p className="font-medium text-sm">Logout</p>
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default SideBar;
