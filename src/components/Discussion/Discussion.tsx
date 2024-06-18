import React, { useEffect, useState } from "react";
import CustomButton from "../Core/CustomButton/CustomButton";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";

const Discussion = ({ post }: any) => {
  const [uid, setUid] = useState<string | null>(null);
  const [body, setBody] = useState<string>("");
  const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUid = localStorage.getItem("labmaster_uid");
      setUid(storedUid);
    }
  }, []);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const { data } = await axios.get(
        `/api/comments?postId=${post.discussion._id}`
      );
      setComments(data.comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
      toast.error("Error fetching comments");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("/api/comments", {
        uid,
        post: post.discussion._id,
        comment: body,
      });
      toast.success("Comment posted");
      setBody(""); // Clear form after successful submission
      fetchComments(); // Fetch latest comments
    } catch (error: any) {
      console.error("Error posting comment:", error);
      toast.error(`${error.message} ${error.response.data.message}`);
    }
  };

  return (
    <div className="pl-2 border-gray-300">
      <div className="flex flex-col gap-2 border-b-2 py-2">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/dp.png"
              alt="dp"
              height={40}
              width={40}
              className="rounded-[50%]"
            />
            <div className="flex flex-col">
              <h3>{post.discussion.createdBy.name}</h3>
            </div>
          </div>
        </div>
        <h4 className="text-2xl font-medium">{post.discussion.discussion}</h4>
      </div>
      <div className="mt-5">
        <h1 className="text-gray-600 font-semibold text-xl mb-8">Replies:</h1>
        <div className="flex flex-col gap-6">
          {comments?.map((comment: any) => {
            return (
              <div key={comment._id} className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <Image
                    src="/dp.png"
                    alt="dp"
                    height={30}
                    width={30}
                    className="rounded-[50%]"
                  />
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold">
                      {comment.createdBy.name}
                    </h3>
                    <h4 className="text-xs">
                      at {new Date(comment.createdAt).toString()}
                    </h4>
                  </div>
                </div>
                <p className="text-sm">{comment.comment}</p>
              </div>
            );
          })}

          <form onSubmit={handleSubmit} className="flex items-start gap-3">
            <Image
              src="/dp.png"
              alt="dp"
              height={30}
              width={30}
              className="rounded-[50%]"
            />
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              cols={60}
              rows={4}
              className="outline-none border-2 rounded p-3"
              name="reply"
              id="body"
              placeholder="Add a comment..."
              required
            />
            <CustomButton text="Reply" type="submit" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Discussion;
