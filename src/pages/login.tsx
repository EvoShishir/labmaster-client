import CustomButton from "@/components/Core/CustomButton/CustomButton";
import { auth } from "@/firebase";
import axios from "axios";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Rubik } from "next/font/google";
import Link from "next/link";
import React, { FormEvent, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const rubik = Rubik({ subsets: ["latin"] });

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.promise(
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential: any) => {
          // Signed in
          const user = userCredential.user;
          localStorage.setItem("labmaster_uid", user.uid);
          window.location.href = "/";
          // ...
        })
        .catch((error) => {
          const errorMessage = error.message;
          throw new Error(`${errorMessage}`);
        }),
      {
        loading: "Logging in...",
        success: <b>Login successful!</b>,
        error: (err) => <b>{err.message}</b>,
      }
    );
  };

  return (
    <section
      className={`${rubik.className} min-h-screen flex flex-col justify-center`}
    >
      <Toaster />
      <div className=" text-center">
        <Link href={"/"} className="font-medium text-4xl ">
          <span className="text-green-800">LAB</span>{" "}
          <span className="text-blue-800">MASTER</span>
        </Link>
      </div>

      <div className=" flex items-center justify-center  py-5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-xl font-medium text-gray-900">
              Log in to your account
            </h2>
          </div>

          <form className="mt-1 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <h3>
              Don&apos;t have an account?{" "}
              <Link href={"/sign-up"} className="text-blue-700 font-medium">
                Sign Up
              </Link>
            </h3>

            <div className="flex">
              <CustomButton text="Sign in" type="submit" style="w-full" />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
