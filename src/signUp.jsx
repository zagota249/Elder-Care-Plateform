import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Card, TextField, Button, FormControl, InputLabel, Select, MenuItem, Alert, CircularProgress, LinearProgress } from "@mui/material";
import axios from "axios";

const API_URL = process.env.NODE_ENV === 'production' ? '/api/auth' : 'http://localhost:5000/api/auth';

// Password strength validation
const validatePassword = (password) => {
  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };
  
  const score = Object.values(checks).filter(Boolean).length;
  
  return {
    checks,
    score,
    isStrong: score >= 4,
    label: score <= 1 ? "Weak" : score <= 2 ? "Fair" : score <= 3 ? "Good" : score <= 4 ? "Strong" : "Very Strong",
    color: score <= 1 ? "#f44336" : score <= 2 ? "#ff9800" : score <= 3 ? "#ffeb3b" : score <= 4 ? "#4caf50" : "#2e7d32",
  };
};

export default function SignUp() {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const passwordStrength = validatePassword(password);

  const handleSignUp = async () => {
    setError("");

    if (!role || !fullName || !email || !password || !confirmPassword) {
      setError("Please fill all fields.");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    // Strong password validation
    if (!passwordStrength.isStrong) {
      setError("Password must be at least 8 characters and include uppercase, lowercase, number, and special character.");
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
      if (err.code === 'ERR_NETWORK') {
        setError("Cannot connect to server. Please ensure the backend server is running.");
      } else {
        setError(err.response?.data?.message || "Registration failed. Please try again.");
      }
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
        <TextField fullWidth label="Password" type="password" placeholder="Create a strong password" sx={{ mb: 1 }} value={password} onChange={(e) => setPassword(e.target.value)} />
        
        {/* Password Strength Indicator */}
        {password && (
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.5 }}>
              <Typography variant="caption" sx={{ color: "#666" }}>Password Strength</Typography>
              <Typography variant="caption" sx={{ color: passwordStrength.color, fontWeight: 600 }}>{passwordStrength.label}</Typography>
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={(passwordStrength.score / 5) * 100} 
              sx={{ 
                height: 6, 
                borderRadius: 3, 
                backgroundColor: "#e0e0e0",
                "& .MuiLinearProgress-bar": { backgroundColor: passwordStrength.color }
              }} 
            />
            <Box sx={{ mt: 1, display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              <Typography variant="caption" sx={{ color: passwordStrength.checks.length ? "#4caf50" : "#999" }}>✓ 8+ chars</Typography>
              <Typography variant="caption" sx={{ color: passwordStrength.checks.uppercase ? "#4caf50" : "#999" }}>✓ Uppercase</Typography>
              <Typography variant="caption" sx={{ color: passwordStrength.checks.lowercase ? "#4caf50" : "#999" }}>✓ Lowercase</Typography>
              <Typography variant="caption" sx={{ color: passwordStrength.checks.number ? "#4caf50" : "#999" }}>✓ Number</Typography>
              <Typography variant="caption" sx={{ color: passwordStrength.checks.special ? "#4caf50" : "#999" }}>✓ Special</Typography>
            </Box>
          </Box>
        )}
        
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
