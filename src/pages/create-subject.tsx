import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import CustomButton from "@/components/Core/CustomButton/CustomButton";

export default function CreateSubject() {
  const [name, setName] = useState("");
  const [semester, setSemester] = useState("");
  const [departments, setDepartments] = useState<
    { _id: string; name: string }[]
  >([]);

  useEffect(() => {
    fetchSemesters();
  }, []);

  const fetchSemesters = async () => {
    try {
      const baseURL = window.location.origin;
      const { data } = await axios.get(`${baseURL}/api/semesters`);
      setDepartments(data.semesters);
    } catch (error) {
      console.error("Error fetching semesters:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const createdBy = localStorage.getItem("labmaster_uid");
    try {
      const response = await axios.post("/api/subjects", {
        name: name,
        uid: createdBy,
        semesterId: semester,
      });

      toast.success("Subject created");

      console.log("Subject created:", response.data);
      window.location.href = "/";
    } catch (error: any) {
      toast.error(`${error.message} ${error.response.data.message}`);
      console.error("Error creating Subject:", error);
    }
  };

  return (
    <ProtectedRoute>
      <section className="container mx-auto px-4">
        <Layout sideNumber={1}>
          <h2 className="text-2xl font-bold mb-4">Create New Subject</h2>
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="mb-4">
              <label
                htmlFor="className"
                className="block text-sm font-semibold mb-1"
              >
                Subject Name:
              </label>
              <input
                type="text"
                id="className"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded py-2 px-3 text-sm focus:outline-none focus:border-blue-400"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="semester"
                className="block text-sm font-semibold mb-1"
              >
                Select Semester:
              </label>
              <select
                id="semester"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                className="w-full border rounded py-2 px-3 text-sm focus:outline-none focus:border-blue-400"
                required
              >
                <option value="" disabled>
                  Select Semester
                </option>
                {departments.map((dept) => (
                  <option key={dept._id} value={dept._id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>
            <CustomButton text="Create Subject" type="submit" />
          </form>
        </Layout>
      </section>
    </ProtectedRoute>
  );
}
