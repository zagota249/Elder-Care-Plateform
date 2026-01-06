import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Card, TextField, Button, FormControl, InputLabel, Select, MenuItem, Alert, CircularProgress } from "@mui/material";
import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export default function SignIn() {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setError("");

    if (!role || !email || !password) {
      setError("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/signin`, { email, password, role });
      
      // Store token and user info
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Navigate based on role
      switch (role) {
        case "admin": navigate("/admin"); break;
        case "caregiver": navigate("/volunteer"); break;
        case "familyMember": navigate("/family"); break;
        case "elder": navigate("/home"); break;
        default: navigate("/home");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minHeight:'100vh', backgroundColor:'#e9f3ff', p:3 }}>
      <Typography sx={{ fontSize:'2rem', fontWeight:700, mb:3, color:'#192b67' }}>ElderCare Platform</Typography>

      <Card sx={{ p:4, width:400, borderRadius:3, boxShadow:3 }}>
        <Typography sx={{ fontSize:'1.5rem', fontWeight:600, mb:3, color:'#1976d2' }}>Sign In</Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <FormControl fullWidth sx={{ mb:3 }}>
          <InputLabel>I am a...</InputLabel>
          <Select value={role} onChange={(e)=>setRole(e.target.value)} label="I am a...">
            <MenuItem value="caregiver">Volunteer / Caregiver</MenuItem>
            <MenuItem value="familyMember">Family Member</MenuItem>
            <MenuItem value="admin">Administrator</MenuItem>
            <MenuItem value="elder">Elder</MenuItem>
          </Select>
        </FormControl>

        <TextField fullWidth label="Email" placeholder="email@example.com" sx={{ mb:3 }} value={email} onChange={(e)=>setEmail(e.target.value)} />
        <TextField fullWidth type="password" label="Password" placeholder="Enter password" sx={{ mb:2 }} value={password} onChange={(e)=>setPassword(e.target.value)} />

        <Button 
          fullWidth 
          variant="contained" 
          color="primary" 
          sx={{ py:1.5, mb:2 }} 
          onClick={handleSignIn}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
        </Button>

        <Typography sx={{ textAlign:'center', mb:1, cursor:'pointer', color:'#1976d2' }} onClick={()=>navigate("/forget-password")}>
          Forgot Password?
        </Typography>

        <Typography sx={{ textAlign:'center' }}>
          Don't have an account? <span style={{ color:'#1976d2', cursor:'pointer' }} onClick={()=>navigate("/signup")}>Sign Up</span>
        </Typography>
      </Card>
    </Box>
  );
}
