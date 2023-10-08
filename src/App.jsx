import React from "react"
import { NavBar, SideNav, Footer } from "@/components"
import Routes from "./Routes"

const App = () => {
  return (
    <div className="min-h-[100vh] font-primary bg-neutral_white">
      <NavBar />

      <div className="flex gap-6 p-8">
        <SideNav />

        <Routes />
      </div>

      <Footer />
    </div>
  )
}

export default App