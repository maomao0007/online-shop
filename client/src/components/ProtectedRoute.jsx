import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../services/api";

function ProtectedRoute({ children }) {
  const [authStatus, setAuthStatus] = useState({
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    async function verifyAuth() {
      try {
        await API.get("/me");
        setAuthStatus({ isAuthenticated: true, isLoading: false });
      } catch (error) {
        console.error("Auth check failed:", error);
        setAuthStatus({ isAuthenticated: false, isLoading: false });
      }
    }

    verifyAuth();
  }, []);

  if (authStatus.isLoading) {
    return <div className="text-center py-5">Verifying identity...</div>;
  }

  if (!authStatus.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
