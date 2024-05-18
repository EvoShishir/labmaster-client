import Layout from "@/components/Layout/Layout";
import SingleProblem from "@/components/SingleProblem/SingleProblem";
import UpcomingLab from "@/components/UpcomingLab/UpcomingLab";
import useFindUser from "@/hooks/UseFindUser";
import { Rubik } from "next/font/google";
import React from "react";

const rubik = Rubik({ subsets: ["latin"] });

type Props = {};

export default function Homepage({}: Props) {
  const user = useFindUser();

  return (
    <section className={`${rubik.className}`}>
      <Layout sideNumber={1}>
        <section className="grid grid-cols-2 gap-4">
          <div>
            <h1 className="mb-6 font-semibold text-xl">Upcoming LAB Classes</h1>
            <UpcomingLab />
          </div>
          <div>
            <h1 className="mb-6 font-semibold text-xl">Recent Discussions</h1>
            <SingleProblem user={user} />
          </div>
        </section>
      </Layout>
    </section>
  );
}
