// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import TaskPage from "./pages/TaskPage";
import { Toaster } from "react-hot-toast";
import { getCookie } from "./utils/cookieutil";
import ProtectedRoute from "./components/ProtectedRoute";

const App: React.FC = () => {
  const token = getCookie("token");
  console.log("Token from cookie:", token);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <TaskPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default App;
