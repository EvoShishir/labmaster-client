import Link from "next/link";
import React from "react";

function UpcomingLab() {
  return (
    <div className=" flex flex-col gap-3">
      <Link
        href={"#"}
        className="flex items-center w-full bg-green-100 p-3 rounded-md transition 400ms ease-in-out hover:bg-green-300"
      >
        <div className="flex flex-col text-center border-r-2 border-gray-500 px-3">
          <h2 className="text-lg">10:30 AM</h2>
          <h1>Monday, 20-05-2024</h1>
        </div>
        <div className="px-3">
          <h1 className="font-medium text-lg">Ditee Yeasmin</h1>
          <h3>Computer Network</h3>
        </div>
      </Link>
      <Link
        href={"#"}
        className="flex items-center w-full bg-green-100 p-3 rounded-md transition 400ms ease-in-out hover:bg-green-300"
      >
        <div className="flex flex-col text-center border-r-2 border-gray-500 px-3">
          <h2 className="text-lg">10:30 AM</h2>
          <h1>Monday, 20-05-2024</h1>
        </div>
        <div className="px-3">
          <h1 className="font-medium text-lg">Ditee Yeasmin</h1>
          <h3>Computer Network</h3>
        </div>
      </Link>
      <Link
        href={"#"}
        className="flex items-center w-full bg-green-100 p-3 rounded-md transition 400ms ease-in-out hover:bg-green-300"
      >
        <div className="flex flex-col text-center border-r-2 border-gray-500 px-3">
          <h2 className="text-lg">10:30 AM</h2>
          <h1>Monday, 20-05-2024</h1>
        </div>
        <div className="px-3">
          <h1 className="font-medium text-lg">Ditee Yeasmin</h1>
          <h3>Computer Network</h3>
        </div>
      </Link>
    </div>
  );
}

export default UpcomingLab;
