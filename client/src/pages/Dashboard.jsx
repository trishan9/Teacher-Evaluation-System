import React from "react";
import { Outlet } from "react-router-dom";
import { NavBar, SideNav } from "@/components";

const Dashboard = () => {
  return (
    <React.Fragment>
      <NavBar />

      <div className="relative flex gap-6 p-6 lg:p-8">
        <div className="hidden lg:block fixed top-[108px] left-0 ml-[2rem] bg-white rounded-xl border shadow-sm">
          <SideNav active={0} />
        </div>

        <div className="w-full lg:ml-[17rem]">
          <Outlet />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
