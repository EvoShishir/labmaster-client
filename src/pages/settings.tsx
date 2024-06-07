import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "@/components/Layout/Layout";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import CustomButton from "@/components/Core/CustomButton/CustomButton";
import { Rubik } from "next/font/google";
import toast from "react-hot-toast";
import { updateProfile } from "firebase/auth";
import { auth } from "@/firebase";

const rubik = Rubik({ subsets: ["latin"] });

type Props = {};

function Settings({}: Props) {
  const [userData, setUserData] = useState({
    name: "",
    semesterId: "",
    roll: "",
  });
  const [semesters, setSemesters] = useState([]);
  const [isTeacher, setIsTeacher] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      fetchUserData();
    }
    fetchSemesters();
  }, []);

  const fetchUserData = async () => {
    try {
      const uid = localStorage.getItem("labmaster_uid"); // Adjust if UID is stored elsewhere
      const baseURL = window.location.origin;
      const { data } = await axios.get(`${baseURL}/api/users?uid=${uid}`);
      if (data.user.role === "Teacher") {
        setIsTeacher(true);
      }
      setUserData({
        name: data.user.name,
        semesterId: data.user.semester,
        roll: data.user.roll,
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchSemesters = async () => {
    try {
      const baseURL = window.location.origin;
      const { data } = await axios.get(`${baseURL}/api/semesters`);
      setSemesters(data.semesters);
    } catch (error) {
      console.error("Error fetching semesters:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const uid = localStorage.getItem("labmaster_uid");
      const baseURL = window.location.origin;
      await axios.put(`${baseURL}/api/users`, {
        uid: uid,
        name: userData.name,
        semesterId: userData.semesterId,
        roll: userData.roll,
      });
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: userData.name,
        });
      } else {
        toast.error("User is not authenticated");
      }
      toast.success("User data updated successfully!");
      window.location.reload();
    } catch (error) {
      toast.error("Error updating user data");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  return (
    <ProtectedRoute>
      <section className={`${rubik.className}`}>
        <Layout sideNumber={4}>
          {isTeacher ? (
            <div className="flex justify-center items-center">
              <form
                className="w-full max-w-lg bg-white p-8 "
                onSubmit={handleSubmit}
              >
                <h1 className="text-2xl font-semibold mb-6">User Settings</h1>

                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={userData.name}
                    onChange={handleChange}
                    className="w-full border rounded py-2 px-3 text-sm focus:outline-none focus:border-blue-400"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="roll"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Teacher Identification Number
                  </label>
                  <input
                    type="number"
                    id="roll"
                    value={userData.roll}
                    onChange={handleChange}
                    className="w-full border rounded py-2 px-3 text-sm focus:outline-none focus:border-blue-400"
                    required
                  />
                </div>

                <div className="flex justify-center">
                  <CustomButton text="Update" type="submit" style="w-full" />
                </div>
              </form>
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <form
                className="w-full max-w-lg bg-white p-8 "
                onSubmit={handleSubmit}
              >
                <h1 className="text-2xl font-semibold mb-6">User Settings</h1>

                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={userData.name}
                    onChange={handleChange}
                    className="w-full border rounded py-2 px-3 text-sm focus:outline-none focus:border-blue-400"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="roll"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Roll Number
                  </label>
                  <input
                    type="number"
                    id="roll"
                    value={userData.roll}
                    onChange={handleChange}
                    className="w-full border rounded py-2 px-3 text-sm focus:outline-none focus:border-blue-400"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="semesterId"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Semester
                  </label>
                  <select
                    id="semesterId"
                    value={userData.semesterId}
                    onChange={handleChange}
                    className="w-full border rounded py-2 px-3 text-sm focus:outline-none focus:border-blue-400"
                    required
                  >
                    <option value="" disabled>
                      Select your semester
                    </option>
                    {semesters.map((semester: any) => (
                      <option key={semester._id} value={semester._id}>
                        {semester.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-center">
                  <CustomButton text="Update" type="submit" style="w-full" />
                </div>
              </form>
            </div>
          )}
        </Layout>
      </section>
    </ProtectedRoute>
  );
}

export default Settings;
