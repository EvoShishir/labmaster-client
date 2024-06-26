import CustomButton from "@/components/Core/CustomButton/CustomButton";
import LoadingSpinner from "@/components/Core/LoadingSpinner/LoadingSpinner";
import Discussion from "@/components/Discussion/Discussion";
import Layout from "@/components/Layout/Layout";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import SingleProblem from "@/components/SingleProblem/SingleProblem";
import useFindUser from "@/hooks/useFindUser";
import usePostsData from "@/hooks/usePostsData";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";

export type Post = {
  id: number;
  title: string;
};

function ProblemDiscussion() {
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  const postsData = usePostsData();

  const singlePost = useQuery({
    queryKey: ["singlePost", selectedPostId],
    queryFn: async ({ queryKey }) => {
      const id = queryKey[1];
      const res = await axios.get(
        `/api/discussion?discussionId=${selectedPostId}`
      );
      return res.data;
    },
    enabled: !!selectedPostId,
  });

  const postComments = useQuery({
    queryKey: ["postComments", selectedPostId],
    queryFn: async ({ queryKey }) => {
      const id = queryKey[1];
      const res = await axios.get(`/api/comments?postId=${selectedPostId}`);

      return res.data;
    },
    enabled: !!selectedPostId,
  });

  const handleClick = (id: number) => {
    setSelectedPostId(id);
  };

  return (
    <ProtectedRoute>
      <div>
        <Layout sideNumber={3}>
          {postsData.isLoading && <LoadingSpinner />}
          {postsData.data ? (
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-1 w-full flex justify-center flex-wrap gap-2 max-h-[80vh] overflow-y-scroll">
                <CustomButton
                  style="w-full"
                  text="Post your Problem"
                  onClick={() => {
                    window.location.href = "/create-discussion";
                  }}
                />
                {postsData.data.discussions.map((problem: any) => (
                  <div key={problem._id} className="w-full">
                    <SingleProblem
                      post={problem}
                      onClick={() => handleClick(problem._id)}
                    />
                  </div>
                ))}
              </div>
              {singlePost.isLoading && (
                <div className="col-span-2">
                  <LoadingSpinner />
                </div>
              )}
              {singlePost.data ? (
                <div className="col-span-2 max-h-[80vh] overflow-y-scroll">
                  <Discussion
                    post={singlePost.data}
                    comments={postComments.data?.comments}
                  />
                </div>
              ) : (
                <div>{singlePost.error?.message}</div>
              )}
            </div>
          ) : (
            <div>{postsData.error?.message}</div>
          )}
        </Layout>
      </div>
    </ProtectedRoute>
  );
}

export default ProblemDiscussion;
