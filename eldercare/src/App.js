import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
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
  const [sidebarActive, setSidebarActive] = useState("home");

  // Sidebar only visible on dashboard routes
  const showSidebar = ["/home", "/admin", "/family", "/volunteer"].includes(location.pathname);

  // Navigation handler for sidebar
  const handleSidebarNav = (id) => {
    setSidebarActive(id);
    // Map sidebar id to route
    const routeMap = {
      home: "/home",
      profile: "/profile",
      tasks: "/tasks",
      medications: "/medications",
      emergency: "/emergency",
      settings: "/settings",
      logout: "/signin",
      admin: "/admin",
      family: "/family",
      volunteer: "/volunteer",
    };
    const path = routeMap[id] || "/";
    if (location.pathname !== path) {
      window.location.href = path;
    }
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
