import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Card, TextField, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export default function SignUp() {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = () => {
    if (!role || !fullName || !email || !password || !confirmPassword) {
      alert("Please fill all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // ⭐ Replace this with backend API call later
    alert(`Account created for ${fullName} as ${role}`);
    navigate("/signin");
  };

  return (
    <Box sx={{ backgroundColor: "#e9f3ff", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", p: 3 }}>
      <Typography sx={{ fontSize: "2rem", fontWeight: 700, color: "#192b67", mb:3 }}>ElderCare Platform</Typography>

      <Card sx={{ p: 4, width: 400, borderRadius: 3, boxShadow: 3 }}>
        <Typography sx={{ fontSize: "1.5rem", fontWeight: 600, mb: 3, color: "#1976d2" }}>Sign Up</Typography>

        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>I am a...</InputLabel>
          <Select value={role} onChange={(e) => setRole(e.target.value)}>
            <MenuItem value="caregiver">Volunteer / Caregiver</MenuItem>
            <MenuItem value="familyMember">Family Member</MenuItem>
            <MenuItem value="admin">Administrator</MenuItem>
          </Select>
        </FormControl>

        <TextField fullWidth label="Full Name" sx={{ mb: 2 }} value={fullName} onChange={(e) => setFullName(e.target.value)} />
        <TextField fullWidth label="Email" placeholder="email@example.com" sx={{ mb: 2 }} value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField fullWidth label="Password" type="password" placeholder="Create password" sx={{ mb: 2 }} value={password} onChange={(e) => setPassword(e.target.value)} />
        <TextField fullWidth label="Confirm Password" type="password" placeholder="Confirm password" sx={{ mb: 2 }} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

        <Button fullWidth variant="contained" sx={{ backgroundColor: "#1976d2", py: 1.2, mb:2 }} onClick={handleSignUp}>
          Sign Up
        </Button>

        <Typography sx={{ textAlign: "center" }}>
          Already have an account?{" "}
          <span style={{ color: "#1976d2", cursor: "pointer" }} onClick={() => navigate("/signin")}>Sign In</span>
        </Typography>
      </Card>
    </Box>
  );
}
