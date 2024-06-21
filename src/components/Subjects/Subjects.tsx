import axios from "axios";
import React, { useEffect, useState } from "react";
import CustomButton from "../Core/CustomButton/CustomButton";
import Image from "next/image";
import toast from "react-hot-toast";

const CustomModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  singleClass?: any;
  uid: any;
  comments?: any;
}> = ({ isOpen, onClose, singleClass, uid, comments }) => {
  const [body, setBody] = useState<string>("");

  const handleSubmit = async () => {
    try {
      await axios.post("/api/classDiscussion", {
        classId: singleClass._id,
        uid,
        comment: body,
      });
      toast.success("Comment Posted Successfully");
    } catch (error: any) {
      toast.error(`${error.message} ${error.response.data.message}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex">
      <div className="relative p-8 bg-white max-w-[1100px] m-auto flex-col flex rounded-lg max-h-[80vh] overflow-scroll">
        <div className="flex justify-between items-center mb-4 border-b border-gray-300">
          <h2 className="text-xl font-medium">
            {singleClass?.subject?.name} - {singleClass?.date}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="mb-2 border-b border-gray-300">
          <p>
            Topic Name: <b>{singleClass.topic}</b>
          </p>
          <p>
            Class Time: <b>{singleClass.time}</b>
          </p>
        </div>
        <div>
          <p className="mb-2 font-semibold">Class Discussions:</p>
          <div className="flex flex-col gap-2 mb-4">
            {comments.map((comment: any) => (
              <div
                key={comment._id}
                className="flex flex-col gap-2 bg-slate-100 rounded px-2 py-4"
              >
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
                      {comment.postedBy.name}
                    </h3>
                    <h4 className="text-xs">
                      at {new Date(comment.createdAt).toString()}
                    </h4>
                  </div>
                </div>
                <p className="text-sm">{comment.comment}</p>
              </div>
            ))}
          </div>
          <div className="flex items-start gap-3">
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
            <CustomButton text="Reply" onClick={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Subjects({ uid, isTeacher, semesterId }: any) {
  const [subjects, setSubjects] = useState<any>([]);
  const [classes, setClasses] = useState([]);
  const [activeSubject, setActiveSubject] = useState<any>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeClass, setActiveClass] = useState<any>();
  const [topic, setTopic] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [isFormActive, setIsFormActive] = useState(false);
  const [comments, setComments] = useState<any>([]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    if (isTeacher) {
      fetchTeacherSubjects(uid);
    } else if (semesterId) {
      fetchStudentSubjects(semesterId);
    }
  }, []);

  const fetchStudentSubjects = async (semesterId: String) => {
    const { data } = await axios.get(`/api/subjects?semesterId=${semesterId}`);
    setSubjects(data.subjects);
  };

  const fetchTeacherSubjects = async (uid: String) => {
    try {
      const baseURL = window.location.origin;
      const { data } = await axios.get(`${baseURL}/api/subjects?uid=${uid}`);
      setSubjects(data.subjects);
    } catch (error) {
      console.error("Error fetching teacher subjects:", error);
    }
  };

  const fetchClasses = async (subjectId: String) => {
    const { data } = await axios.get(`/api/classes?subjectId=${subjectId}`);
    setClasses(data.classes);
  };

  const fetchComments = async (classId: String) => {
    const { data } = await axios.get(`/api/classDiscussion?classId=${classId}`);
    setComments(data.discussions);
  };

  useEffect(() => {
    if (activeClass) {
      fetchComments(activeClass._id);
    }
  }, [activeClass]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/classes", {
        subjectId: activeSubject._id,
        topic: topic,
        time: time,
        date: date,
      });

      toast.success("Class created");

      console.log("Class created:", response.data);
      window.location.href = "/";
    } catch (error: any) {
      toast.error(`${error.message} ${error.response.data.message}`);
      console.error("Error creating Class:", error);
    }
  };

  return (
    <section className="grid grid-cols-3 gap-4">
      <CustomModal
        isOpen={isModalOpen}
        onClose={toggleModal}
        singleClass={activeClass}
        uid={uid}
        comments={comments}
      />
      <div className="w-[350px] overflow-y-scroll max-h-[80vh] pr-1">
        {isTeacher ? (
          <>
            <h1 className="mb-2 font-semibold text-xl">Subjects You Manage</h1>
            <div className="mb-2">
              <CustomButton
                style="w-full"
                text="Add new Subject"
                onClick={() => {
                  window.location.href = "/create-subject";
                }}
              />
            </div>
          </>
        ) : (
          <h1 className="mb-2 font-semibold text-xl">Your Subjects</h1>
        )}
        <div className="flex flex-col gap-2 overflow-scroll ">
          {subjects?.map((subject: any) => (
            <div
              key={subject._id}
              onClick={() => {
                fetchClasses(subject._id);
                setActiveSubject(subject);
                setIsFormActive(false);
              }}
              className="cursor-pointer flex items-center w-full bg-green-100 p-3 rounded-md transition 400ms ease-in-out hover:bg-green-300"
            >
              <div className="px-3">
                <p className="font-medium text-lg">{subject.name}</p>
                <p>Teacher: {subject.teacher.name}</p>
                <p>{subject.semester.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-[350px] overflow-y-scroll max-h-[80vh] pr-1">
        {isTeacher ? (
          <>
            <h1 className="mb-2 font-semibold text-xl">Your Classes</h1>
            <div className="mb-2">
              {activeSubject && (
                <CustomButton
                  style="w-full"
                  text="Add new Class"
                  onClick={() => {
                    setIsFormActive(true);
                  }}
                />
              )}
            </div>
          </>
        ) : (
          <h1 className="mb-2 font-semibold text-xl">Upcoming Classes</h1>
        )}
        {classes.length > 0 ? (
          <div className="flex flex-col gap-2 overflow-scroll ">
            {classes?.map((singleClass: any) => (
              <div
                onClick={() => {
                  toggleModal();
                  setActiveClass(singleClass);
                }}
                key={singleClass._id}
                className="cursor-pointer w-full bg-green-100 py-3 rounded-md transition 400ms ease-in-out hover:bg-green-300"
              >
                <div className="px-3">
                  <p className="font-medium text-lg">{singleClass.topic}</p>
                  <p>Subject: {singleClass.subject.name}</p>
                  <h2 className="text-md">
                    {singleClass.date} at {singleClass.time}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            {activeSubject ? (
              <p>
                No classes available for this subject{" "}
                <b>{activeSubject.name}</b>
              </p>
            ) : (
              <p>Click on a Subject to see or Classes</p>
            )}
          </div>
        )}
      </div>

      <div className="w-[350px] overflow-y-scroll max-h-[80vh] pr-1">
        {isFormActive && (
          <>
            <h1 className="mb-2 font-semibold text-xl">Add new Class</h1>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="mb-4">
                <p>
                  Adding class for <b>{activeSubject.name}</b>
                </p>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="className"
                  className="block text-sm font-semibold mb-1"
                >
                  Topic Name:
                </label>
                <input
                  type="text"
                  id="className"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full border rounded py-2 px-3 text-sm focus:outline-none focus:border-blue-400"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="classTime"
                  className="block text-sm font-semibold mb-1"
                >
                  Class Time:
                </label>
                <input
                  type="time"
                  id="classTime"
                  value={time}
                  onChange={(e) => {
                    setTime(e.target.value);
                  }}
                  className="w-full border rounded py-2 px-3 text-sm focus:outline-none focus:border-blue-400"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="classDate"
                  className="block text-sm font-semibold mb-1"
                >
                  Class Date:
                </label>
                <input
                  type="date"
                  id="classDate"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full border rounded py-2 px-3 text-sm focus:outline-none focus:border-blue-400"
                  required
                />
              </div>
              <CustomButton text="Create Class" type="submit" />
            </form>
          </>
        )}
      </div>
    </section>
  );
}
