// React & Third-Party Libraries Imports
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Project Utilities & API Helpers Imports
import { useAuth } from "@context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (user === null) return null;

  return <>{children}</>;
};

export default ProtectedRoute;
