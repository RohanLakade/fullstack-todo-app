// React & Third-Party Libraries Imports
import { Navigate, Route, Routes } from "react-router-dom";

// Project Utilities & API Helpers Imports
import { useAuth } from "@context/AuthContext";

// Components Imports
import Login from "@pages/login/Login";
import Register from "@pages/register/Register";
import Layout from "@layout/Layout";
import ProtectedRoute from "@components/protectedRoute/ProtectedRoute";
import Dashboard from "@pages/dashboard/Dashboard";
import AddTask from "@pages/addtask/AddTask";
import UpdateTask from "@pages/update/UpdateTask";
import Profile from "@pages/profile/Profile";
import NotFound from "@src/NotFound";

export const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Redirect "/" based on authentication */}
      <Route
        path="/"
        element={<Navigate to={user ? "/dashboard" : "/login"} />}
      />

      {/* Routes without Layout (Login & Register) */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Routes with Layout */}
      <Route element={<Layout />}>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add"
          element={
            <ProtectedRoute>
              <AddTask />
            </ProtectedRoute>
          }
        />
        <Route
          path="/update/:id"
          element={
            <ProtectedRoute>
              <UpdateTask />
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <NotFound />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
