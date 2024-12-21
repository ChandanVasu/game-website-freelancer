import TopArea from "@/components/main/topArea";
import GridGameOne from "@/components/main/gameGridOne";
import Categorie from "@/components/main/categorie";
import Banner from "@/components/main/ad/banner";
import Banner2 from "@/components/main/ad/banner2";

export default function Home() {
  return (
    <div className="space-y-4 p-3 md:p-6">
      <TopArea></TopArea>
      <Banner></Banner>
      <GridGameOne sort={true}></GridGameOne>
      <Banner2></Banner2>
      <GridGameOne title={"Car Games"} filterData={"Car Games"}></GridGameOne>
      <Banner></Banner>
      <GridGameOne sort={true} title={"Racing"} filterData={"Racing"}></GridGameOne>
      <Banner2></Banner2>
      <GridGameOne sort={true} title={"Fighting"} filterData={"Fighting"}></GridGameOne>
      <Banner></Banner>
      <Categorie></Categorie>
      <Banner></Banner>
    </div>
  );
}
