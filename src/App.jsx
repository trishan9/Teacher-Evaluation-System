import React from "react"
import { NavBar } from "@/components"
import Routes from "./Routes"

const App = () => {
  return (
    <div className="min-h-[100vh] font-primary bg-neutral_white">
      <NavBar />

      <Routes />
    </div>
  )
}

export default App