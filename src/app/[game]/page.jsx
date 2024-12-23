import React from "react";
import Game from "./game";
export default async function Page({ params }) {
  const slug = (await params).game;
  return (
    <div>
      {/* My Post: {slug}  */}
      <Game />{" "}
    </div>
  );
}
