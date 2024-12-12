import Header from "./header";
import SideBar from "./sidebar";
export default function Layout({ children }) {
  return (
    <div>
      <Header />
      <div className="">
        <div className="fixed left-0 w-72 h-full bg-stone-100 rounded-tr-md hidden md:block p-5">
          <SideBar />
        </div>
        <div className="ml-0 md:ml-80 bg-slate-100  min-h-screen rounded-tl-md p-2">
          {children}
        </div>
      </div>
    </div>
  );
}
