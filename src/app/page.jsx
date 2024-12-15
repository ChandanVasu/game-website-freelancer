import TopArea from "@/components/main/topArea";
import GridGameOne from "@/components/main/gameGridOne";

export default function Home() {
  return (
    <div className="space-y-4 p-6">
      <TopArea></TopArea>
      <GridGameOne></GridGameOne>
      <GridGameOne></GridGameOne>
    </div>
  );
}
