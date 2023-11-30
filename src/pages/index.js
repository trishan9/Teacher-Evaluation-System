import React from "react";

const Home = React.lazy(() => import("./Home"));
const Login = React.lazy(() => import("./Login"));
const ErrorPage = React.lazy(() => import("./404"));
const Dashboard = React.lazy(() => import("./Dashboard"));
const Surveys = React.lazy(() => import("./Surveys"));
const SingleSurvey = React.lazy(() => import("./SingleSurvey"));
const CreateSurvey = React.lazy(() => import("./CreateSurvey"));
const HistoryPage = React.lazy(() => import("./History"));
const Settings = React.lazy(() => import("./Settings"));
const Contact = React.lazy(() => import("./Contact"));
const Participate = React.lazy(() => import("./Participate"));
import ProtectedRoute from "./ProtectedRoute";

export {
  Home,
  Login,
  ErrorPage,
  Dashboard,
  Surveys,
  SingleSurvey,
  CreateSurvey,
  HistoryPage,
  Settings,
  Contact,
  Participate,
  ProtectedRoute,
};
