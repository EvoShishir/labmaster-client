import Link from "next/link";
import React from "react";
import { rubik } from "./student-sign-up";
import CustomButton from "@/components/Core/CustomButton/CustomButton";

export default function SignUp() {
  const handleClick = (role: string) => {
    window.location.href = `/${role}-sign-up`;
  };
  return (
    <main
      className={`${rubik.className} min-h-[80vh] flex flex-col justify-center items-center px-4`}
    >
      <div className=" mb-8">
        <Link href={"/"} className="font-medium text-4xl text-center">
          <span className="text-green-800">LAB</span>{" "}
          <span className="text-blue-800">MASTER</span>
        </Link>
      </div>
      <h1 className="text-xl font-medium mb-6">
        Are you a student or teacher?
      </h1>

      <div className="grid grid-cols-2 justify-center gap-5">
        <CustomButton
          text="Student"
          onClick={() => handleClick("student")}
          style="w-full"
        />
        <CustomButton
          text="Teacher"
          onClick={() => handleClick("teacher")}
          style="w-full"
        />
      </div>
    </main>
  );
}
