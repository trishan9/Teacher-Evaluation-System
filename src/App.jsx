import { NavBar, SideNav } from "@/components"
import Routes from "./Routes"

const App = () => {
  return (
    <div className="min-h-[100vh] font-primary bg-neutral_white">
      <NavBar />

      <div className="flex gap-6 p-8">
        <SideNav />

        <Routes />
      </div>
    </div>
  )
}

export default App