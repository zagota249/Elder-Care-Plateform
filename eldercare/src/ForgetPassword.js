import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export default function ForgotPassword() {
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
      if (res.data?.resetToken) {
        setTimeout(() => navigate(`/reset-password?token=${res.data.resetToken}`), 2000);
      }
    } catch (err) {
      if (err.code === 'ERR_NETWORK') {
        setError("Cannot connect to server. Please ensure the backend server is running.");
      } else {
        setError(err.response?.data?.message || "An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      padding: "20px",
    },
    card: {
      backgroundColor: "white",
      padding: "40px",
      borderRadius: "16px",
      boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
      width: "100%",
      maxWidth: "420px",
    },
    logo: {
      fontSize: "1.8rem",
      fontWeight: "700",
      color: "#192b67",
      textAlign: "center",
      marginBottom: "30px",
    },
    title: {
      fontSize: "1.5rem",
      fontWeight: "600",
      color: "#333",
      marginBottom: "10px",
      textAlign: "center",
    },
    subtitle: {
      color: "#666",
      textAlign: "center",
      marginBottom: "25px",
      fontSize: "0.95rem",
    },
    inputGroup: {
      marginBottom: "20px",
    },
    label: {
      display: "block",
      marginBottom: "8px",
      fontWeight: "500",
      color: "#333",
    },
    input: {
      width: "100%",
      padding: "14px 16px",
      border: "2px solid #e1e5eb",
      borderRadius: "10px",
      fontSize: "1rem",
      transition: "border-color 0.3s, box-shadow 0.3s",
      outline: "none",
      boxSizing: "border-box",
    },
    button: {
      width: "100%",
      padding: "14px",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
      border: "none",
      borderRadius: "10px",
      fontSize: "1rem",
      fontWeight: "600",
      cursor: loading ? "not-allowed" : "pointer",
      opacity: loading ? 0.7 : 1,
      transition: "transform 0.2s, box-shadow 0.2s",
      marginBottom: "20px",
    },
    alert: {
      padding: "12px 16px",
      borderRadius: "8px",
      marginBottom: "20px",
      fontSize: "0.9rem",
    },
    successAlert: {
      backgroundColor: "#d4edda",
      color: "#155724",
      border: "1px solid #c3e6cb",
    },
    errorAlert: {
      backgroundColor: "#f8d7da",
      color: "#721c24",
      border: "1px solid #f5c6cb",
    },
    backLink: {
      textAlign: "center",
      color: "#666",
    },
    link: {
      color: "#667eea",
      cursor: "pointer",
      fontWeight: "500",
      textDecoration: "none",
    },
    icon: {
      fontSize: "3rem",
      textAlign: "center",
      marginBottom: "20px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.icon}>🔐</div>
        <div style={styles.logo}>ElderCare Connect</div>
        <h2 style={styles.title}>Forgot Password?</h2>
        <p style={styles.subtitle}>
          No worries! Enter your email and we'll send you a reset link.
        </p>

        {message && (
          <div style={{ ...styles.alert, ...styles.successAlert }}>
            ✓ {message}
          </div>
        )}
        {error && (
          <div style={{ ...styles.alert, ...styles.errorAlert }}>
            ✕ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
              onFocus={(e) => {
                e.target.style.borderColor = "#667eea";
                e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e1e5eb";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>
          <button
            type="submit"
            style={styles.button}
            disabled={loading}
            onMouseOver={(e) => {
              if (!loading) {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 6px 20px rgba(102, 126, 234, 0.4)";
              }
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "none";
            }}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <p style={styles.backLink}>
          Remember your password?{" "}
          <span style={styles.link} onClick={() => navigate("/signin")}>
            Back to Sign In
          </span>
        </p>
      </div>
    </div>
  );
}
