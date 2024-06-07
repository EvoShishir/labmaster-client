import CustomButton from "@/components/Core/CustomButton/CustomButton";
import { auth } from "@/firebase";
import axios from "axios";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Rubik } from "next/font/google";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export const rubik = Rubik({ subsets: ["latin"] });

export default function StudentSignUpPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [semester, setSemester] = useState("");
  const [departments, setDepartments] = useState<
    { _id: string; name: string }[]
  >([]);

  useEffect(() => {
    fetchSemesters();
  }, []);

  const fetchSemesters = async () => {
    try {
      const baseURL = window.location.origin;

      const { data } = await axios.get(`${baseURL}/api/semesters`);
      setDepartments(data.semesters);
    } catch (error) {
      console.error("Error fetching semesters:", error);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toast.promise(
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const user = userCredential.user;

          updateProfile(user, {
            displayName: fullName,
          });

          const baseURL = window.location.origin;
          await axios.post(`${baseURL}/api/users`, {
            uid: userCredential.user.uid,
            name: fullName,
            email: email,
            roll: rollNumber,
            semesterId: semester,
            role: "Student",
          });

          localStorage.setItem("labmaster_uid", user.uid);
          localStorage.setItem("labmaster_role", "student");

          return (window.location.href = "/");
        })
        .catch((error) => {
          const errorMessage = error.message;
          throw new Error(`${errorMessage}`);
        }),
      {
        loading: "Signing up...",
        success: <b>Sign up successful!</b>,
        error: (err) => <b>{err.message}</b>,
      }
    );
  };

  return (
    <main
      className={`${rubik.className} min-h-[80vh] flex flex-col justify-center items-center px-4`}
    >
      <Toaster />
      <div className="mb-8">
        <Link href={"/"} className="font-medium text-4xl text-center">
          <span className="text-green-800">LAB</span>{" "}
          <span className="text-blue-800">MASTER</span>
        </Link>
      </div>
      <h1 className="text-xl font-medium mb-6">Student Sign up</h1>
      <form className="w-full max-w-md" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="fullName"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="rollNumber"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Roll Number
          </label>
          <input
            type="text"
            id="rollNumber"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your roll number"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="semester"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Semester
          </label>
          <select
            id="semester"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            required
          >
            <option value="" disabled>
              Select your semester
            </option>
            {departments.map((dept) => (
              <option key={dept._id} value={dept._id}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-center">
          <CustomButton text="Sign up" type="submit" style="w-full" />
        </div>
      </form>
    </main>
  );
}
