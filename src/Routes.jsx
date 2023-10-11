import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useRecoilState } from "recoil";
import { onAuthStateChanged } from "firebase/auth";
import { Survey, Home, CreateSurvey, History, Settings, Login, ErrorPage, ProtectedRoute } from "@/pages";
import { authState } from "@/states";
import { auth } from "@/config/firebase";

const AppRoutes = () => {
  const [, setAuthUser] = useRecoilState(authState)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (localStorage.getItem("accessToken") && user) {
        const currentUser = {
          id: user.uid,
          email: user.email
        }
        setAuthUser(currentUser);
      }
    })

    return unsubscribe
  }, [])

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="*" element={<ErrorPage />} />

      <Route path="/survey/:slug"
        element={
          <ProtectedRoute>
            <Survey />
          </ProtectedRoute>
        }
      />

      <Route path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route path="/create-survey"
        element={
          <ProtectedRoute>
            <CreateSurvey />
          </ProtectedRoute>
        }
      />


      <Route path="/history"
        element={
          <ProtectedRoute>
            <History />
          </ProtectedRoute>
        }
      />

      <Route path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
