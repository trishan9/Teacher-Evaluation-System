import React from "react"
import { Outlet } from "react-router-dom"
import { NavBar, SideNav } from "@/components";

const Dashboard = () => {
    return (
        <React.Fragment>
            <NavBar />

            <div className="relative flex gap-6 p-8">
                <SideNav active={0} />

                <Outlet />
            </div>
        </React.Fragment>
    )
}

export default Dashboard
