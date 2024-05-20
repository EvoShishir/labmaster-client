import Link from "next/link";
import React, { useEffect, useState } from "react";
import CustomButton from "../Core/CustomButton/CustomButton";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { handleLogout } from "@/userActions";
import useFindUser, { User } from "@/hooks/UseFindUser";

export default function Navbar() {
  const { user } = useFindUser();
  const [loggedInUser, setLoggedInUser] = useState<User | undefined>();

  useEffect(() => {
    setLoggedInUser(user);
  }, [user]);

  const handleLogoutClick = () => {
    handleLogout();
    setLoggedInUser(undefined);
  };

  return (
    <section className="max-w-[1300px] m-auto">
      <Toaster />
      <div className="flex items-center justify-between mt-7 shadow-md p-3">
        <Link href={"/"} className="font-medium text-2xl">
          <span className="text-green-800">LAB</span>{" "}
          <span className="text-blue-800">MASTER</span>
        </Link>
        <div className="justify-center">
          {loggedInUser ? (
            <div className="flex items-center gap-2">
              <Image
                src="/dp.png"
                alt="user image"
                height={40}
                width={40}
                className="rounded-[50%]"
              />
              <div className="flex flex-col items-center">
                <h3 className="font-medium">{loggedInUser.displayName}</h3>
                <button
                  onClick={() => {
                    handleLogoutClick();
                    toast.success("Logged Out Successfully");
                  }}
                  className="bg-red-500 rounded text-white w-full transition 400ms ease-in-out justify-end hover:bg-red-800"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link href={"/login"}>
              <CustomButton text="Login" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
