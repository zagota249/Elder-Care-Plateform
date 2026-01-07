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
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

// Sidebar navigation items
const sidebarItems = [
  { id: "home", label: "Home", icon: <HomeIcon /> },
  { id: "medicines", label: "Medicines", icon: <Medication /> },
  { id: "tasks", label: "Tasks", icon: <CalendarToday /> },
  { id: "messages", label: "Messages", icon: <Message /> },
  { id: "profile", label: "Profile", icon: <Person /> },
];

export default function Home() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("home");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [openAddMedDialog, setOpenAddMedDialog] = useState(false);
  const [openAddTaskDialog, setOpenAddTaskDialog] = useState(false);
  const [openSOSDialog, setOpenSOSDialog] = useState(false);
  const [userName, setUserName] = useState("Margaret");

  // Voice Assistant States
  const [isListening, setIsListening] = useState(false);
  const [voiceText, setVoiceText] = useState("");
  const [voiceResponse, setVoiceResponse] = useState("");
  const [openVoiceDialog, setOpenVoiceDialog] = useState(false);

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

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
  const shortDate = today.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

  const takenCount = medicines.filter(m => m.status === "taken").length;
  const totalMedicines = medicines.length;
  const progressPercent = (takenCount / totalMedicines) * 100;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/signin");
  };

  const handleNavClick = (id) => {
    setActiveNav(id);
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

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#e8f4fc" }}>
      {/* Sidebar */}
      <Box sx={{ width: 220, background: "linear-gradient(180deg, #1a1f4e 0%, #2d3a8c 100%)", color: "white", display: "flex", flexDirection: "column", p: 2 }}>
        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
          <Box sx={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg, #00bcd4 0%, #4caf50 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Favorite sx={{ color: "white", fontSize: 20 }} />
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 700, fontSize: "1rem" }}>ElderCare</Typography>
            <Typography sx={{ fontSize: "0.65rem", opacity: 0.7 }}>Support & Companion</Typography>
          </Box>
        </Box>

        {/* User Profile */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3, p: 1.5, borderRadius: 2, backgroundColor: "rgba(255,255,255,0.1)" }}>
          <Avatar sx={{ bgcolor: "#7c4dff", width: 40, height: 40 }}>{userName.charAt(0)}</Avatar>
          <Box>
            <Typography sx={{ fontWeight: 600, fontSize: "0.9rem" }}>{userName} Thompson</Typography>
            <Typography sx={{ fontSize: "0.7rem", opacity: 0.7 }}>Elder</Typography>
          </Box>
        </Box>

        {/* Navigation */}
        <Box sx={{ flex: 1 }}>
          {sidebarItems.map((item) => (
            <Box
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              sx={{
                display: "flex", alignItems: "center", gap: 1.5, p: 1.5, borderRadius: 2, cursor: "pointer", mb: 0.5,
                backgroundColor: activeNav === item.id ? "#00bcd4" : "transparent",
                transition: "all 0.2s ease",
                "&:hover": { backgroundColor: activeNav === item.id ? "#00bcd4" : "rgba(255,255,255,0.1)" },
              }}
            >
              {item.icon}
              <Typography sx={{ fontSize: "0.9rem" }}>{item.label}</Typography>
            </Box>
          ))}
        </Box>

        <Button variant="outlined" onClick={handleLogout} sx={{ color: "white", borderColor: "rgba(255,255,255,0.3)", mt: 2, "&:hover": { borderColor: "white", backgroundColor: "rgba(255,255,255,0.1)" } }}>
          Logout
        </Button>
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Top Bar */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2, backgroundColor: "white", borderBottom: "1px solid #e0e0e0" }}>
          <TextField
            size="small"
            placeholder="Search..."
            sx={{ width: 300, "& .MuiOutlinedInput-root": { borderRadius: 3, backgroundColor: "#f5f5f5" } }}
            InputProps={{ startAdornment: <InputAdornment position="start"><Search sx={{ color: "#9e9e9e" }} /></InputAdornment> }}
          />
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography sx={{ color: "#666", fontSize: "0.9rem" }}>{shortDate}</Typography>
            <IconButton>
              <Badge badgeContent={2} color="error"><Notifications sx={{ color: "#666" }} /></Badge>
            </IconButton>
            <Avatar sx={{ bgcolor: "#7c4dff", width: 36, height: 36 }}>{userName.charAt(0)}</Avatar>
          </Box>
        </Box>

        {/* Content Area */}
        <Box sx={{ flex: 1, p: 3, overflowY: "auto" }}>
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
                  animation: isListening ? "pulse 1.5s infinite" : "none",
                  "@keyframes pulse": {
                    "0%": { boxShadow: "0 0 0 0 rgba(244, 67, 54, 0.4)" },
                    "70%": { boxShadow: "0 0 0 10px rgba(244, 67, 54, 0)" },
                    "100%": { boxShadow: "0 0 0 0 rgba(244, 67, 54, 0)" },
                  },
                }}
              >
                {isListening ? "Listening..." : "Speak"}
              </Button>
            </CardContent>
          </Card>

          {/* Today's Medicines */}
          <Card sx={{ borderRadius: 3, mb: 3, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CalendarToday sx={{ color: "#1976d2" }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>Today's Medicines</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Typography sx={{ color: "#666", fontSize: "0.8rem" }}>{takenCount} of {totalMedicines} taken</Typography>
                  <Typography sx={{ fontWeight: 600, color: "#1976d2" }}>{takenCount}/{totalMedicines}</Typography>
                  <IconButton size="small" color="primary" onClick={() => setOpenAddMedDialog(true)}><Add /></IconButton>
                </Box>
              </Box>

              <Box sx={{ mb: 3 }}>
                <LinearProgress variant="determinate" value={progressPercent} sx={{ height: 8, borderRadius: 4, backgroundColor: "#e0e0e0", "& .MuiLinearProgress-bar": { backgroundColor: "#4caf50", borderRadius: 4 } }} />
              </Box>

              {medicines.map((med) => (
                <Card key={med.id} sx={{ mb: 2, borderRadius: 2, backgroundColor: med.status === "taken" ? "#f1f8e9" : "#fff", border: med.status === "pending" ? "1px solid #e0e0e0" : "none" }}>
                  <CardContent sx={{ p: 2 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <Avatar sx={{ bgcolor: "#e3f2fd", width: 36, height: 36 }}><Medication sx={{ color: "#1976d2", fontSize: 20 }} /></Avatar>
                        <Box>
                          <Typography sx={{ fontWeight: 600 }}>{med.name}</Typography>
                          <Typography sx={{ color: "#666", fontSize: "0.8rem" }}>{med.dose} • {med.frequency}</Typography>
                        </Box>
                      </Box>
                      {getStatusBadge(med.status)}
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                      <AccessTime sx={{ color: "#9e9e9e", fontSize: 16 }} />
                      <Typography sx={{ color: "#666", fontSize: "0.8rem" }}>{med.times.join(", ")}</Typography>
                    </Box>
                    {med.note && <Typography sx={{ color: "#666", fontSize: "0.8rem", fontStyle: "italic" }}>{med.note}</Typography>}
                    {med.status === "pending" && (
                      <Button fullWidth variant="contained" startIcon={<CheckCircle />} onClick={() => markAsTaken(med.id)} sx={{ mt: 2, backgroundColor: "#4caf50", borderRadius: 2, textTransform: "none", "&:hover": { backgroundColor: "#43a047" } }}>
                        Mark as Taken
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>

          {/* Today's Tasks */}
          <Card sx={{ borderRadius: 3, mb: 3, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CalendarToday sx={{ color: "#1976d2" }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>Today's Tasks</Typography>
                </Box>
                <IconButton size="small" color="primary" onClick={() => setOpenAddTaskDialog(true)}><Add /></IconButton>
              </Box>

              {tasks.map((task) => (
                <Card key={task.id} sx={{ mb: 2, borderRadius: 2, backgroundColor: task.status === "completed" ? "#f1f8e9" : "#fff", border: "1px solid #e0e0e0" }}>
                  <CardContent sx={{ p: 2 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <Box>
                        <Typography sx={{ fontWeight: 600 }}>{task.title}</Typography>
                        <Typography sx={{ color: "#666", fontSize: "0.8rem", mb: 1 }}>{task.description}</Typography>
                        <Typography sx={{ color: "#9e9e9e", fontSize: "0.75rem" }}>Due: {task.dueDate}</Typography>
                      </Box>
                      {task.status !== "completed" ? (
                        <Chip label={task.priority === "high" ? "High" : task.priority === "medium" ? "Medium" : "Low"} size="small" sx={{ backgroundColor: task.priority === "high" ? "#f44336" : task.priority === "medium" ? "#ff9800" : "#4caf50", color: "white", fontWeight: 600, fontSize: "0.7rem" }} />
                      ) : (
                        <Chip label="Done" size="small" color="success" />
                      )}
                    </Box>
                    {task.status !== "completed" && (
                      <Button fullWidth variant="outlined" onClick={() => markTaskComplete(task.id)} sx={{ mt: 2, borderRadius: 2, textTransform: "none" }}>
                        Mark Complete
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
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

      {/* Snackbar */}
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
}
