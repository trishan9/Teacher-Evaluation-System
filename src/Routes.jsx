import { Route, Routes } from "react-router-dom"
import { Survey, Home, CreateSurvey, History, Settings, Login } from "@/pages"

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/survey/:slug" element={<Survey />} />
            <Route path="/" element={<Home />} />
            <Route path="/create-survey" element={<CreateSurvey />} />
            <Route path="/history" element={<History />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    )
}

export default AppRoutes