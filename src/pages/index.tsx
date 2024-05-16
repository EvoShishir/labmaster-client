import Layout from "@/components/Layout/Layout";
import { Rubik } from "next/font/google";
import React from "react";

const rubik = Rubik({ subsets: ["latin"] });

type Props = {};

export default function Homepage({}: Props) {
  return (
    <section className={`${rubik.className}`}>
      <Layout>
        <div className="grid">
          <h1>Upcoming Lab Classes</h1>
        </div>
      </Layout>
    </section>
  );
}
