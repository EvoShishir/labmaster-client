import CustomButton from "@/components/Core/CustomButton/CustomButton";
import Layout from "@/components/Layout/Layout";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal } from "antd";

type Props = {};

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

  const fetchAttendaceData = async (attendance: any) => {
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
          {singleAttendance && (
            <Modal
              title={`Attendance list of ${singleAttendance.classId.name}`}
              open={isModalOpen}
              onCancel={toggleModal}
              footer={null}
            >
              <div className="grid grid-cols-2 border-b-slate-400 border-b-2 mb-2">
                <h1 className="font-semibold text-xl">Roll</h1>
                <h1 className="font-semibold text-xl">Name</h1>
              </div>
              <div className="flex flex-col gap-2">
                {singleAttendance.attendees.map((std: any) => (
                  <div key={std._id} className="grid grid-cols-2">
                    <b>{std.roll}</b>
                    <b>{std.name}</b>
                  </div>
                ))}
              </div>
            </Modal>
          )}
          <div className=" flex flex-col gap-3 ">
            <CustomButton
              text="Add Attendance"
              onClick={() => {
                window.location.href = "/create-attendance";
              }}
            />
            {attendances.map((singleAttendance) => (
              <div
                onClick={() => {
                  fetchAttendaceData(singleAttendance._id);
                }}
                key={singleAttendance?._id}
                className="grid grid-cols-4 items-center w-full bg-green-100 p-3 rounded-md transition 400ms ease-in-out hover:bg-green-300"
              >
                <div className="flex flex-col text-center border-r-2 border-gray-500 px-3">
                  <h2 className="text-lg">{singleAttendance?.classId?.time}</h2>
                  <h2>{singleAttendance?.classId?.date}</h2>
                </div>
                <div className="px-3 border-r-2 border-gray-500">
                  <h1 className="font-medium text-lg">
                    Teacher: {singleAttendance?.classId?.createdBy?.name}
                  </h1>
                  <h3>{singleAttendance?.classId?.name}</h3>
                </div>
                <strong className="px-3 border-r-2 border-gray-500">
                  {singleAttendance?.classId?.semester?.name}
                </strong>
                <h1 className="px-3 border-r-2 border-gray-500">
                  Present: {singleAttendance?.attendees.length}
                </h1>
                {/* <div className="px-3">
                  <CustomButton text="Update Attendance" />
                </div> */}
              </div>
            ))}
          </div>
        </Layout>
      </div>
    </ProtectedRoute>
  );
}
