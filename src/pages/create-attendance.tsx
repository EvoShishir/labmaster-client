import CustomButton from "@/components/Core/CustomButton/CustomButton";
import Layout from "@/components/Layout/Layout";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

type ClassType = {
  _id: string;
  name: string;
  semester: {
    _id: string;
    name: string;
  };
  date: any;
};

type UserType = {
  _id: string;
  name: string;
  semester: string;
  roll: number;
};

type Props = {};

const CreateAttendance: React.FC<Props> = () => {
  const [classes, setClasses] = useState<ClassType[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserType[]>([]);

  console.log(filteredUsers);

  const fetchClasses = async (uid: any) => {
    const { data } = await axios.get(
      `http://localhost:3000/api/classes?createdBy=${uid}`
    );
    const sortedClasses = data.classes.sort((a: any, b: any) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    setClasses(sortedClasses);
  };

  const fetchUsers = async () => {
    const { data } = await axios.get("http://localhost:3000/api/users");
    setUsers(data.users);
    console.log(data.users);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const uid = localStorage.getItem("labmaster_uid");
      fetchClasses(uid);
      fetchUsers();
    }
  }, []);

  useEffect(() => {
    if (selectedClass) {
      const filtered = filterUsersByClassSemester(
        users,
        classes,
        selectedClass
      );
      setFilteredUsers(filtered);
    }
  }, [selectedClass, users, classes]);

  const handleClassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClass(e.target.value);
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userId = e.target.value;
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/attendance", {
        classId: selectedClass,
        attendees: selectedUsers,
      });
      toast.success("Attendance created successfully");
      window.location.href = "/attendance";
    } catch (error: any) {
      console.error("Error creating attendance:", error.response.data.message);
      toast.error(`${error.message} ${error.response.data.message}`);
    }
  };

  const filterUsersByClassSemester = (
    users: UserType[],
    classes: ClassType[],
    selectedClass: string
  ): UserType[] => {
    const selectedClassSemester = classes.find(
      (cls) => cls._id === selectedClass
    )?.semester._id;

    return users.filter((user) => user.semester === selectedClassSemester);
  };

  return (
    <ProtectedRoute>
      <Layout sideNumber={2}>
        <div className="p-4">
          <h1 className="text-2xl mb-4">Create Attendance</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="class" className="block mb-2">
                Select Class:
              </label>
              <select
                id="class"
                value={selectedClass}
                onChange={handleClassChange}
                className="border border-gray-300 p-2 w-full"
              >
                <option value="" disabled>
                  --Select Class--
                </option>
                {classes.map((cls) => (
                  <option key={cls._id} value={cls._id}>
                    {cls.name} - {cls.date}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2">Select Students:</label>
              {filteredUsers && filteredUsers.length > 0 ? (
                filteredUsers.map((user: UserType) => (
                  <div key={user._id} className="mb-2">
                    <input
                      type="checkbox"
                      id={user._id}
                      value={user._id}
                      checked={selectedUsers.includes(user._id)}
                      onChange={handleUserChange}
                      className="mr-2"
                    />
                    <label htmlFor={user._id}>
                      {user.roll} - {user.name}
                    </label>
                  </div>
                ))
              ) : (
                <p>No students available for the selected class.</p>
              )}
            </div>
            <CustomButton text="Create Attendance" type="submit" />
          </form>
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

export default CreateAttendance;
