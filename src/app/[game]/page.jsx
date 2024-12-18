import GamePage from "./game";
import { FaEye } from "react-icons/fa";
import GridGameOne from "@/components/main/gameGridOne";
import Categorie from "@/components/main/categorie";

export default async function Page({ params }) {
  const slug = (await params).game;
  const data = await fetch(`http://localhost:3000//api/findgame?id=${slug}`);
  const posts = await data.json();
  return (
    <div className="px-2 md:px-6 mt-2">
      <div className="flex md:flex-row flex-col gap-5">
        <div className="w-[300px] hidden md:block">
          <GamePage grid={1} postlimit={5} />
        </div>
        <div className="w-full">
          <iframe
            className="w-full h-[550px] rounded-md shadow-one"
            src={posts.url}
          ></iframe>
          <div className="h-12 w-full shadow-one mt-2 rounded-md bg-slate-200 flex justify-between items-center px-5">
            <h1 className="text-lg font-bold">{posts.title}</h1>
            <div className="flex gap-1 justify-center items-center">
              <span>
                <FaEye />
              </span>
              <span> {posts.views}</span>
            </div>
          </div>
        </div>
        <div className="w-[600px] hidden md:block">
          <GamePage grid={2} postlimit={10} />
        </div>
      </div>
      <div className="mt-5">
        <GridGameOne title={"Related Games"}></GridGameOne>
      </div>
      <div className="mt-5">
        <Categorie></Categorie>
      </div>
    </div>
  );
}
