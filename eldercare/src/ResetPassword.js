import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Typography, TextField, Button, Alert, Card, CircularProgress } from "@mui/material";
import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const query = new URLSearchParams(useLocation().search);
  const token = query.get("token");

  // Check if token is missing
  if (!token) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", backgroundColor: "#e9f3ff", p: 3 }}>
        <Typography sx={{ fontSize: "2rem", fontWeight: 700, mb: 3, color: "#192b67" }}>ElderCare Platform</Typography>
        <Card sx={{ p: 4, width: 400, borderRadius: 3, boxShadow: 3 }}>
          <Alert severity="error" sx={{ mb: 2 }}>Invalid or missing reset token. Please request a new password reset link.</Alert>
          <Button variant="contained" fullWidth onClick={() => navigate("/forgot-password")} sx={{ mb: 2 }}>
            Request New Reset Link
          </Button>
          <Typography sx={{ textAlign: "center" }}>
            <span style={{ color: "#1976d2", cursor: "pointer" }} onClick={() => navigate("/signin")}>Back to Sign In</span>
          </Typography>
        </Card>
      </Box>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!newPassword || !confirmPassword) {
      setError("Please fill all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/reset-password`, { token, newPassword });
      setMessage(res.data?.message || "Password reset successfully!");
      
      // Redirect to sign in after success
      setTimeout(() => navigate("/signin"), 2000);
    } catch (err) {
      if (err.code === 'ERR_NETWORK') {
        setError("Cannot connect to server. Please ensure the backend server is running.");
      } else if (err.response?.status === 400) {
        setError(err.response?.data?.message || "Invalid or expired reset token. Please request a new reset link.");
      } else {
        setError(err.response?.data?.message || "Error resetting password. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", backgroundColor: "#e9f3ff", p: 3 }}>
      <Typography sx={{ fontSize: "2rem", fontWeight: 700, mb: 3, color: "#192b67" }}>ElderCare Platform</Typography>

      <Card sx={{ p: 4, width: 400, borderRadius: 3, boxShadow: 3 }}>
        <Typography sx={{ fontSize: "1.5rem", fontWeight: 600, mb: 2, color: "#1976d2" }}>Reset Password</Typography>
        <Typography sx={{ mb: 3, color: "#666" }}>Enter your new password below.</Typography>

        {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            type="password"
            label="New Password"
            placeholder="Enter new password (min 6 chars)"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            type="password"
            label="Confirm Password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={{ mb: 3 }}
          />
          <Button 
            type="submit" 
            variant="contained" 
            fullWidth 
            sx={{ py: 1.5, mb: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Reset Password"}
          </Button>
        </form>

        <Typography sx={{ textAlign: "center" }}>
          <span style={{ color: "#1976d2", cursor: "pointer" }} onClick={() => navigate("/signin")}>Back to Sign In</span>
        </Typography>
      </Card>
    </Box>
  );
}
