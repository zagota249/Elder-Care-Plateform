import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./sidebar";
import Home from "./elder_Dashboard";
import HomePage from "./homepage";
import SignIn from "./signIn";
import SignUp from "./signUp";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
// import "./elder.css";

export default function App() {
  const [active, setActive] = useState("home");
  const location = useLocation();

  // Sidebar only visible on /home
  const showSidebar = ["/home"].includes(location.pathname);

  return (
    <div className="app-shell">
      {showSidebar && <Sidebar active={active} setActive={setActive} />}

      <div className={`main-content ${showSidebar ? "with-sidebar" : ""}`}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}
