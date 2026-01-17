import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button, Alert, Card, CircularProgress } from "@mui/material";
import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export default function ForgetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!email) {
      setError("Please enter your email.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/forgot-password`, { email });
      setMessage(res.data?.message || "Reset link sent! Check your email.");
      
      // For demo: navigate to reset page with token after short delay
      // In production, the token would be sent via email
      if (res.data?.resetToken) {
        setTimeout(() => navigate(`/reset-password?token=${res.data.resetToken}`), 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", backgroundColor: "#e9f3ff", p: 3 }}>
      <Typography sx={{ fontSize: "2rem", fontWeight: 700, mb: 3, color: "#192b67" }}>ElderCare Platform</Typography>

      <Card sx={{ p: 4, width: 400, borderRadius: 3, boxShadow: 3 }}>
        <Typography sx={{ fontSize: "1.5rem", fontWeight: 600, mb: 2, color: "#1976d2" }}>Forgot Password</Typography>
        <Typography sx={{ mb: 3, color: "#666" }}>Enter your email to receive a password reset link.</Typography>

        {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            type="email"
            label="Email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 3 }}
          />
          <Button 
            type="submit" 
            variant="contained" 
            fullWidth 
            sx={{ py: 1.5, mb: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Send Reset Link"}
          </Button>
        </form>

        <Typography sx={{ textAlign: "center" }}>
          Remember your password?{" "}
          <span style={{ color: "#1976d2", cursor: "pointer" }} onClick={() => navigate("/signin")}>Sign In</span>
        </Typography>
      </Card>
    </Box>
  );
}
