import CustomButton from "@/components/Core/CustomButton/CustomButton";
import Layout from "@/components/Layout/Layout";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Props = {};

export default function Attendence({}: Props) {
  const [attendances, setAttendances] = useState<any[]>([]);

  const fetchAttendance = async () => {
    const { data } = await axios.get("/api/attendance");
    setAttendances(data.attendances);
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  return (
    <ProtectedRoute>
      <div>
        <Layout sideNumber={2}>
          <div className=" flex flex-col gap-3 ">
            <CustomButton
              text="Add Attendance"
              onClick={() => {
                window.location.href = "/create-attendance";
              }}
            />
            {attendances.map((singleAttendance) => (
              <Link
                key={singleAttendance?._id}
                href={"#"}
                className="grid grid-cols-4 items-center w-full bg-green-100 p-3 rounded-md transition 400ms ease-in-out hover:bg-green-300"
              >
                <div className="flex flex-col text-center border-r-2 border-gray-500 px-3">
                  <h2 className="text-lg">{singleAttendance?.classId?.time}</h2>
                  <h2>{singleAttendance?.classId?.date}</h2>
                </div>
                <div className="px-3 border-r-2 border-gray-500">
                  <h1 className="font-medium text-lg">
                    Teacher: {singleAttendance?.classId.createdBy?.name}
                  </h1>
                  <h3>{singleAttendance?.classId.name}</h3>
                </div>
                <strong className="px-3 border-r-2 border-gray-500">
                  {singleAttendance?.classId.semester?.name}
                </strong>
                <h1 className="px-3 border-r-2 border-gray-500">
                  Present: {singleAttendance?.attendees.length}
                </h1>
                {/* <div className="px-3">
                  <CustomButton text="Update Attendance" />
                </div> */}
              </Link>
            ))}
          </div>
        </Layout>
      </div>
    </ProtectedRoute>
  );
}
