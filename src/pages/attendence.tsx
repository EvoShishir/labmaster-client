import CustomButton from "@/components/Core/CustomButton/CustomButton";
import Layout from "@/components/Layout/Layout";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import axios from "axios";
import React, { useEffect, useState } from "react";

type Props = {};

const CustomModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  attendance?: any;
}> = ({ isOpen, onClose, attendance }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex">
      <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-l font-medium">
            Attendance list of {attendance?.classId.name}
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
        <div className="grid grid-cols-2 border-b border-gray-300 mb-2">
          <h1 className="font-medium text-lg">Roll</h1>
          <h1 className="font-medium text-lg">Name</h1>
        </div>
        <div className="flex flex-col gap-2">
          {attendance?.attendees.map((std: any) => (
            <div key={std._id} className="grid grid-cols-2">
              <p>{std.roll}</p>
              <p>{std.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function Attendence({}: Props) {
  const [attendances, setAttendances] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [singleAttendance, setSingleAttendance] = useState<any>();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const fetchAttendance = async () => {
    const { data } = await axios.get("/api/attendance");
    setAttendances(data.attendances);
  };

  const fetchAttendanceData = async (attendance: any) => {
    const { data } = await axios.get(
      `/api/attendance?attendanceId=${attendance}`
    );
    setSingleAttendance(data.attendance);
    toggleModal();
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  return (
    <ProtectedRoute>
      <div>
        <Layout sideNumber={2}>
          <CustomModal
            isOpen={isModalOpen}
            onClose={toggleModal}
            attendance={singleAttendance}
          />
          <div className="flex flex-col gap-3">
            <CustomButton
              text="Add Attendance"
              onClick={() => {
                window.location.href = "/create-attendance";
              }}
            />
            {attendances.map((attendance) => (
              <div
                onClick={() => {
                  fetchAttendanceData(attendance._id);
                }}
                key={attendance._id}
                className="grid grid-cols-4 items-center w-full bg-green-100 p-3 rounded-md transition duration-400 ease-in-out hover:bg-green-300"
              >
                <div className="flex flex-col text-center border-r border-gray-500 px-3">
                  <h2 className="text-lg">{attendance?.classId?.time}</h2>
                  <h2>{attendance?.classId?.date}</h2>
                </div>
                <div className="px-3 border-r border-gray-500">
                  <h1 className="font-medium text-lg">
                    Teacher: {attendance?.classId?.createdBy?.name}
                  </h1>
                  <h3>{attendance?.classId?.name}</h3>
                </div>
                <strong className="px-3 border-r border-gray-500">
                  {attendance?.classId?.semester?.name}
                </strong>
                <h1 className="px-3 border-r border-gray-500">
                  Present: {attendance?.attendees.length}
                </h1>
              </div>
            ))}
          </div>
        </Layout>
      </div>
    </ProtectedRoute>
  );
}
