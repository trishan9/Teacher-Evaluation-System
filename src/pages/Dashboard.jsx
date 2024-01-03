import React from "react"
import { Outlet } from "react-router-dom"
import { NavBar, SideNav } from "@/components";

const Dashboard = () => {
    return (
        <React.Fragment>
            <NavBar />

            <div className="relative flex gap-6 p-8">
                <SideNav active={0} />

                <div className="w-full ml-[17rem]">
                    <Outlet />
                </div>
            </div>
        </React.Fragment>
    )
}

export default Dashboard
