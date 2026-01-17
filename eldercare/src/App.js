import React, { useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./sidebar";
import Home from "./elder_Dashboard";
import HomePage from "./homepage";
import SignIn from "./signIn";
import SignUp from "./signUp";
import ForgotPassword from "./ForgetPassword";
import ResetPassword from "./ResetPassword";
import AdminDashboard from "./AdminDashboard";
import FamilyDashboard from "./FamilyDashboard";
import VolunteerDashboard from "./VolunteerDashboard";
import "./App.css";

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarActive, setSidebarActive] = useState("home");

  // Sidebar only visible on dashboard routes
  const showSidebar = ["/home", "/admin", "/family", "/volunteer"].includes(location.pathname);

  // Get user role from localStorage
  const getUserRole = () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      return user.role || "elder";
    } catch {
      return "elder";
    }
  };

  // Navigation handler for sidebar
  const handleSidebarNav = (id) => {
    setSidebarActive(id);
    
    const userRole = getUserRole();
    
    // Handle logout
    if (id === "logout") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/signin");
      return;
    }

    // Map role to dashboard path
    const dashboardMap = {
      admin: "/admin",
      caregiver: "/volunteer",
      familyMember: "/family",
      elder: "/home",
    };

    // For home, navigate to role-specific dashboard
    if (id === "home") {
      navigate(dashboardMap[userRole] || "/home");
      return;
    }

    // For other items, stay on current dashboard but emit event for internal navigation
    // This will be handled by each dashboard component
    window.dispatchEvent(new CustomEvent("sidebarNav", { detail: { id } }));
  };

  return (
    <div className="app-shell">
      {showSidebar && (
        <Sidebar active={sidebarActive} setActive={handleSidebarNav} />
      )}
      <div className={`main-content ${showSidebar ? "with-sidebar" : ""}`}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/home" element={<Home />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/family" element={<FamilyDashboard />} />
          <Route path="/volunteer" element={<VolunteerDashboard />} />
        </Routes>
      </div>
    </div>
  );
}
