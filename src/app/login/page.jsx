"use client";
import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for error message
  const router = useRouter();

  const emailId = process.env.NEXT_PUBLIC_LOGIN_EMAIL;
  const passwordId = process.env.NEXT_PUBLIC_LOGIN_PASSWORD;

  const Login = () => {
    if (email === emailId && password === passwordId) {
      console.log("Login Success");
      Cookies.set("login", "true"); // Set login as true in cookies
      setError(""); // Clear error message
      router.push("/admin"); // Redirect to dashboard
    } else {
      console.log("Login Failed");
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 flex-col px-4 sm:px-6 lg:px-8">
      <h1 className="mb-5 text-2xl sm:text-3xl lg:text-4xl font-bold text-center">
        Login
      </h1>
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md lg:max-w-lg flex flex-col gap-4">
        <Input
          label="Email"
          placeholder="Enter Your Email"
          labelPlacement="outside"
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
        <Input
          label="Password"
          placeholder="Enter Your Password"
          labelPlacement="outside"
          type="password" // Ensures password is hidden
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}{" "}
        {/* Show error message */}
        <Button
          onPress={Login}
          className="bg-black text-white w-full py-2 rounded"
          auto
        >
          Sign In
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
