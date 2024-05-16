import React from "react";
import { CiMail, CiSettings } from "react-icons/ci";
import { GoDiscussionClosed } from "react-icons/go";
import { LuLayoutDashboard } from "react-icons/lu";

const Sidebar = () => {
  return (
    <div className="fixed">
      <ul className="flex flex-col gap-1">
        <li className="flex items-center gap-2 rounded-lg px-4 py-2 cursor-pointer transition-colors duration-400 ease-in-out hover:bg-blue-500 hover:text-white">
          <LuLayoutDashboard /> Dashboard
        </li>
        <li className="flex items-center gap-2 rounded-lg px-4 py-2 cursor-pointer transition-colors duration-400 ease-in-out hover:bg-blue-500 hover:text-white">
          <CiMail /> Attendence
        </li>
        <li className="flex items-center gap-2 rounded-lg px-4 py-2 cursor-pointer transition-colors duration-400 ease-in-out hover:bg-blue-500 hover:text-white">
          <GoDiscussionClosed /> Problem Discussion
        </li>
        <li className="flex items-center gap-2 rounded-lg px-4 py-2 cursor-pointer transition-colors duration-400 ease-in-out hover:bg-blue-500 hover:text-white">
          <CiSettings /> Settings
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
