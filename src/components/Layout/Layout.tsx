import React, { ReactNode } from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import { Rubik } from "next/font/google";

const rubik = Rubik({ subsets: ["latin"] });

interface LayoutProps {
  children: ReactNode;
  sideNumber: number;
}

export default function Layout({ children, sideNumber }: LayoutProps) {
  return (
    <section
      className={`${rubik.className} flex flex-col max-w-[1100px] mx-auto`}
    >
      <div>
        <Navbar />
      </div>
      <div className="flex mt-6">
        <div className="min-w-[220px]">
          <Sidebar sideNumber={sideNumber} />
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
}
