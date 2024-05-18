import CustomButton from "@/components/Core/CustomButton/CustomButton";
import Layout from "@/components/Layout/Layout";
import SingleProblem from "@/components/SingleProblem/SingleProblem";
import useFindUser from "@/hooks/UseFindUser";
import Image from "next/image";
import React from "react";

type Props = {};

function ProblemDiscussion({}: Props) {
  const user = useFindUser();

  return (
    <div>
      <Layout sideNumber={3}>
        <div
          className="grid grid-cols-3 gap-3"
          style={{ gridTemplateColumns: "1fr 2fr" }}
        >
          <div className="flex flex-col gap-2">
            <SingleProblem user={user} />
            <SingleProblem user={user} />
            <SingleProblem user={user} />
            <SingleProblem user={user} />
          </div>
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
              <h4 className="text-2xl font-medium">
                What is an ER diagram and what its types/uses?
              </h4>
            </div>
            <div className="mt-5">
              <h1 className="text-gray-600 font-semibold text-xl mb-8">
                Replies:
              </h1>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
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
                          {user.name.first} {user.name.last}
                        </h3>
                      </div>
                    </div>
                  )}
                  <p className="text-sm">
                    Impressive! Though it seems the drag feature could be
                    improved. But overall it looks incredible. You’ve nailed the
                    design and the responsiveness at various breakpoints works
                    really well.
                  </p>
                </div>
                <div className="flex flex-col gap-2">
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
                          {user.name.first} {user.name.last}
                        </h3>
                      </div>
                    </div>
                  )}
                  <p className="text-sm">
                    Impressive! Though it seems the drag feature could be
                    improved. But overall it looks incredible. You’ve nailed the
                    design and the responsiveness at various breakpoints works
                    really well.
                  </p>
                </div>
                <div className="flex flex-col gap-2">
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
                          {user.name.first} {user.name.last}
                        </h3>
                      </div>
                    </div>
                  )}
                  <p className="text-sm">
                    Impressive! Though it seems the drag feature could be
                    improved. But overall it looks incredible. You’ve nailed the
                    design and the responsiveness at various breakpoints works
                    really well.
                  </p>
                </div>

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
                    cols={40}
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
        </div>
      </Layout>
    </div>
  );
}

export default ProblemDiscussion;
