import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./homepage";
import SignIn from "./signIn";
import SignUp from "./signUp";
import ForgotPassword from "./ForgetPassword";
import ResetPassword from "./ResetPassword";
import ElderDashboard from "./elder_Dashboard";
import FamilyDashboard from "./FamilyDashboard";
import VolunteerDashboard from "./VolunteerDashboard";
import AdminDashboard from "./AdminDashboard";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/home" element={<ElderDashboard />} />
      <Route path="/family" element={<FamilyDashboard />} />
      <Route path="/volunteer" element={<VolunteerDashboard />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
}
