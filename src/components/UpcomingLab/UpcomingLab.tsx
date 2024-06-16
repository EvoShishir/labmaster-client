import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function UpcomingLab({ uid, isTeacher }: any) {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    if (isTeacher) {
      fetchTeacherClasses(uid);
    } else {
      fetchStudentClasses(uid);
    }
  }, []);

  const fetchStudentClasses = async (uid: String) => {
    const { data } = await axios.get(`/api/classes?uid=${uid}`);
    setClasses(data.classes);
  };

  const fetchTeacherClasses = async (uid: String) => {
    try {
      const baseURL = window.location.origin;
      const { data } = await axios.get(
        `${baseURL}/api/classes?createdBy=${uid}`
      );
      setClasses(data.classes);
    } catch (error) {
      console.error("Error fetching teacher classes:", error);
      return [];
    }
  };

  return (
    <section>
      <div className=" flex flex-col gap-3">
        {classes?.map((singleClass: any) => (
          <Link
            key={singleClass._id}
            href={"#"}
            className="flex items-center w-full bg-green-100 p-3 rounded-md transition 400ms ease-in-out hover:bg-green-300"
          >
            <div className="flex flex-col text-center border-r-2 border-gray-500 px-3">
              <h2 className="text-lg">{singleClass.time}</h2>
              <h2>{singleClass.date}</h2>
            </div>
            <div className="px-3">
              <h1 className="font-medium text-lg">
                Teacher: {singleClass.createdBy.name}
              </h1>
              <h3>{singleClass.name}</h3>
              <strong>{singleClass.semester.name}</strong>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default UpcomingLab;
