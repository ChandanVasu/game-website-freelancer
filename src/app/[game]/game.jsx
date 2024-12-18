import React from "react";

export default async function Page({ grid, postlimit }) {
  const data = await fetch(
    "http://localhost:3000//api/game?dataCollection=GameList"
  );
  const posts = await data.json();
  return (
    <div className={`grid grid-cols-${grid} gap-5`}>
      {posts.slice(0, postlimit).map((post, index) => {
        return (
          <div key={index}>
            <img
              className="w-full h-[100px] shadow-one rounded-md"
              src={post.image}
              alt=""
            />
          </div>
        );
      })}
    </div>
  );
}
