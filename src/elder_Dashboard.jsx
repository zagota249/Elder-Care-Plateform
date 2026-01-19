import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Button,
  Chip,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  LinearProgress,
  InputAdornment,
  Badge,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Menu,
} from "@mui/material";
import {
  Mic,
  Favorite,
  Medication,
  CalendarToday,
  Phone,
  Warning,
  CheckCircle,
  Add,
  Close,
  Home as HomeIcon,
  Message,
  Person,
  Search,
  Notifications,
  AccessTime,
  Settings,
  Logout,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("home");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [openAddMedDialog, setOpenAddMedDialog] = useState(false);
  const [openAddTaskDialog, setOpenAddTaskDialog] = useState(false);
  const [openSOSDialog, setOpenSOSDialog] = useState(false);
  const [userName, setUserName] = useState("Margaret");

  // Profile states
  const [profileAnchor, setProfileAnchor] = useState(null);
  const [profileDialog, setProfileDialog] = useState(false);
  const [settingsDialog, setSettingsDialog] = useState(false);
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || '{"name": "Margaret Thompson", "email": "elder@example.com"}');
    } catch {
      return { name: "Margaret Thompson", email: "elder@example.com" };
    }
  });
  const [editProfile, setEditProfile] = useState({ name: user.name, email: user.email, phone: "" });

  // Message Reply Dialog State
  const [messageReplyDialog, setMessageReplyDialog] = useState({ open: false, contact: null });
  const [replyText, setReplyText] = useState("");

  // Incoming Call Dialog State
  const [incomingCallDialog, setIncomingCallDialog] = useState({ open: false, caller: null });

  // Voice Assistant States
  const [isListening, setIsListening] = useState(false);
  const [voiceText, setVoiceText] = useState("");
  const [voiceResponse, setVoiceResponse] = useState("");
  const [openVoiceDialog, setOpenVoiceDialog] = useState(false);

  // Notification states
  const [notificationAnchor, setNotificationAnchor] = useState(null);
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Medicine Reminder", message: "Time to take Lisinopril 10mg", time: "5 min ago", read: false, type: "medicine" },
    { id: 2, title: "New Message", message: "John sent you a message", time: "10 min ago", read: false, type: "message" },
    { id: 3, title: "Appointment Today", message: "Doctor visit at 2:00 PM", time: "1 hour ago", read: true, type: "appointment" },
    { id: 4, title: "Health Check", message: "Weekly health report available", time: "2 hours ago", read: true, type: "health" },
  ]);

  const unreadNotifications = notifications.filter(n => !n.read).length;

  // Profile handlers
  const handleProfileClick = (event) => {
    setProfileAnchor(event.currentTarget);
  };

  const handleProfileClose = () => {
    setProfileAnchor(null);
  };

  const handleOpenProfile = () => {
    setProfileAnchor(null);
    setEditProfile({ name: user.name, email: user.email, phone: user.phone || "" });
    setProfileDialog(true);
  };

  const handleOpenSettings = () => {
    setProfileAnchor(null);
    setSettingsDialog(true);
  };

  const handleSaveProfile = () => {
    const updatedUser = { ...user, ...editProfile };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setProfileDialog(false);
    setSnackbar({ open: true, message: "Profile updated successfully!", severity: "success" });
    if (editProfile.name) {
      setUserName(editProfile.name.split(" ")[0]);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/signin");
  };

  // Listen for sidebar navigation events
  useEffect(() => {
    const handleSidebarNav = (e) => {
      const menuMap = {
        home: "home",
        profile: "profile",
        tasks: "tasks",
        medications: "medicines",
        emergency: "emergency",
        settings: "settings",
      };
      if (menuMap[e.detail.id]) {
        if (e.detail.id === "profile") {
          setProfileDialog(true);
        } else if (e.detail.id === "settings") {
          setSettingsDialog(true);
        } else if (e.detail.id === "emergency") {
          setOpenSOSDialog(true);
        } else {
          setActiveNav(menuMap[e.detail.id]);
        }
      }
    };
    window.addEventListener("sidebarNav", handleSidebarNav);
    return () => window.removeEventListener("sidebarNav", handleSidebarNav);
  }, []);

  const handleNotificationClick = (event) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchor(null);
  };

  const markNotificationRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    setSnackbar({ open: true, message: "All notifications marked as read", severity: "success" });
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    setNotificationAnchor(null);
    setSnackbar({ open: true, message: "All notifications cleared", severity: "info" });
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "medicine": return <Medication sx={{ color: "#1976d2" }} />;
      case "message": return <Message sx={{ color: "#9c27b0" }} />;
      case "appointment": return <CalendarToday sx={{ color: "#ff9800" }} />;
      case "health": return <Favorite sx={{ color: "#e91e63" }} />;
      default: return <Notifications sx={{ color: "#666" }} />;
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      try {
        const parsed = JSON.parse(user);
        if (parsed.fullName) {
          setUserName(parsed.fullName.split(" ")[0]);
        }
      } catch (e) {
        console.error("Error parsing user data");
      }
    }
  }, []);

  // Voice Assistant Functions
  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;
    window.speechSynthesis.speak(utterance);
  };

  const processVoiceCommand = (command) => {
    const lowerCommand = command.toLowerCase();
    let response = "";

    // Greeting commands
    if (lowerCommand.includes("hello") || lowerCommand.includes("hi")) {
      response = `Hello ${userName}! How can I help you today?`;
    }
    // Medicine commands
    else if (lowerCommand.includes("medicine") || lowerCommand.includes("medication") || lowerCommand.includes("pill")) {
      const pending = medicines.filter(m => m.status === "pending");
      if (pending.length > 0) {
        response = `You have ${pending.length} pending medication${pending.length > 1 ? 's' : ''}. ${pending.map(m => m.name).join(", ")}. Would you like me to mark any as taken?`;
      } else {
        response = "Great job! You have taken all your medications for today.";
      }
    }
    // Mark medicine as taken
    else if (lowerCommand.includes("take") || lowerCommand.includes("taken") || lowerCommand.includes("mark")) {
      const pendingMeds = medicines.filter(m => m.status === "pending");
      if (pendingMeds.length > 0) {
        // Try to find specific medicine mentioned
        const foundMed = medicines.find(m => lowerCommand.includes(m.name.toLowerCase()) && m.status === "pending");
        if (foundMed) {
          markAsTaken(foundMed.id);
          response = `I've marked ${foundMed.name} as taken. Well done!`;
        } else {
          // Mark the first pending medicine
          markAsTaken(pendingMeds[0].id);
          response = `I've marked ${pendingMeds[0].name} as taken. Well done!`;
        }
      } else {
        response = "All your medications are already marked as taken.";
      }
    }
    // Task commands
    else if (lowerCommand.includes("task") || lowerCommand.includes("appointment") || lowerCommand.includes("schedule")) {
      const pendingTasks = tasks.filter(t => t.status !== "completed");
      if (pendingTasks.length > 0) {
        response = `You have ${pendingTasks.length} pending task${pendingTasks.length > 1 ? 's' : ''}. ${pendingTasks.map(t => t.title).join(", ")}.`;
      } else {
        response = "You have no pending tasks. Great job staying on top of things!";
      }
    }
    // Time command
    else if (lowerCommand.includes("time") || lowerCommand.includes("what time")) {
      const now = new Date();
      response = `The current time is ${now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}.`;
    }
    // Date command
    else if (lowerCommand.includes("date") || lowerCommand.includes("what day") || lowerCommand.includes("today")) {
      response = `Today is ${formattedDate}.`;
    }
    // Health status
    else if (lowerCommand.includes("health") || lowerCommand.includes("status") || lowerCommand.includes("how am i")) {
      response = `Your health status is good. You have taken ${takenCount} out of ${totalMedicines} medications today.`;
    }
    // Emergency
    else if (lowerCommand.includes("emergency") || lowerCommand.includes("help") || lowerCommand.includes("sos")) {
      setOpenSOSDialog(true);
      response = "I'm opening the emergency SOS dialog. Do you need immediate help?";
    }
    // Logout
    else if (lowerCommand.includes("logout") || lowerCommand.includes("sign out") || lowerCommand.includes("log out")) {
      response = "Logging you out now. Goodbye!";
      setTimeout(() => handleLogout(), 2000);
    }
    // Default response
    else {
      response = "I'm sorry, I didn't understand that. You can ask me about your medicines, tasks, time, date, or health status. You can also say 'emergency' for help.";
    }

    setVoiceResponse(response);
    speak(response);
  };

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setSnackbar({ open: true, message: "Voice recognition is not supported in your browser. Please use Chrome.", severity: "error" });
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      setVoiceText("");
      setVoiceResponse("");
      setOpenVoiceDialog(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setVoiceText(transcript);
      processVoiceCommand(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
      if (event.error === 'no-speech') {
        setVoiceResponse("I didn't hear anything. Please try again.");
      } else {
        setSnackbar({ open: true, message: `Voice error: ${event.error}`, severity: "error" });
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const [medicines, setMedicines] = useState([
    { id: 1, name: "Metformin", dose: "500mg", frequency: "Twice daily", times: ["08:00", "20:00"], note: "Take with food", status: "taken" },
    { id: 2, name: "Lisinopril", dose: "10mg", frequency: "Once daily", times: ["08:00"], note: "For blood pressure", status: "pending" },
    { id: 3, name: "Aspirin", dose: "81mg", frequency: "Once daily", times: ["08:00"], note: "Blood thinner", status: "taken" },
  ]);

  const [tasks, setTasks] = useState([
    { id: 1, title: "Doctor Appointment", description: "Regular checkup with Dr. Smith", dueDate: "12/01/2025, 10:00:00", priority: "high", status: "pending" },
  ]);

  const [newMed, setNewMed] = useState({ name: "", dose: "", frequency: "", times: "", note: "" });
  const [newTask, setNewTask] = useState({ title: "", description: "", priority: "medium" });
  const [searchQuery, setSearchQuery] = useState("");

  // Search handler
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      const lowerQuery = query.toLowerCase();
      // Navigate to relevant section based on search
      if (lowerQuery.includes("medicine") || lowerQuery.includes("med") || lowerQuery.includes("pill")) {
        setActiveNav("medicines");
      } else if (lowerQuery.includes("task") || lowerQuery.includes("appointment")) {
        setActiveNav("tasks");
      } else if (lowerQuery.includes("message") || lowerQuery.includes("chat")) {
        setActiveNav("messages");
      } else if (lowerQuery.includes("profile") || lowerQuery.includes("setting")) {
        setActiveNav("profile");
      }
    }
  };

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
  const shortDate = today.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

  const takenCount = medicines.filter(m => m.status === "taken").length;
  const totalMedicines = medicines.length;
  const progressPercent = (takenCount / totalMedicines) * 100;

  // Render content based on active navigation
  const renderContent = () => {
    switch (activeNav) {
      case "home":
        return renderHomeContent();
      case "medicines":
        return renderMedicinesContent();
      case "tasks":
        return renderTasksContent();
      case "messages":
        return renderMessagesContent();
      case "profile":
        return renderProfileContent();
      default:
        return renderHomeContent();
    }
  };

  const markAsTaken = (id) => {
    setMedicines((prev) => prev.map((m) => (m.id === id ? { ...m, status: "taken" } : m)));
    setSnackbar({ open: true, message: "Medication marked as taken!", severity: "success" });
  };

  const markTaskComplete = (id) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status: "completed" } : t)));
    setSnackbar({ open: true, message: "Task completed!", severity: "success" });
  };

  const handleAddMedicine = () => {
    if (!newMed.name || !newMed.dose) {
      setSnackbar({ open: true, message: "Please fill all required fields", severity: "error" });
      return;
    }
    const med = {
      id: medicines.length + 1,
      name: newMed.name,
      dose: newMed.dose,
      frequency: newMed.frequency || "Once daily",
      times: newMed.times ? newMed.times.split(",").map(t => t.trim()) : ["08:00"],
      note: newMed.note || "",
      status: "pending",
    };
    setMedicines([...medicines, med]);
    setNewMed({ name: "", dose: "", frequency: "", times: "", note: "" });
    setOpenAddMedDialog(false);
    setSnackbar({ open: true, message: "Medicine added successfully!", severity: "success" });
  };

  const handleAddTask = () => {
    if (!newTask.title) {
      setSnackbar({ open: true, message: "Please enter a task title", severity: "error" });
      return;
    }
    const task = {
      id: tasks.length + 1,
      title: newTask.title,
      description: newTask.description || "No description",
      dueDate: new Date().toLocaleString(),
      priority: newTask.priority,
      status: "pending",
    };
    setTasks([...tasks, task]);
    setNewTask({ title: "", description: "", priority: "medium" });
    setOpenAddTaskDialog(false);
    setSnackbar({ open: true, message: "Task added successfully!", severity: "success" });
  };

  const handleSOS = () => {
    setOpenSOSDialog(false);
    setSnackbar({ open: true, message: "🚨 Emergency SOS sent! Help is on the way!", severity: "error" });
  };

  const getStatusBadge = (status) => {
    if (status === "taken") {
      return (
        <Chip label="Taken" size="small" sx={{ backgroundColor: "#4caf50", color: "white", fontWeight: 600, fontSize: "0.7rem" }} />
      );
    }
    return (
      <Chip label="Pending" size="small" sx={{ backgroundColor: "#ff9800", color: "white", fontWeight: 600, fontSize: "0.7rem" }} />
    );
  };

  // ========== RENDER FUNCTIONS FOR EACH SECTION ==========

  const renderHomeContent = () => (
    <>
      {/* Greeting Card */}
      <Card sx={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "white", borderRadius: 3, mb: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>Hello, {userName}! 👋</Typography>
          <Typography sx={{ opacity: 0.9, fontSize: "0.9rem" }}>{formattedDate}</Typography>
        </CardContent>
      </Card>

      {/* Health Overview */}
      <Card sx={{ borderRadius: 3, mb: 3, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <Favorite sx={{ color: "#e91e63" }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>Health Overview</Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 4 }}>
            <Box sx={{ flex: 1, p: 2, backgroundColor: "#e3f2fd", borderRadius: 2 }}>
              <Typography sx={{ color: "#666", fontSize: "0.8rem", mb: 0.5 }}>Status</Typography>
              <Typography sx={{ fontWeight: 600, color: "#4caf50" }}>Good</Typography>
            </Box>
            <Box sx={{ flex: 1, p: 2, backgroundColor: "#e3f2fd", borderRadius: 2 }}>
              <Typography sx={{ color: "#666", fontSize: "0.8rem", mb: 0.5 }}>Emergency Contact</Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography sx={{ fontWeight: 600 }}>John Doe</Typography>
                <IconButton size="small" sx={{ color: "#1976d2" }}><Phone fontSize="small" /></IconButton>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Voice Assistant */}
      <Card sx={{ borderRadius: 3, mb: 3, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
        <CardContent sx={{ p: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar sx={{ bgcolor: isListening ? "#ffebee" : "#e8f5e9", width: 48, height: 48 }}>
              <Mic sx={{ color: isListening ? "#f44336" : "#4caf50" }} />
            </Avatar>
            <Box>
              <Typography sx={{ fontWeight: 600 }}>Voice Assistant</Typography>
              <Typography sx={{ color: "#666", fontSize: "0.8rem" }}>
                {isListening ? "Listening..." : "Tap to use voice commands"}
              </Typography>
            </Box>
          </Box>
          <Button 
            variant="contained" 
            startIcon={<Mic />} 
            onClick={startListening}
            disabled={isListening}
            sx={{ 
              backgroundColor: isListening ? "#f44336" : "#4caf50", 
              borderRadius: 2, 
              textTransform: "none", 
              "&:hover": { backgroundColor: isListening ? "#d32f2f" : "#43a047" },
            }}
          >
            {isListening ? "Listening..." : "Speak"}
          </Button>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <Card sx={{ flex: 1, borderRadius: 3, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
          <CardContent sx={{ textAlign: "center", p: 2 }}>
            <Medication sx={{ color: "#1976d2", fontSize: 32, mb: 1 }} />
            <Typography variant="h4" sx={{ fontWeight: 700, color: "#1976d2" }}>{takenCount}/{totalMedicines}</Typography>
            <Typography sx={{ color: "#666", fontSize: "0.8rem" }}>Medicines Taken</Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1, borderRadius: 3, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
          <CardContent sx={{ textAlign: "center", p: 2 }}>
            <CalendarToday sx={{ color: "#ff9800", fontSize: 32, mb: 1 }} />
            <Typography variant="h4" sx={{ fontWeight: 700, color: "#ff9800" }}>{tasks.filter(t => t.status !== "completed").length}</Typography>
            <Typography sx={{ color: "#666", fontSize: "0.8rem" }}>Pending Tasks</Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1, borderRadius: 3, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
          <CardContent sx={{ textAlign: "center", p: 2 }}>
            <Message sx={{ color: "#9c27b0", fontSize: 32, mb: 1 }} />
            <Typography variant="h4" sx={{ fontWeight: 700, color: "#9c27b0" }}>3</Typography>
            <Typography sx={{ color: "#666", fontSize: "0.8rem" }}>New Messages</Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Today's Medicines Summary */}
      <Card sx={{ borderRadius: 3, mb: 3, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>Today's Medicines</Typography>
            <Button size="small" onClick={() => setActiveNav("medicines")}>View All</Button>
          </Box>
          <Box sx={{ mb: 2 }}>
            <LinearProgress variant="determinate" value={progressPercent} sx={{ height: 8, borderRadius: 4, backgroundColor: "#e0e0e0", "& .MuiLinearProgress-bar": { backgroundColor: "#4caf50", borderRadius: 4 } }} />
          </Box>
          {medicines.slice(0, 2).map((med) => (
            <Box key={med.id} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 1.5, mb: 1, backgroundColor: "#f5f5f5", borderRadius: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Medication sx={{ color: "#1976d2" }} />
                <Typography sx={{ fontWeight: 500 }}>{med.name}</Typography>
              </Box>
              {getStatusBadge(med.status)}
            </Box>
          ))}
        </CardContent>
      </Card>
    </>
  );

  const renderMedicinesContent = () => (
    <>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>My Medicines</Typography>
      
      {/* Progress Card */}
      <Card sx={{ borderRadius: 3, mb: 3, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>Today's Progress</Typography>
            <Typography sx={{ fontWeight: 600, color: "#1976d2" }}>{takenCount} of {totalMedicines} taken</Typography>
          </Box>
          <LinearProgress variant="determinate" value={progressPercent} sx={{ height: 10, borderRadius: 5, backgroundColor: "#e0e0e0", "& .MuiLinearProgress-bar": { backgroundColor: "#4caf50", borderRadius: 5 } }} />
        </CardContent>
      </Card>

      {/* Add Medicine Button */}
      <Button variant="contained" startIcon={<Add />} onClick={() => setOpenAddMedDialog(true)} sx={{ mb: 3, borderRadius: 2 }}>
        Add New Medicine
      </Button>

      {/* Medicines List */}
      {medicines.map((med) => (
        <Card key={med.id} sx={{ mb: 2, borderRadius: 3, backgroundColor: med.status === "taken" ? "#f1f8e9" : "#fff", border: med.status === "pending" ? "2px solid #ff9800" : "none", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar sx={{ bgcolor: "#e3f2fd", width: 50, height: 50 }}><Medication sx={{ color: "#1976d2", fontSize: 28 }} /></Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>{med.name}</Typography>
                  <Typography sx={{ color: "#666" }}>{med.dose} • {med.frequency}</Typography>
                </Box>
              </Box>
              {getStatusBadge(med.status)}
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <AccessTime sx={{ color: "#9e9e9e", fontSize: 18 }} />
              <Typography sx={{ color: "#666" }}>Schedule: {med.times.join(", ")}</Typography>
            </Box>
            {med.note && <Typography sx={{ color: "#666", fontStyle: "italic", mb: 2 }}>Note: {med.note}</Typography>}
            {med.status === "pending" && (
              <Button fullWidth variant="contained" startIcon={<CheckCircle />} onClick={() => markAsTaken(med.id)} sx={{ backgroundColor: "#4caf50", borderRadius: 2, textTransform: "none", py: 1.5, "&:hover": { backgroundColor: "#43a047" } }}>
                Mark as Taken
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </>
  );

  const renderTasksContent = () => (
    <>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>My Tasks</Typography>
      
      {/* Add Task Button */}
      <Button variant="contained" startIcon={<Add />} onClick={() => setOpenAddTaskDialog(true)} sx={{ mb: 3, borderRadius: 2 }}>
        Add New Task
      </Button>

      {/* Tasks List */}
      {tasks.length === 0 ? (
        <Card sx={{ borderRadius: 3, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
          <CardContent sx={{ textAlign: "center", py: 5 }}>
            <CalendarToday sx={{ fontSize: 48, color: "#ccc", mb: 2 }} />
            <Typography variant="h6" sx={{ color: "#666" }}>No tasks yet</Typography>
            <Typography sx={{ color: "#999" }}>Add your first task to get started</Typography>
          </CardContent>
        </Card>
      ) : (
        tasks.map((task) => (
          <Card key={task.id} sx={{ mb: 2, borderRadius: 3, backgroundColor: task.status === "completed" ? "#f1f8e9" : "#fff", border: task.status !== "completed" ? "2px solid #e0e0e0" : "none", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>{task.title}</Typography>
                  <Typography sx={{ color: "#666", mb: 1 }}>{task.description}</Typography>
                  <Typography sx={{ color: "#9e9e9e", fontSize: "0.85rem" }}>Due: {task.dueDate}</Typography>
                </Box>
                {task.status !== "completed" ? (
                  <Chip label={task.priority === "high" ? "High" : task.priority === "medium" ? "Medium" : "Low"} size="small" sx={{ backgroundColor: task.priority === "high" ? "#f44336" : task.priority === "medium" ? "#ff9800" : "#4caf50", color: "white", fontWeight: 600 }} />
                ) : (
                  <Chip label="Completed" size="small" color="success" />
                )}
              </Box>
              {task.status !== "completed" && (
                <Button fullWidth variant="contained" onClick={() => markTaskComplete(task.id)} sx={{ borderRadius: 2, textTransform: "none", py: 1.5 }}>
                  Mark Complete
                </Button>
              )}
            </CardContent>
          </Card>
        ))
      )}
    </>
  );

  const renderMessagesContent = () => (
    <>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>Messages</Typography>
      
      {/* Messages List */}
      <Card sx={{ borderRadius: 3, mb: 2, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
        <CardContent sx={{ p: 2 }}>
          <Box 
            sx={{ display: "flex", alignItems: "center", gap: 2, p: 1, cursor: "pointer", borderRadius: 2, bgcolor: "#e3f2fd", "&:hover": { backgroundColor: "#bbdefb" } }}
            onClick={() => setMessageReplyDialog({ open: true, contact: { name: "John (Son)", avatar: "J", color: "#1976d2", message: "How are you feeling today, Mom?" }})}
          >
            <Badge badgeContent={1} color="primary">
              <Avatar sx={{ bgcolor: "#1976d2" }}>J</Avatar>
            </Badge>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontWeight: 700 }}>John (Son)</Typography>
              <Typography sx={{ color: "#666", fontSize: "0.85rem" }}>How are you feeling today, Mom?</Typography>
            </Box>
            <Box sx={{ textAlign: "right" }}>
              <Typography sx={{ color: "#999", fontSize: "0.75rem" }}>10:30 AM</Typography>
              <Button size="small" sx={{ mt: 0.5 }}>Reply</Button>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Card sx={{ borderRadius: 3, mb: 2, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
        <CardContent sx={{ p: 2 }}>
          <Box 
            sx={{ display: "flex", alignItems: "center", gap: 2, p: 1, cursor: "pointer", borderRadius: 2, bgcolor: "#e8f5e9", "&:hover": { backgroundColor: "#c8e6c9" } }}
            onClick={() => setMessageReplyDialog({ open: true, contact: { name: "Sarah (Caregiver)", avatar: "S", color: "#4caf50", message: "I'll visit you at 2 PM today." }})}
          >
            <Badge badgeContent={1} color="success">
              <Avatar sx={{ bgcolor: "#4caf50" }}>S</Avatar>
            </Badge>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontWeight: 700 }}>Sarah (Caregiver)</Typography>
              <Typography sx={{ color: "#666", fontSize: "0.85rem" }}>I'll visit you at 2 PM today.</Typography>
            </Box>
            <Box sx={{ textAlign: "right" }}>
              <Typography sx={{ color: "#999", fontSize: "0.75rem" }}>9:15 AM</Typography>
              <Button size="small" sx={{ mt: 0.5 }}>Reply</Button>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Card sx={{ borderRadius: 3, mb: 2, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
        <CardContent sx={{ p: 2 }}>
          <Box 
            sx={{ display: "flex", alignItems: "center", gap: 2, p: 1, cursor: "pointer", borderRadius: 2, "&:hover": { backgroundColor: "#f5f5f5" } }}
            onClick={() => setMessageReplyDialog({ open: true, contact: { name: "Dr. Smith", avatar: "D", color: "#9c27b0", message: "Your test results look good!" }})}
          >
            <Avatar sx={{ bgcolor: "#9c27b0" }}>D</Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontWeight: 600 }}>Dr. Smith</Typography>
              <Typography sx={{ color: "#666", fontSize: "0.85rem" }}>Your test results look good!</Typography>
            </Box>
            <Box sx={{ textAlign: "right" }}>
              <Typography sx={{ color: "#999", fontSize: "0.75rem" }}>Yesterday</Typography>
              <Button size="small" sx={{ mt: 0.5 }}>Reply</Button>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Quick Reply */}
      <Card sx={{ borderRadius: 3, boxShadow: "0 2px 8px rgba(0,0,0,0.08)", mt: 3 }}>
        <CardContent sx={{ p: 2 }}>
          <Typography sx={{ fontWeight: 600, mb: 2 }}>Quick Replies</Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {["I'm doing well!", "Thank you!", "See you soon!", "Call me please"].map((msg) => (
              <Chip key={msg} label={msg} onClick={() => setSnackbar({ open: true, message: `Sent: "${msg}"`, severity: "success" })} sx={{ cursor: "pointer", "&:hover": { backgroundColor: "#e3f2fd" } }} />
            ))}
          </Box>
        </CardContent>
      </Card>
    </>
  );

  const renderProfileContent = () => (
    <>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>My Profile</Typography>
      
      {/* Profile Card */}
      <Card sx={{ borderRadius: 3, mb: 3, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
        <CardContent sx={{ textAlign: "center", py: 4 }}>
          <Avatar sx={{ bgcolor: "#7c4dff", width: 100, height: 100, mx: "auto", mb: 2, fontSize: "2.5rem" }}>{userName.charAt(0)}</Avatar>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>{userName} Thompson</Typography>
          <Typography sx={{ color: "#666", mb: 2 }}>Elder</Typography>
          <Chip label="Active" color="success" />
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card sx={{ borderRadius: 3, mb: 3, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>Personal Information</Typography>
          
          <Box sx={{ mb: 2 }}>
            <Typography sx={{ color: "#666", fontSize: "0.8rem" }}>Full Name</Typography>
            <Typography sx={{ fontWeight: 500 }}>{userName} Thompson</Typography>
          </Box>
          
          <Box sx={{ mb: 2 }}>
            <Typography sx={{ color: "#666", fontSize: "0.8rem" }}>Age</Typography>
            <Typography sx={{ fontWeight: 500 }}>78 years old</Typography>
          </Box>
          
          <Box sx={{ mb: 2 }}>
            <Typography sx={{ color: "#666", fontSize: "0.8rem" }}>Phone</Typography>
            <Typography sx={{ fontWeight: 500 }}>+1 (555) 123-4567</Typography>
          </Box>
          
          <Box sx={{ mb: 2 }}>
            <Typography sx={{ color: "#666", fontSize: "0.8rem" }}>Address</Typography>
            <Typography sx={{ fontWeight: 500 }}>123 Oak Street, Apt 4B</Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Emergency Contacts */}
      <Card sx={{ borderRadius: 3, mb: 3, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>Emergency Contacts</Typography>
          
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", p: 2, backgroundColor: "#f5f5f5", borderRadius: 2, mb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar sx={{ bgcolor: "#1976d2" }}>J</Avatar>
              <Box>
                <Typography sx={{ fontWeight: 600 }}>John Thompson</Typography>
                <Typography sx={{ color: "#666", fontSize: "0.85rem" }}>Son • +1 (555) 234-5678</Typography>
              </Box>
            </Box>
            <IconButton sx={{ color: "#1976d2" }}><Phone /></IconButton>
          </Box>
          
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", p: 2, backgroundColor: "#f5f5f5", borderRadius: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar sx={{ bgcolor: "#4caf50" }}>S</Avatar>
              <Box>
                <Typography sx={{ fontWeight: 600 }}>Dr. Smith</Typography>
                <Typography sx={{ color: "#666", fontSize: "0.85rem" }}>Doctor • +1 (555) 345-6789</Typography>
              </Box>
            </Box>
            <IconButton sx={{ color: "#1976d2" }}><Phone /></IconButton>
          </Box>
        </CardContent>
      </Card>

      {/* Settings */}
      <Card sx={{ borderRadius: 3, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>Settings</Typography>
          <Button fullWidth variant="outlined" sx={{ mb: 1, justifyContent: "flex-start", borderRadius: 2 }}>Edit Profile</Button>
          <Button fullWidth variant="outlined" sx={{ mb: 1, justifyContent: "flex-start", borderRadius: 2 }}>Change Password</Button>
          <Button fullWidth variant="outlined" sx={{ mb: 1, justifyContent: "flex-start", borderRadius: 2 }}>Notification Settings</Button>
          <Button fullWidth variant="outlined" color="error" onClick={handleLogout} sx={{ justifyContent: "flex-start", borderRadius: 2 }}>Logout</Button>
        </CardContent>
      </Card>
    </>
  );

  return (
    <>
      {/* Main Content */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", width: "100%" }}>
        {/* Top Bar */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2, backgroundColor: "white", borderBottom: "1px solid #e0e0e0" }}>
          <TextField
            size="small"
            placeholder="Search medicines, tasks, messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => { if (e.key === 'Enter') handleSearch(searchQuery); }}
            sx={{ width: 300, "& .MuiOutlinedInput-root": { borderRadius: 3, backgroundColor: "#f5f5f5" } }}
            InputProps={{ startAdornment: <InputAdornment position="start"><Search sx={{ color: "#9e9e9e", cursor: "pointer" }} onClick={() => handleSearch(searchQuery)} /></InputAdornment> }}
          />
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography sx={{ color: "#666", fontSize: "0.9rem" }}>{shortDate}</Typography>
            <IconButton onClick={handleNotificationClick}>
              <Badge badgeContent={unreadNotifications} color="error"><Notifications sx={{ color: "#666" }} /></Badge>
            </IconButton>
            <IconButton onClick={handleProfileClick}>
              <Avatar sx={{ bgcolor: "#7c4dff", width: 36, height: 36 }}>{userName.charAt(0)}</Avatar>
            </IconButton>
          </Box>
        </Box>

        {/* Profile Menu */}
        <Menu
          anchorEl={profileAnchor}
          open={Boolean(profileAnchor)}
          onClose={handleProfileClose}
          PaperProps={{ sx: { width: 200, mt: 1 } }}
        >
          <Box sx={{ px: 2, py: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{user.name || userName}</Typography>
            <Typography variant="body2" color="text.secondary">{user.email || "elder@example.com"}</Typography>
          </Box>
          <Divider />
          <MenuItem onClick={handleOpenProfile}>
            <Person sx={{ mr: 1 }} /> Profile
          </MenuItem>
          <MenuItem onClick={handleOpenSettings}>
            <Settings sx={{ mr: 1 }} /> Settings
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
            <Logout sx={{ mr: 1 }} /> Logout
          </MenuItem>
        </Menu>

        {/* Notification Menu */}
        <Menu
          anchorEl={notificationAnchor}
          open={Boolean(notificationAnchor)}
          onClose={handleNotificationClose}
          PaperProps={{
            sx: {
              width: 360,
              maxHeight: 450,
              borderRadius: 3,
              boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
            }
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #e0e0e0" }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>Notifications</Typography>
            {unreadNotifications > 0 && (
              <Button size="small" onClick={markAllNotificationsRead}>Mark all read</Button>
            )}
          </Box>
          
          {notifications.length === 0 ? (
            <Box sx={{ p: 4, textAlign: "center" }}>
              <Notifications sx={{ fontSize: 48, color: "#ccc", mb: 1 }} />
              <Typography color="text.secondary">No notifications</Typography>
            </Box>
          ) : (
            <List sx={{ p: 0 }}>
              {notifications.map((notif, index) => (
                <Box key={notif.id}>
                  <ListItem 
                    sx={{ 
                      py: 1.5, 
                      px: 2,
                      backgroundColor: notif.read ? "transparent" : "#e3f2fd",
                      cursor: "pointer",
                      "&:hover": { backgroundColor: notif.read ? "#f5f5f5" : "#bbdefb" }
                    }}
                    onClick={() => markNotificationRead(notif.id)}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: notif.read ? "#f5f5f5" : "#e3f2fd", width: 40, height: 40 }}>
                        {getNotificationIcon(notif.type)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={<Typography sx={{ fontWeight: notif.read ? 400 : 600, fontSize: "0.9rem" }}>{notif.title}</Typography>}
                      secondary={
                        <Box>
                          <Typography sx={{ fontSize: "0.8rem", color: "#666" }}>{notif.message}</Typography>
                          <Typography sx={{ fontSize: "0.7rem", color: "#999", mt: 0.5 }}>{notif.time}</Typography>
                        </Box>
                      }
                    />
                    {!notif.read && <Box sx={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#1976d2" }} />}
                  </ListItem>
                  {index < notifications.length - 1 && <Divider />}
                </Box>
              ))}
            </List>
          )}
          
          {notifications.length > 0 && (
            <Box sx={{ p: 1, borderTop: "1px solid #e0e0e0" }}>
              <Button fullWidth size="small" color="error" onClick={clearAllNotifications}>
                Clear All Notifications
              </Button>
            </Box>
          )}
        </Menu>

        {/* Content Area */}
        <Box sx={{ flex: 1, p: 3, overflowY: "auto" }}>
          {renderContent()}
        </Box>
      </Box>

      {/* Floating SOS Button */}
      <Box onClick={() => setOpenSOSDialog(true)} sx={{ position: "fixed", bottom: 24, right: 24, width: 70, height: 70, borderRadius: "50%", backgroundColor: "#f44336", color: "white", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 4px 12px rgba(244,67,54,0.4)", transition: "all 0.3s ease", "&:hover": { transform: "scale(1.1)", boxShadow: "0 6px 16px rgba(244,67,54,0.5)" } }}>
        <Warning sx={{ fontSize: 28 }} />
        <Typography sx={{ fontSize: "0.65rem", fontWeight: 600 }}>SOS</Typography>
      </Box>

      {/* Add Medicine Dialog */}
      <Dialog open={openAddMedDialog} onClose={() => setOpenAddMedDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            Add New Medicine
            <IconButton onClick={() => setOpenAddMedDialog(false)}><Close /></IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField fullWidth label="Medicine Name" value={newMed.name} onChange={(e) => setNewMed({ ...newMed, name: e.target.value })} required />
            <TextField fullWidth label="Dose" placeholder="e.g., 500mg" value={newMed.dose} onChange={(e) => setNewMed({ ...newMed, dose: e.target.value })} required />
            <TextField fullWidth label="Frequency" placeholder="e.g., Twice daily" value={newMed.frequency} onChange={(e) => setNewMed({ ...newMed, frequency: e.target.value })} />
            <TextField fullWidth label="Times" placeholder="e.g., 08:00, 20:00" value={newMed.times} onChange={(e) => setNewMed({ ...newMed, times: e.target.value })} />
            <TextField fullWidth label="Note" placeholder="e.g., Take with food" value={newMed.note} onChange={(e) => setNewMed({ ...newMed, note: e.target.value })} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddMedDialog(false)}>Cancel</Button>
          <Button variant="contained" startIcon={<Add />} onClick={handleAddMedicine}>Add Medicine</Button>
        </DialogActions>
      </Dialog>

      {/* Add Task Dialog */}
      <Dialog open={openAddTaskDialog} onClose={() => setOpenAddTaskDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            Add New Task
            <IconButton onClick={() => setOpenAddTaskDialog(false)}><Close /></IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField fullWidth label="Task Title" value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} required />
            <TextField fullWidth label="Description" multiline rows={2} value={newTask.description} onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} />
            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select value={newTask.priority} label="Priority" onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}>
                <MenuItem value="high">High</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="low">Low</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddTaskDialog(false)}>Cancel</Button>
          <Button variant="contained" startIcon={<Add />} onClick={handleAddTask}>Add Task</Button>
        </DialogActions>
      </Dialog>

      {/* SOS Confirmation Dialog */}
      <Dialog open={openSOSDialog} onClose={() => setOpenSOSDialog(false)}>
        <DialogTitle sx={{ color: "error.main" }}>🚨 Emergency SOS</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to send an emergency SOS alert?</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>This will immediately notify your emergency contacts and nearby help services.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSOSDialog(false)}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleSOS}>Send SOS</Button>
        </DialogActions>
      </Dialog>

      {/* Voice Assistant Dialog */}
      <Dialog open={openVoiceDialog} onClose={() => setOpenVoiceDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Mic sx={{ color: isListening ? "#f44336" : "#4caf50" }} />
              Voice Assistant
            </Box>
            <IconButton onClick={() => setOpenVoiceDialog(false)}><Close /></IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ textAlign: "center", py: 3 }}>
            {/* Listening Animation */}
            <Avatar 
              sx={{ 
                bgcolor: isListening ? "#ffebee" : "#e8f5e9", 
                width: 100, 
                height: 100, 
                mx: "auto", 
                mb: 3,
                animation: isListening ? "pulse 1.5s infinite" : "none",
                "@keyframes pulse": {
                  "0%": { boxShadow: "0 0 0 0 rgba(244, 67, 54, 0.4)" },
                  "70%": { boxShadow: "0 0 0 20px rgba(244, 67, 54, 0)" },
                  "100%": { boxShadow: "0 0 0 0 rgba(244, 67, 54, 0)" },
                },
              }}
            >
              <Mic sx={{ fontSize: 50, color: isListening ? "#f44336" : "#4caf50" }} />
            </Avatar>

            {isListening && (
              <Typography sx={{ color: "#f44336", fontWeight: 600, mb: 2 }}>
                🎤 Listening...
              </Typography>
            )}

            {voiceText && (
              <Box sx={{ mb: 3, p: 2, backgroundColor: "#f5f5f5", borderRadius: 2 }}>
                <Typography sx={{ color: "#666", fontSize: "0.8rem", mb: 0.5 }}>You said:</Typography>
                <Typography sx={{ fontWeight: 600, fontSize: "1.1rem" }}>"{voiceText}"</Typography>
              </Box>
            )}

            {voiceResponse && (
              <Box sx={{ p: 2, backgroundColor: "#e3f2fd", borderRadius: 2 }}>
                <Typography sx={{ color: "#666", fontSize: "0.8rem", mb: 0.5 }}>Assistant:</Typography>
                <Typography sx={{ fontWeight: 500 }}>{voiceResponse}</Typography>
              </Box>
            )}

            {!isListening && !voiceText && (
              <Box>
                <Typography sx={{ color: "#666", mb: 2 }}>Try saying:</Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, justifyContent: "center" }}>
                  {["What's my medicine?", "What time is it?", "Check my tasks", "How am I doing?"].map((cmd) => (
                    <Chip key={cmd} label={cmd} size="small" sx={{ backgroundColor: "#e8f5e9" }} />
                  ))}
                </Box>
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
          <Button 
            variant="contained" 
            startIcon={<Mic />} 
            onClick={startListening}
            disabled={isListening}
            sx={{ 
              backgroundColor: isListening ? "#f44336" : "#4caf50",
              px: 4,
              "&:hover": { backgroundColor: isListening ? "#d32f2f" : "#43a047" },
            }}
          >
            {isListening ? "Listening..." : "Speak Again"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Profile Dialog */}
      <Dialog open={profileDialog} onClose={() => setProfileDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            My Profile
            <IconButton onClick={() => setProfileDialog(false)}><Close /></IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ py: 2, textAlign: "center" }}>
            <Avatar sx={{ width: 80, height: 80, bgcolor: "#7c4dff", mx: "auto", mb: 2, fontSize: "2rem" }}>
              {userName.charAt(0)}
            </Avatar>
            <TextField
              fullWidth
              label="Full Name"
              value={editProfile.name}
              onChange={(e) => setEditProfile({ ...editProfile, name: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={editProfile.email}
              onChange={(e) => setEditProfile({ ...editProfile, email: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Phone"
              value={editProfile.phone}
              onChange={(e) => setEditProfile({ ...editProfile, phone: e.target.value })}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setProfileDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveProfile}>Save Profile</Button>
        </DialogActions>
      </Dialog>

      {/* Settings Dialog */}
      <Dialog open={settingsDialog} onClose={() => setSettingsDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            Settings
            <IconButton onClick={() => setSettingsDialog(false)}><Close /></IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <List>
            <ListItem sx={{ bgcolor: "#f5f7fa", borderRadius: 2, mb: 1 }}>
              <ListItemText primary="Notifications" secondary="Receive alerts and reminders" />
              <Chip label="Enabled" color="success" size="small" />
            </ListItem>
            <ListItem sx={{ bgcolor: "#f5f7fa", borderRadius: 2, mb: 1 }}>
              <ListItemText primary="Voice Assistant" secondary="Enable voice commands" />
              <Chip label="Enabled" color="success" size="small" />
            </ListItem>
            <ListItem sx={{ bgcolor: "#f5f7fa", borderRadius: 2, mb: 1 }}>
              <ListItemText primary="Large Text" secondary="Increase text size" />
              <Chip label="Enabled" color="success" size="small" />
            </ListItem>
            <ListItem sx={{ bgcolor: "#f5f7fa", borderRadius: 2 }}>
              <ListItemText primary="Emergency Contacts" secondary="Quick access to emergency services" />
              <Chip label="Configured" color="primary" size="small" />
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSettingsDialog(false)}>Close</Button>
          <Button variant="contained" onClick={() => { setSettingsDialog(false); setSnackbar({ open: true, message: "Settings saved!", severity: "success" }); }}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Message Reply Dialog */}
      <Dialog open={messageReplyDialog.open} onClose={() => { setMessageReplyDialog({ open: false, contact: null }); setReplyText(""); }} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            Reply to Message
            <IconButton onClick={() => { setMessageReplyDialog({ open: false, contact: null }); setReplyText(""); }}><Close /></IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          {messageReplyDialog.contact && (
            <Box sx={{ py: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                <Avatar sx={{ bgcolor: messageReplyDialog.contact.color }}>{messageReplyDialog.contact.avatar}</Avatar>
                <Typography variant="h6">{messageReplyDialog.contact.name}</Typography>
              </Box>
              <Box sx={{ bgcolor: "#f5f5f5", p: 2, borderRadius: 2, mb: 2 }}>
                <Typography variant="body2" color="text.secondary">Original message:</Typography>
                <Typography>{messageReplyDialog.contact.message}</Typography>
              </Box>
              <TextField 
                fullWidth 
                multiline 
                rows={3} 
                placeholder="Type your reply..." 
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2 }}>
                <Typography variant="body2" sx={{ width: "100%", color: "#666", mb: 1 }}>Quick replies:</Typography>
                {["I'm doing well!", "Thank you!", "See you soon!", "Call me please"].map((msg) => (
                  <Chip 
                    key={msg} 
                    label={msg} 
                    size="small"
                    onClick={() => setReplyText(msg)} 
                    sx={{ cursor: "pointer", "&:hover": { backgroundColor: "#e3f2fd" } }} 
                  />
                ))}
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setMessageReplyDialog({ open: false, contact: null }); setReplyText(""); }}>Cancel</Button>
          <Button 
            variant="contained" 
            disabled={!replyText.trim()}
            onClick={() => {
              setSnackbar({ open: true, message: `Reply sent to ${messageReplyDialog.contact?.name}!`, severity: "success" });
              setMessageReplyDialog({ open: false, contact: null });
              setReplyText("");
            }}
          >
            Send Reply
          </Button>
        </DialogActions>
      </Dialog>

      {/* Incoming Call Dialog */}
      <Dialog open={incomingCallDialog.open} onClose={() => setIncomingCallDialog({ open: false, caller: null })} maxWidth="xs" fullWidth>
        <DialogContent sx={{ textAlign: "center", py: 4 }}>
          {incomingCallDialog.caller && (
            <>
              <Avatar sx={{ width: 80, height: 80, bgcolor: "#4caf50", mx: "auto", mb: 2, fontSize: "2rem" }}>
                {incomingCallDialog.caller.avatar}
              </Avatar>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>{incomingCallDialog.caller.name}</Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>Incoming call...</Typography>
              <Box sx={{ display: "flex", justifyContent: "center", gap: 3 }}>
                <Button 
                  variant="contained" 
                  color="error" 
                  sx={{ borderRadius: "50%", minWidth: 60, height: 60 }}
                  onClick={() => {
                    setIncomingCallDialog({ open: false, caller: null });
                    setSnackbar({ open: true, message: "Call declined", severity: "info" });
                  }}
                >
                  <Phone sx={{ transform: "rotate(135deg)" }} />
                </Button>
                <Button 
                  variant="contained" 
                  color="success" 
                  sx={{ borderRadius: "50%", minWidth: 60, height: 60 }}
                  onClick={() => {
                    setSnackbar({ open: true, message: `Call connected with ${incomingCallDialog.caller.name}!`, severity: "success" });
                    setIncomingCallDialog({ open: false, caller: null });
                  }}
                >
                  <Phone />
                </Button>
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Snackbar */}
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>{snackbar.message}</Alert>
      </Snackbar>
    </>
  );
}
