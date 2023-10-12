import React from "react";
import errorImage from "@/assets/404.svg";
import { Link } from "react-router-dom";
const ErrorPage = () => {
  return (
    <div className="flex flex-col justify-center pt-20 items-center font-primary">
      <img 
      src={errorImage} 
      alt="errorLoading image" 
      className="w-[20rem]" />
      <div className="flex flex-col justify-center items-center lg:w-[32rem] min-h-[7rem] pt-[2rem] gap-[4px] mx-3">
        <p className=" font-semibold">404 Not Found</p>
        <p className="text-[1.5rem] pb-3 font-secondary">
          Oops! Page not found
        </p>
        <p className="text-[14px] text-center text-gray-500 font-secondary pb-3">
          The page you are trying to access doesnot exist or has been moved. Try
          going back to our homepage.
        </p>
        <Link to="/">
          <button className=" bg-accent_secondary rounded-[0.5rem] w-[9rem] h-[2rem] text-[0.9rem] font-[600]">
            Go to Homepage
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
