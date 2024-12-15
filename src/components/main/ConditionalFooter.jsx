// components/main/ConditionalHeader.js
"use client"; // Make this a client component

import { usePathname } from "next/navigation";
import Footer from "./footer";

export default function ConditionalHeader() {
  const pathname = usePathname();

  // Hide Header for `/admin` and paths under `/admin/`
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return <Footer />;
}
