import Link from "next/link";
import React from "react";
import CustomButton from "../Core/CustomButton/CustomButton";
import Image from "next/image";
import useFindUser from "@/hooks/UseFindUser";

export default function Navbar() {
  const user = useFindUser();

  return (
    <section className="max-w-[1100px] m-auto">
      <div className="flex items-center justify-between mt-7">
        <Link href={"/"} className="font-medium text-2xl">
          <span className="text-green-800">LAB</span>{" "}
          <span className="text-blue-800">MASTER</span>
        </Link>
        <div className="justify-center">
          {user ? (
            <div className="flex items-center gap-2">
              <Image
                src={user.picture.thumbnail}
                alt={user.name.first}
                height={40}
                width={40}
                className="rounded-[50%]"
              />
              <div className="flex flex-col">
                <h3>
                  {user.name.first} {user.name.last}
                </h3>
                <button className="bg-red-500 rounded text-white w-24 transition 400ms ease-in-out justify-end hover:bg-red-800">
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <CustomButton text="Login" />
          )}
        </div>
      </div>
    </section>
  );
}
