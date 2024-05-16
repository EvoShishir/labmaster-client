import Navbar from "@/components/Navbar/Navbar";
import { Rubik } from "next/font/google";

const rubik = Rubik({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={` ${rubik.className}`}>
      <Navbar />
      <div>
        <h1></h1>
      </div>
    </main>
  );
}
