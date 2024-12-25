import React from "react";
import { Input, Button, Spacer } from "@nextui-org/react";

const LoginPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <Input
              fullWidth
              placeholder="Enter your email"
              type="email"
              className="border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <Input
              fullWidth
              placeholder="Enter your password"
              className="border border-gray-300 rounded-md"
            />
          </div>
          <Button
            color="primary"
            className="w-full bg-blue-500 text-white hover:bg-blue-600"
          >
            Login
          </Button>
         
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
