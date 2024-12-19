import React from "react";
import Link from "next/link";
import { cookies } from "next/headers";

export default async function Page({ grid, postlimit }) {
  const cookieStore = await cookies();
  const baseUrl = cookieStore.get("baseUrl")?.value || "http://localhost:3000"; // Fallback to localhost if cookie is not set

  // Decode the URL in case it's URL-encoded
  const decodedUrl = decodeURIComponent(baseUrl);

  const data = await fetch(`${decodedUrl}/api/game?dataCollection=GameList`);
  const posts = await data.json();
  return (
    <div className={`grid grid-cols-${grid} gap-5`}>
      {posts.slice(0, postlimit).map((post, index) => {
        return (
          <div key={index}>
            <Link href={`/${post._id}`}>
              <img
                className="w-full h-[100px] shadow-one rounded-md"
                src={post.image}
                alt=""
              />
            </Link>
          </div>
        );
      })}
    </div>
  );
}
