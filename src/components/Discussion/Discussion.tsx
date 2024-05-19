import React from "react";
import CustomButton from "../Core/CustomButton/CustomButton";
import Image from "next/image";
import { User } from "@/hooks/UseFindUser";

type Props = {
  user: User | undefined;
  post: {
    id: number;
    title: string;
    body: string;
    userId: number;
    tags: string[];
    reactions: number;
  };
  comments: Comment[];
};

type Comment = {
  id: number;
  body: string;
  postId: number;
  user: {
    id: number;
    username: string;
  };
};

const Discussion = ({ user, post, comments }: Props) => {
  return (
    <div className="pl-2 border-gray-300">
      <div className="flex flex-col gap-2 border-b-2 py-2">
        <div>
          {user && (
            <div className="flex items-center gap-3">
              <Image
                src={user.picture.thumbnail}
                alt={user.name.first}
                height={40}
                width={40}
                className="rounded-[50%]"
              />
              <div className="flex flex-col">
                <h3>
                  {user.name.first} {user.name.last}
                </h3>
              </div>
            </div>
          )}
        </div>
        <h4 className="text-2xl font-medium">{post.title}</h4>
      </div>
      <div className="mt-5">
        <h1 className="text-gray-600 font-semibold text-xl mb-8">Replies:</h1>
        <div className="flex flex-col gap-6">
          {comments?.map((comment) => {
            return (
              <div key={comment.id} className="flex flex-col gap-2">
                {user && (
                  <div className="flex items-center gap-3">
                    <Image
                      src={user.picture.thumbnail}
                      alt={user.name.first}
                      height={30}
                      width={30}
                      className="rounded-[50%]"
                    />
                    <div className="flex flex-col">
                      <h3 className="text-sm font-semibold">
                        {comment.user.username}
                      </h3>
                    </div>
                  </div>
                )}
                <p className="text-sm">{comment.body}</p>
              </div>
            );
          })}

          <div className="flex items-start gap-3">
            {user && (
              <Image
                src={user.picture.thumbnail}
                alt={user.name.first}
                height={30}
                width={30}
                className="rounded-[50%]"
              />
            )}
            <textarea
              cols={60}
              rows={4}
              className="outline-none border-2 rounded p-3"
              name="reply"
              id=""
              placeholder="Add a comment..."
            />
            <CustomButton text="Reply" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discussion;
