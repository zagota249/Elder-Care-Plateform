import React from "react";
import { Navigate } from "react-router-dom";

/**
 * ProtectedRoute component that checks if user is authenticated
 * and optionally validates the user's role
 */
export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const token = localStorage.getItem("token");
  const userStr = localStorage.getItem("user");

  // If no token, redirect to signin
  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  // If allowedRoles is specified, check user role
  if (allowedRoles.length > 0 && userStr) {
    try {
      const user = JSON.parse(userStr);
      if (!allowedRoles.includes(user.role)) {
        // Redirect to appropriate dashboard based on role
        switch (user.role) {
          case "admin":
            return <Navigate to="/admin" replace />;
          case "caregiver":
            return <Navigate to="/volunteer" replace />;
          case "familyMember":
            return <Navigate to="/family" replace />;
          case "elder":
            return <Navigate to="/home" replace />;
          default:
            return <Navigate to="/" replace />;
        }
      }
    } catch (e) {
      // Invalid user data, clear and redirect
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return <Navigate to="/signin" replace />;
    }
  }

  return children;
}
