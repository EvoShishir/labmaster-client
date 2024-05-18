import Link from "next/link";
import React from "react";
import { CiMail, CiSettings } from "react-icons/ci";
import { GoDiscussionClosed } from "react-icons/go";
import { LuLayoutDashboard } from "react-icons/lu";

type sidebarNumber = {
  sideNumber: number;
};

const Sidebar = ({ sideNumber }: sidebarNumber) => {
  return (
    <div className="absolute min-h-[80vh] pr-2 border-r-2">
      <ul className="flex flex-col gap-1">
        <Link
          href={"/"}
          className={`${
            sideNumber === 1 ? `bg-blue-500 text-white` : `bg-white text-black`
          } flex items-center gap-2 rounded-lg px-4 py-2 cursor-pointer transition-colors duration-400 ease-in-out hover:bg-blue-500 hover:text-white`}
        >
          <LuLayoutDashboard /> Dashboard
        </Link>
        <Link
          href={"attendence"}
          className={`${
            sideNumber === 2 ? `bg-blue-500 text-white` : `bg-white text-black`
          } flex items-center gap-2 rounded-lg px-4 py-2 cursor-pointer transition-colors duration-400 ease-in-out hover:bg-blue-500 hover:text-white`}
        >
          <CiMail /> Attendence
        </Link>
        <Link
          href={"problem-discussion"}
          className={`${
            sideNumber === 3 ? `bg-blue-500 text-white` : `bg-white text-black`
          } flex items-center gap-2 rounded-lg px-4 py-2 cursor-pointer transition-colors duration-400 ease-in-out hover:bg-blue-500 hover:text-white`}
        >
          <GoDiscussionClosed /> Problem Discussion
        </Link>
        <Link
          href={"settings"}
          className={`${
            sideNumber === 4 ? `bg-blue-500 text-white` : `bg-white text-black`
          } flex items-center gap-2 rounded-lg px-4 py-2 cursor-pointer transition-colors duration-400 ease-in-out hover:bg-blue-500 hover:text-white`}
        >
          <CiSettings /> Settings
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;
