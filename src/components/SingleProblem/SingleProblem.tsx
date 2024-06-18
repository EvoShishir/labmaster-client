import { User } from "@/hooks/useFindUser";
import { Post } from "@/pages/problem-discussion";
import Image from "next/image";
import React from "react";
import { FaRegComments } from "react-icons/fa";

type Props = {
  post: any;
  onClick?: () => void;
};

function SingleProblem({ post, onClick }: Props) {
  return (
    <div className="flex flex-col gap-3 ">
      <div className="bg-gray-50 border-2 gap-2 p-4 rounded-lg w-full">
        <div className="flex flex-col gap-2 mb-2">
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
                <h3>{post?.createdBy?.name}</h3>
              </div>
            </div>
          </div>
          <h4 className="text-lg font-medium">{post?.discussion}</h4>
        </div>
        <button
          onClick={onClick}
          className="text-gray-600 font-medium bg-white rounded-xl px-5 py-2 border-2 border-gray-300 flex items-center justify-center gap-2 transition 400ms ease-in-out hover:bg-slate-100"
        >
          <FaRegComments />
          Answer
        </button>
      </div>
    </div>
  );
}

export default SingleProblem;
