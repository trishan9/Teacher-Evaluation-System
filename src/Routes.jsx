import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useRecoilState } from "recoil";
import { onAuthStateChanged } from "firebase/auth";
import { ProtectedRoute, Home, Login, ErrorPage, Dashboard, SurveysPage, SingleSurvey, CreateSurvey, History, Settings } from "@/pages";
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
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="*" element={<ErrorPage />} />

      <Route path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }

      >
        <Route path="surveys"
          element={
            <ProtectedRoute>
              <SurveysPage />
            </ProtectedRoute>
          }
        />

        <Route path="survey/:slug"
          element={
            <ProtectedRoute>
              <SingleSurvey />
            </ProtectedRoute>
          }
        />

        <Route path="create-survey"
          element={
            <ProtectedRoute>
              <CreateSurvey />
            </ProtectedRoute>
          }
        />


        <Route path="history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />

        <Route path="settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;