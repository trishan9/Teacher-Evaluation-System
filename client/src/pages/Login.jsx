import React from "react";
import { Navigate } from "react-router-dom";
import { LoginForm, NavBar } from "@/components";

const Login = () => {
  if (localStorage.getItem("accessToken")) {
    return <Navigate to="/dashboard/surveys" replace />;
  }

  return (
    <React.Fragment>
      <NavBar />

      <div className="flex flex-col justify-center flex-1 min-h-full py-32 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="w-auto h-16 mx-auto rounded-md"
            src="/scool.png"
            alt="Your Company"
          />

          <h2 className="mt-6 text-2xl font-bold leading-9 tracking-tight text-center text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="px-6 py-12 bg-white shadow sm:rounded-lg sm:px-12">
            <LoginForm />
          </div>

          <p className="mt-10 text-sm text-center text-gray-500">
            Not a member?{" "}
            <a
              href="/contact"
              className="font-semibold leading-6 text-accent_primary hover:underline"
            >
              Contact Us
            </a>
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
