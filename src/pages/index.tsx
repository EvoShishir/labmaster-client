import React, { useEffect, useState } from "react";
import LoadingSpinner from "@/components/Core/LoadingSpinner/LoadingSpinner";
import Layout from "@/components/Layout/Layout";
import { Rubik } from "next/font/google";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import axios from "axios";
import Subjects from "@/components/Subjects/Subjects";

const rubik = Rubik({ subsets: ["latin"] });

type Props = {};

export default function Homepage({}: Props) {
  const [isTeacher, setIsTeacher] = useState(false);
  const [uid, setUid] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [semesterId, setSemesterId] = useState();

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
        } else if (data.user.semester) {
          setSemesterId(data.user.semester);
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
            <div>
              <Subjects
                semesterId={semesterId}
                uid={uid}
                isTeacher={isTeacher}
              />
            </div>
          )}
        </Layout>
      </section>
    </ProtectedRoute>
  );
}
