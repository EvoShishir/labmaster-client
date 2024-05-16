import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import CustomButton from "../Core/CustomButton/CustomButton";
import Image from "next/image";

type user = {
  name: {
    first: string;
    last: string;
  };
  picture: {
    thumbnail: string;
  };
};

export default function Navbar() {
  const [user, setUser] = useState<user>();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const { data } = await axios.get("https://randomuser.me/api/");
    const userData: user = {
      name: {
        first: data.results[0].name.first,
        last: data.results[0].name.last,
      },
      picture: {
        thumbnail: data.results[0].picture.thumbnail,
      },
    };
    setUser(userData);
  };

  return (
    <section className="max-w-[1100px] m-auto">
      <div className="flex items-center justify-between mt-7">
        <Link href={"/"} className="font-medium text-2xl">
          <span className="text-green-800">LAB</span>{" "}
          <span className="text-blue-800">MASTER</span>
        </Link>
        <div className="justify-center">
          {user && user.picture.thumbnail ? (
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
                <button className="bg-red-500 rounded text-white w-24 transition 400ms justify-end hover:bg-red-800">
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
