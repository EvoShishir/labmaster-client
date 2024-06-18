import React, { useEffect, useState } from "react";
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
import CustomButton from "@/components/Core/CustomButton/CustomButton";
import axios from "axios";

const rubik = Rubik({ subsets: ["latin"] });

type Props = {};

export default function Homepage({}: Props) {
  const [isTeacher, setIsTeacher] = useState(false);
  const [uid, setUid] = useState();
  const [isLoading, setIsLoading] = useState(true);
  // const { user } = useFindUser();
  const postsData = usePostsData();
  const router = useRouter();

  const handleClick = () => {
    router.push("/problem-discussion");
  };

  const getUserData = async (uid: string | null) => {
    if (!uid) {
      setIsLoading(false);
      return;
    }
    try {
      const baseURL = window.location.origin;
      const { data } = await axios.get(`${baseURL}/api/users?uid=${uid}`);
      if (data?.user) {
        if (data.user.role === "Teacher") {
          setIsTeacher(true);
        }
        setUid(data.user.uid);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const uid = localStorage.getItem("labmaster_uid");
      getUserData(uid);
    }
  }, []);

  return (
    <ProtectedRoute>
      <section className={`${rubik.className}`}>
        <Layout sideNumber={1}>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <section className="grid grid-cols-2 gap-4">
              <div>
                {isTeacher ? (
                  <>
                    <div className="mb-6">
                      <CustomButton
                        text="Add new class"
                        onClick={() => {
                          window.location.href = "/create-class";
                        }}
                      />
                    </div>
                    <h1 className="mb-6 font-semibold text-xl">
                      Your LAB Classes
                    </h1>
                  </>
                ) : (
                  <h1 className="mb-6 font-semibold text-xl">
                    Upcoming Lab Classes
                  </h1>
                )}
                <UpcomingLab uid={uid} isTeacher={isTeacher} />
              </div>
              <div>
                <h1 className="mb-6 font-semibold text-xl">
                  Recent Discussions
                </h1>
                {postsData.isLoading && <LoadingSpinner />}
                {postsData.data && (
                  <div className="col-span-1 w-full flex justify-center flex-wrap gap-2 max-h-[75vh] overflow-y-scroll">
                    {postsData.data.discussions.map((problem: any) => (
                      <div key={problem._id} className="w-full">
                        <SingleProblem post={problem} onClick={handleClick} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          )}
        </Layout>
      </section>
    </ProtectedRoute>
  );
}
