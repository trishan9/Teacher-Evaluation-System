import isJwtValid from "@/utils/isJwtValid";
import { Suspense } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  if (!localStorage.getItem("accessToken")) {
    return <Navigate to="/login" replace />;
  } else if (!isJwtValid(localStorage.getItem("accessToken"))) {
    return <Navigate to="/login" replace />;
  }

  return <Suspense fallback={<p>Loading...</p>}>{children}</Suspense>;
};

export default ProtectedRoute;
