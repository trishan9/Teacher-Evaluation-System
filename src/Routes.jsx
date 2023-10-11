import { Route, Routes } from "react-router-dom";
import {
  Survey,
  Home,
  CreateSurvey,
  History,
  Settings,
  Login,
  ErrorPage,
} from "@/pages";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/survey/:slug" element={<Survey />} />
      <Route path="/" element={<Home />} />
      <Route path="/create-survey" element={<CreateSurvey />} />
      <Route path="/history" element={<History />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRoutes;
