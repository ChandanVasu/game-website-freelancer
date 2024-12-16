import TopArea from "@/components/main/topArea";
import GridGameOne from "@/components/main/gameGridOne";
import Categorie from "@/components/main/categorie";

export default function Home() {
  return (
    <div className="space-y-4 p-3 md:p-6">
      <TopArea></TopArea>
      <GridGameOne sort={true}></GridGameOne>
      <GridGameOne title={"Car Games"} filterData={"Car Games"}></GridGameOne>
      <Categorie></Categorie>
    </div>
  );
}
