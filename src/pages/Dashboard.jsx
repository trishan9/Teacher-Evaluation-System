import React from "react"
import { Outlet } from "react-router-dom"
import { NavBar } from "@/components";

const Dashboard = () => {
    return (
        <React.Fragment>
            <NavBar />

            <Outlet />
        </React.Fragment>
    )
}

export default Dashboard
