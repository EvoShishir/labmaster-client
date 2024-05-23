import React, { useEffect } from "react";
import { useRouter } from "next/router";
import LoadingSpinner from "@/components/Core/LoadingSpinner/LoadingSpinner";
import Layout from "@/components/Layout/Layout";
import SingleProblem from "@/components/SingleProblem/SingleProblem";
import UpcomingLab from "@/components/UpcomingLab/UpcomingLab";
import useFindUser from "@/hooks/useFindUser"; // Ensure the correct path here
import { Rubik } from "next/font/google";
import { Post } from "./problem-discussion";
import usePostsData from "@/hooks/usePostsData";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";

const rubik = Rubik({ subsets: ["latin"] });

type Props = {};

export default function Homepage({}: Props) {
  const { user } = useFindUser();
  const postsData = usePostsData();
  const router = useRouter();

  const handleClick = () => {
    router.push("/problem-discussion");
  };

  return (
    <ProtectedRoute>
      <section className={`${rubik.className}`}>
        <Layout sideNumber={1}>
          <section className="grid grid-cols-2 gap-4">
            <div>
              <h1 className="mb-6 font-semibold text-xl">
                Upcoming LAB Classes
              </h1>
              <UpcomingLab />
            </div>
            <div>
              <h1 className="mb-6 font-semibold text-xl">Recent Discussions</h1>
              {postsData.isLoading && <LoadingSpinner />}
              {postsData.data && (
                <div className="col-span-1 w-full flex justify-center flex-wrap gap-2 max-h-[80vh] overflow-y-scroll">
                  {postsData.data.posts.map((post: Post) => (
                    <div key={post.id} className="w-full">
                      <SingleProblem
                        user={user}
                        post={post}
                        onClick={handleClick}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </Layout>
      </section>
    </ProtectedRoute>
  );
}
