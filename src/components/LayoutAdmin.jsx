import { useState } from "react";
import AdminMenu from "./AdminMenu";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import UserOperation from "./UserOperation";
import Footer from "./Footer";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Outlet } from "react-router-dom";

function LayoutAdmin() {
  const [isSideBarCollapsed, setIsSideBarCollapsed] = useState(false);

  function toggleSideBar() {
    setIsSideBarCollapsed((isSideBarCollapsed) => !isSideBarCollapsed);
  }

  return (
    <div className="bg-stone-100 flex">
      <div className="h-screen bg-white flex flex-col justify-between items-center pb-9 transition-all">
        <AdminMenu collapsed={isSideBarCollapsed} />
        <IconCollapseSideBar
          onClick={toggleSideBar}
          isCollapsed={isSideBarCollapsed}
        />
      </div>
      <div className="flex flex-col flex-1 relative divide-y-[1px] divide-stone-300">
        <header className="flex justify-between px-5 py-3">
          <ButtonCollapseSideBar
            onClick={toggleSideBar}
            isCollapsed={isSideBarCollapsed}
          />
          <UserOperation />
        </header>
        <div className="px-5 py-4">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
}

function ButtonCollapseSideBar({ onClick, isCollapsed }) {
  return (
    <button onClick={onClick} className="text-xl">
      {isCollapsed ? <AiOutlineMenuUnfold /> : <AiOutlineMenuFold />}
    </button>
  );
}

function IconCollapseSideBar({ onClick, isCollapsed }) {
  return (
    <span onClick={onClick} className="cursor-pointer">
      {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
    </span>
  );
}

export default LayoutAdmin;
