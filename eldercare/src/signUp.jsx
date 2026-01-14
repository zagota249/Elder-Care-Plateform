import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Card, TextField, Button, FormControl, InputLabel, Select, MenuItem, Alert, CircularProgress } from "@mui/material";
import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export default function SignUp() {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setError("");

    if (!role || !fullName || !email || !password || !confirmPassword) {
      setError("Please fill all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/register`, {
        name: fullName,
        email,
        password,
        role
      });
      
      alert(`Account created successfully! Please sign in.`);
      navigate("/signin");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ backgroundColor: "#e9f3ff", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", p: 3 }}>
      <Typography sx={{ fontSize: "2rem", fontWeight: 700, color: "#192b67", mb:3 }}>ElderCare Platform</Typography>

      <Card sx={{ p: 4, width: 400, borderRadius: 3, boxShadow: 3 }}>
        <Typography sx={{ fontSize: "1.5rem", fontWeight: 600, mb: 3, color: "#1976d2" }}>Sign Up</Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>I am a...</InputLabel>
          <Select value={role} onChange={(e) => setRole(e.target.value)} label="I am a...">
            <MenuItem value="elder">Elder</MenuItem>
            <MenuItem value="caregiver">Volunteer / Caregiver</MenuItem>
            <MenuItem value="familyMember">Family Member</MenuItem>
            <MenuItem value="admin">Administrator</MenuItem>
          </Select>
        </FormControl>

        <TextField fullWidth label="Full Name" sx={{ mb: 2 }} value={fullName} onChange={(e) => setFullName(e.target.value)} />
        <TextField fullWidth label="Email" placeholder="email@example.com" sx={{ mb: 2 }} value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField fullWidth label="Password" type="password" placeholder="Create password (min 6 chars)" sx={{ mb: 2 }} value={password} onChange={(e) => setPassword(e.target.value)} />
        <TextField fullWidth label="Confirm Password" type="password" placeholder="Confirm password" sx={{ mb: 2 }} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

        <Button 
          fullWidth 
          variant="contained" 
          sx={{ backgroundColor: "#1976d2", py: 1.2, mb:2 }} 
          onClick={handleSignUp}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Sign Up"}
        </Button>

        <Typography sx={{ textAlign: "center" }}>
          Already have an account?{" "}
          <span style={{ color: "#1976d2", cursor: "pointer" }} onClick={() => navigate("/signin")}>Sign In</span>
        </Typography>
      </Card>
    </Box>
  );
}
