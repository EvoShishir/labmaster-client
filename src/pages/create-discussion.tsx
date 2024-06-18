import Layout from "@/components/Layout/Layout";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Props = {};

const CreateDiscussion: React.FC<Props> = () => {
  const [uid, setUid] = useState<string | null>(null);
  const [body, setBody] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUid = localStorage.getItem("labmaster_uid");
      setUid(storedUid);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("/api/discussion", {
        uid,
        discussion: body,
      });
      toast.success("Discussion created successfully");
      window.location.href = "/problem-discussion";
      setBody(""); // Clear form after successful submission
    } catch (error: any) {
      console.error("Error creating discussion:", error);
      toast.error(`${error.message} ${error.response.data.message}`);
    }
  };

  return (
    <ProtectedRoute>
      <Layout sideNumber={3}>
        <div className="p-4">
          <h1 className="text-2xl mb-4">Create Discussion</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="body" className="block mb-2">
                Discussion Body:
              </label>
              <textarea
                id="body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="border border-gray-300 p-2 w-[500px]"
                rows={5}
                cols={8}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded"
            >
              Create Discussion
            </button>
          </form>
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

export default CreateDiscussion;
