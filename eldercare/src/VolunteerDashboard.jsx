import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Avatar,
  Button,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Badge,
  Divider,
  Switch,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  LinearProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
} from "@mui/material";
import {
  Dashboard,
  ElderlyWoman,
  Assignment,
  CalendarMonth,
  Message,
  EmojiEvents,
  Notifications,
  Phone,
  Videocam,
  Logout,
  VolunteerActivism,
  CheckCircle,
  AccessTime,
  LocalHospital,
  Add,
  Close,
  Edit,
  Save,
  Star,
  LocationOn,
  MedicalServices,
  Favorite,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

// Card hover style
const cardHoverSx = {
  borderRadius: 3,
  boxShadow: 2,
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: 6,
  },
};

export default function VolunteerDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isAvailable, setIsAvailable] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [openTaskDialog, setOpenTaskDialog] = useState(false);
  const [openElderDialog, setOpenElderDialog] = useState(false);
  const [openMessageDialog, setOpenMessageDialog] = useState(false);
  const [selectedElder, setSelectedElder] = useState(null);
  const [messageText, setMessageText] = useState("");

  // Volunteer Info
  const volunteerInfo = {
    name: "Sarah Wilson",
    email: "sarah.wilson@email.com",
    phone: "555-0123",
    hoursThisMonth: 45,
    rating: 4.9,
    totalElders: 5,
    completedTasks: 128,
    badges: ["Top Volunteer", "Quick Responder", "5-Star Rating"],
  };

  // Stats
  const stats = [
    { label: "Assigned Elders", value: 5, icon: <ElderlyWoman />, color: "#1976d2" },
    { label: "Pending Tasks", value: 8, icon: <Assignment />, color: "#ed6c02" },
    { label: "Hours This Month", value: 45, icon: <AccessTime />, color: "#2e7d32" },
    { label: "Completed Tasks", value: 128, icon: <CheckCircle />, color: "#9c27b0" },
  ];

  // Elders assigned to this volunteer
  const [elders, setElders] = useState([
    {
      id: 1,
      name: "Margaret Johnson",
      age: 78,
      address: "123 Oak Street, Apt 4B",
      phone: "555-0101",
      healthScore: 85,
      lastVisit: "Dec 18, 2025",
      nextVisit: "Dec 20, 2025",
      conditions: ["Diabetes", "Hypertension"],
      emergencyContact: "John Johnson (Son) - 555-0102",
    },
    {
      id: 2,
      name: "Robert Brown",
      age: 82,
      address: "456 Maple Avenue",
      phone: "555-0103",
      healthScore: 72,
      lastVisit: "Dec 17, 2025",
      nextVisit: "Dec 21, 2025",
      conditions: ["Arthritis", "Heart Disease"],
      emergencyContact: "Emily Brown (Daughter) - 555-0104",
    },
    {
      id: 3,
      name: "Helen Martinez",
      age: 75,
      address: "789 Pine Road",
      phone: "555-0105",
      healthScore: 90,
      lastVisit: "Dec 18, 2025",
      nextVisit: "Dec 22, 2025",
      conditions: ["Mild Dementia"],
      emergencyContact: "Carlos Martinez (Son) - 555-0106",
    },
    {
      id: 4,
      name: "James Wilson",
      age: 80,
      address: "321 Elm Street",
      phone: "555-0107",
      healthScore: 78,
      lastVisit: "Dec 16, 2025",
      nextVisit: "Dec 19, 2025",
      conditions: ["COPD"],
      emergencyContact: "Lisa Wilson (Daughter) - 555-0108",
    },
    {
      id: 5,
      name: "Dorothy Lee",
      age: 77,
      address: "654 Cedar Lane",
      phone: "555-0109",
      healthScore: 88,
      lastVisit: "Dec 18, 2025",
      nextVisit: "Dec 23, 2025",
      conditions: ["Osteoporosis"],
      emergencyContact: "Michael Lee (Son) - 555-0110",
    },
  ]);

  // Tasks
  const [tasks, setTasks] = useState([
    { id: 1, elder: "Margaret Johnson", title: "Medication Reminder", time: "10:00 AM", status: "pending", priority: "high" },
    { id: 2, elder: "Robert Brown", title: "Health Check", time: "11:30 AM", status: "pending", priority: "medium" },
    { id: 3, elder: "Helen Martinez", title: "Grocery Shopping", time: "2:00 PM", status: "pending", priority: "low" },
    { id: 4, elder: "James Wilson", title: "Doctor Appointment", time: "3:30 PM", status: "completed", priority: "high" },
    { id: 5, elder: "Dorothy Lee", title: "Social Visit", time: "5:00 PM", status: "pending", priority: "low" },
  ]);

  // Schedule
  const [schedule, setSchedule] = useState([
    { id: 1, day: "Monday", time: "9:00 AM - 12:00 PM", elder: "Margaret Johnson", activity: "Health Monitoring" },
    { id: 2, day: "Monday", time: "2:00 PM - 4:00 PM", elder: "Robert Brown", activity: "Physical Therapy Assist" },
    { id: 3, day: "Tuesday", time: "10:00 AM - 1:00 PM", elder: "Helen Martinez", activity: "Companionship Visit" },
    { id: 4, day: "Wednesday", time: "9:00 AM - 11:00 AM", elder: "James Wilson", activity: "Medical Checkup Assist" },
    { id: 5, day: "Thursday", time: "1:00 PM - 3:00 PM", elder: "Dorothy Lee", activity: "Grocery Shopping" },
  ]);

  // Messages
  const [messages, setMessages] = useState([
    { id: 1, from: "Margaret Johnson", text: "Thank you for your help today!", time: "10 mins ago", read: false },
    { id: 2, from: "Admin", text: "New elder assigned to you.", time: "1 hour ago", read: true },
    { id: 3, from: "Robert Brown", text: "Can we reschedule tomorrow?", time: "2 hours ago", read: true },
  ]);

  // Achievements
  const achievements = [
    { id: 1, title: "Top Volunteer", description: "Ranked #1 this month", icon: <EmojiEvents sx={{ color: "#ffc107" }} />, earned: true },
    { id: 2, title: "Quick Responder", description: "Avg response time < 5 mins", icon: <AccessTime sx={{ color: "#2196f3" }} />, earned: true },
    { id: 3, title: "5-Star Rating", description: "Maintained 5-star rating", icon: <Star sx={{ color: "#ff9800" }} />, earned: true },
    { id: 4, title: "100 Tasks", description: "Completed 100+ tasks", icon: <CheckCircle sx={{ color: "#4caf50" }} />, earned: true },
    { id: 5, title: "50 Hours", description: "Volunteered 50+ hours", icon: <Favorite sx={{ color: "#e91e63" }} />, earned: false },
  ];

  // New Task Form
  const [newTask, setNewTask] = useState({ elder: "", title: "", time: "", priority: "medium" });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/signin");
  };

  const handleCompleteTask = (taskId) => {
    setTasks(tasks.map((t) => (t.id === taskId ? { ...t, status: "completed" } : t)));
    setSnackbar({ open: true, message: "Task marked as completed!", severity: "success" });
  };

  const handleAddTask = () => {
    if (!newTask.elder || !newTask.title || !newTask.time) {
      setSnackbar({ open: true, message: "Please fill all required fields", severity: "error" });
      return;
    }
    const task = {
      id: tasks.length + 1,
      ...newTask,
      status: "pending",
    };
    setTasks([task, ...tasks]);
    setNewTask({ elder: "", title: "", time: "", priority: "medium" });
    setOpenTaskDialog(false);
    setSnackbar({ open: true, message: "Task added successfully!", severity: "success" });
  };

  const handleCallElder = (elder) => {
    setSnackbar({ open: true, message: `Calling ${elder.name}...`, severity: "info" });
  };

  const handleVideoCall = (elder) => {
    setSnackbar({ open: true, message: `Starting video call with ${elder.name}...`, severity: "info" });
  };

  const handleSendMessage = () => {
    if (!messageText.trim()) {
      setSnackbar({ open: true, message: "Please enter a message", severity: "error" });
      return;
    }
    setSnackbar({ open: true, message: `Message sent to ${selectedElder.name}!`, severity: "success" });
    setMessageText("");
    setOpenMessageDialog(false);
  };

  const handleViewElder = (elder) => {
    setSelectedElder(elder);
    setOpenElderDialog(true);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "error";
      case "medium": return "warning";
      case "low": return "success";
      default: return "default";
    }
  };

  const sidebarItems = [
    { icon: <Dashboard />, label: "Dashboard", key: "dashboard" },
    { icon: <ElderlyWoman />, label: "My Elders", key: "elders" },
    { icon: <Assignment />, label: "Tasks", key: "tasks" },
    { icon: <CalendarMonth />, label: "Schedule", key: "schedule" },
    { icon: <Message />, label: "Messages", key: "messages", badge: messages.filter((m) => !m.read).length },
    { icon: <EmojiEvents />, label: "Achievements", key: "achievements" },
  ];

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case "dashboard": return renderDashboard();
      case "elders": return renderElders();
      case "tasks": return renderTasks();
      case "schedule": return renderSchedule();
      case "messages": return renderMessages();
      case "achievements": return renderAchievements();
      default: return renderDashboard();
    }
  };

  const renderDashboard = () => (
    <>
      {/* Stats */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={cardHoverSx}>
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Box>
                    <Typography color="text.secondary" variant="body2">{stat.label}</Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700, mt: 1 }}>{stat.value}</Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: stat.color, width: 56, height: 56 }}>{stat.icon}</Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Today's Tasks */}
        <Grid item xs={12} lg={8}>
          <Card sx={cardHoverSx}>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>Today's Tasks</Typography>
                <Button startIcon={<Add />} variant="contained" size="small" onClick={() => setOpenTaskDialog(true)}>
                  Add Task
                </Button>
              </Box>
              <List>
                {tasks.filter((t) => t.status === "pending").slice(0, 5).map((task) => (
                  <ListItem
                    key={task.id}
                    sx={{ bgcolor: "#f5f5f5", borderRadius: 2, mb: 1 }}
                    secondaryAction={
                      <Button size="small" variant="contained" color="success" onClick={() => handleCompleteTask(task.id)}>
                        Complete
                      </Button>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: "#e3f2fd" }}>
                        <Assignment color="primary" />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={task.title}
                      secondary={`${task.elder} • ${task.time}`}
                    />
                    <Chip label={task.priority} size="small" color={getPriorityColor(task.priority)} sx={{ mr: 2 }} />
                  </ListItem>
                ))}
              </List>
              <Button fullWidth sx={{ mt: 2 }} onClick={() => setActiveTab("tasks")}>View All Tasks</Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Actions & Messages */}
        <Grid item xs={12} lg={4}>
          <Card sx={{ ...cardHoverSx, mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>My Assigned Elders</Typography>
              <List dense>
                {elders.slice(0, 3).map((elder) => (
                  <ListItem key={elder.id} sx={{ px: 0 }} secondaryAction={
                    <Box>
                      <IconButton size="small" onClick={() => handleCallElder(elder)}><Phone fontSize="small" /></IconButton>
                      <IconButton size="small" onClick={() => handleVideoCall(elder)}><Videocam fontSize="small" /></IconButton>
                    </Box>
                  }>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: "#e3f2fd" }}>{elder.name.charAt(0)}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={elder.name}
                      secondary={`Health: ${elder.healthScore}%`}
                      onClick={() => handleViewElder(elder)}
                      sx={{ cursor: "pointer" }}
                    />
                  </ListItem>
                ))}
              </List>
              <Button fullWidth variant="outlined" sx={{ mt: 1 }} onClick={() => setActiveTab("elders")}>View All Elders</Button>
            </CardContent>
          </Card>

          <Card sx={cardHoverSx}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>Recent Messages</Typography>
              <List dense>
                {messages.slice(0, 3).map((msg) => (
                  <ListItem key={msg.id} sx={{ px: 0 }}>
                    <ListItemAvatar>
                      <Badge variant="dot" color="primary" invisible={msg.read}>
                        <Avatar sx={{ bgcolor: "#e8f5e9" }}>{msg.from.charAt(0)}</Avatar>
                      </Badge>
                    </ListItemAvatar>
                    <ListItemText
                      primary={msg.from}
                      secondary={msg.text}
                      primaryTypographyProps={{ fontWeight: msg.read ? 400 : 600 }}
                    />
                  </ListItem>
                ))}
              </List>
              <Button fullWidth variant="outlined" sx={{ mt: 1 }} onClick={() => setActiveTab("messages")}>View All Messages</Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );

  const renderElders = () => (
    <Grid container spacing={3}>
      {elders.map((elder) => (
        <Grid item xs={12} md={6} lg={4} key={elder.id}>
          <Card sx={cardHoverSx}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                <Avatar sx={{ bgcolor: "#1976d2", width: 64, height: 64 }}>{elder.name.charAt(0)}</Avatar>
                <Box>
                  <Typography variant="h6">{elder.name}</Typography>
                  <Typography color="text.secondary">Age: {elder.age}</Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                <LocationOn fontSize="small" color="action" />
                <Typography variant="body2">{elder.address}</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                <Phone fontSize="small" color="action" />
                <Typography variant="body2">{elder.phone}</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                <MedicalServices fontSize="small" color="action" />
                <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                  {elder.conditions.map((c, i) => (
                    <Chip key={i} label={c} size="small" variant="outlined" />
                  ))}
                </Box>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                  <Typography variant="body2">Health Score</Typography>
                  <Typography variant="body2" fontWeight={600}>{elder.healthScore}%</Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={elder.healthScore}
                  sx={{ height: 8, borderRadius: 4 }}
                  color={elder.healthScore >= 80 ? "success" : elder.healthScore >= 60 ? "warning" : "error"}
                />
              </Box>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Last Visit: {elder.lastVisit} | Next: {elder.nextVisit}
              </Typography>

              <Box sx={{ display: "flex", gap: 1 }}>
                <Button size="small" startIcon={<Phone />} variant="outlined" onClick={() => handleCallElder(elder)}>Call</Button>
                <Button size="small" startIcon={<Videocam />} variant="outlined" onClick={() => handleVideoCall(elder)}>Video</Button>
                <Button size="small" startIcon={<Message />} variant="contained" onClick={() => { setSelectedElder(elder); setOpenMessageDialog(true); }}>Message</Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  const renderTasks = () => (
    <Card sx={cardHoverSx}>
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>My Tasks</Typography>
          <Button startIcon={<Add />} variant="contained" onClick={() => setOpenTaskDialog(true)}>Add Task</Button>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Task</TableCell>
                <TableCell>Elder</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id} hover>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>{task.elder}</TableCell>
                  <TableCell>{task.time}</TableCell>
                  <TableCell><Chip label={task.priority} size="small" color={getPriorityColor(task.priority)} /></TableCell>
                  <TableCell>
                    <Chip
                      label={task.status}
                      size="small"
                      color={task.status === "completed" ? "success" : "warning"}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    {task.status === "pending" && (
                      <Button size="small" variant="contained" color="success" onClick={() => handleCompleteTask(task.id)}>
                        Complete
                      </Button>
                    )}
                    {task.status === "completed" && (
                      <Chip icon={<CheckCircle />} label="Done" size="small" color="success" />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );

  const renderSchedule = () => (
    <Card sx={cardHoverSx}>
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>Weekly Schedule</Typography>
          <Button startIcon={<CalendarMonth />} variant="outlined">View Calendar</Button>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Day</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Elder</TableCell>
                <TableCell>Activity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {schedule.map((item) => (
                <TableRow key={item.id} hover>
                  <TableCell><Chip label={item.day} size="small" /></TableCell>
                  <TableCell>{item.time}</TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Avatar sx={{ width: 28, height: 28 }}>{item.elder.charAt(0)}</Avatar>
                      {item.elder}
                    </Box>
                  </TableCell>
                  <TableCell>{item.activity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );

  const renderMessages = () => (
    <Card sx={cardHoverSx}>
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>Messages</Typography>
        <List>
          {messages.map((msg) => (
            <ListItem
              key={msg.id}
              sx={{
                bgcolor: msg.read ? "#f5f5f5" : "#e3f2fd",
                borderRadius: 2,
                mb: 1,
                cursor: "pointer",
              }}
              onClick={() => {
                setMessages(messages.map((m) => (m.id === msg.id ? { ...m, read: true } : m)));
              }}
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: msg.read ? "#e0e0e0" : "#1976d2" }}>{msg.from.charAt(0)}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={msg.from}
                secondary={
                  <>
                    <Typography variant="body2" component="span">{msg.text}</Typography>
                    <br />
                    <Typography variant="caption" color="text.secondary">{msg.time}</Typography>
                  </>
                }
                primaryTypographyProps={{ fontWeight: msg.read ? 400 : 600 }}
              />
              {!msg.read && <Chip label="New" size="small" color="primary" />}
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );

  const renderAchievements = () => (
    <Card sx={cardHoverSx}>
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>My Achievements</Typography>
        <Grid container spacing={3}>
          {achievements.map((achievement) => (
            <Grid item xs={12} sm={6} md={4} key={achievement.id}>
              <Paper
                sx={{
                  p: 3,
                  textAlign: "center",
                  opacity: achievement.earned ? 1 : 0.5,
                  ...cardHoverSx,
                }}
              >
                <Box sx={{ fontSize: 48, mb: 1 }}>{achievement.icon}</Box>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>{achievement.title}</Typography>
                <Typography color="text.secondary" variant="body2">{achievement.description}</Typography>
                {achievement.earned ? (
                  <Chip label="Earned" color="success" size="small" sx={{ mt: 1 }} />
                ) : (
                  <Chip label="Locked" size="small" sx={{ mt: 1 }} />
                )}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#f5f7fa" }}>
      {/* Sidebar */}
      <Box sx={{ width: 260, backgroundColor: "#2e7d32", color: "white", p: 2, display: "flex", flexDirection: "column" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
          <VolunteerActivism sx={{ fontSize: 32 }} />
          <Typography variant="h6" sx={{ fontWeight: 700 }}>ElderCare</Typography>
        </Box>

        {/* Volunteer Profile Card */}
        <Card sx={{ bgcolor: "rgba(255,255,255,0.1)", color: "white", mb: 3 }}>
          <CardContent sx={{ p: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
              <Avatar sx={{ bgcolor: "#81c784" }}>{volunteerInfo.name.charAt(0)}</Avatar>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{volunteerInfo.name}</Typography>
                <Typography variant="caption">Volunteer</Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
              <Typography variant="body2">Availability</Typography>
              <Switch
                checked={isAvailable}
                onChange={(e) => {
                  setIsAvailable(e.target.checked);
                  setSnackbar({
                    open: true,
                    message: e.target.checked ? "You are now available" : "You are now unavailable",
                    severity: "info",
                  });
                }}
                color="default"
                sx={{ "& .MuiSwitch-thumb": { bgcolor: isAvailable ? "#4caf50" : "#f44336" } }}
              />
            </Box>
          </CardContent>
        </Card>

        <List>
          {sidebarItems.map((item) => (
            <ListItem
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              sx={{
                borderRadius: 2,
                mb: 1,
                backgroundColor: activeTab === item.key ? "rgba(255,255,255,0.2)" : "transparent",
                cursor: "pointer",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
              }}
            >
              <ListItemAvatar sx={{ minWidth: 40 }}>
                {item.badge ? (
                  <Badge badgeContent={item.badge} color="error">{item.icon}</Badge>
                ) : (
                  item.icon
                )}
              </ListItemAvatar>
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>

        <Box sx={{ mt: "auto" }}>
          <Divider sx={{ borderColor: "rgba(255,255,255,0.2)", my: 2 }} />
          <Button fullWidth startIcon={<Logout />} onClick={handleLogout} sx={{ color: "white", justifyContent: "flex-start" }}>
            Logout
          </Button>
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1, p: 3 }}>
        {/* Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, color: "#2e7d32" }}>
              {sidebarItems.find((i) => i.key === activeTab)?.label || "Dashboard"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Welcome back, {volunteerInfo.name}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Chip
              icon={isAvailable ? <CheckCircle /> : <Close />}
              label={isAvailable ? "Available" : "Unavailable"}
              color={isAvailable ? "success" : "error"}
            />
            <IconButton onClick={() => setSnackbar({ open: true, message: "Notifications refreshed!", severity: "info" })}>
              <Badge badgeContent={messages.filter((m) => !m.read).length} color="error">
                <Notifications />
              </Badge>
            </IconButton>
            <Avatar sx={{ bgcolor: "#2e7d32", cursor: "pointer" }}>{volunteerInfo.name.charAt(0)}</Avatar>
          </Box>
        </Box>

        {renderContent()}
      </Box>

      {/* Add Task Dialog */}
      <Dialog open={openTaskDialog} onClose={() => setOpenTaskDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            Add New Task
            <IconButton onClick={() => setOpenTaskDialog(false)}><Close /></IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Elder</InputLabel>
              <Select value={newTask.elder} label="Elder" onChange={(e) => setNewTask({ ...newTask, elder: e.target.value })}>
                {elders.map((e) => (
                  <MenuItem key={e.id} value={e.name}>{e.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Task Title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            />
            <TextField
              fullWidth
              label="Time"
              type="time"
              value={newTask.time}
              onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
              InputLabelProps={{ shrink: true }}
            />
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
          <Button onClick={() => setOpenTaskDialog(false)}>Cancel</Button>
          <Button variant="contained" startIcon={<Add />} onClick={handleAddTask}>Add Task</Button>
        </DialogActions>
      </Dialog>

      {/* View Elder Dialog */}
      <Dialog open={openElderDialog} onClose={() => setOpenElderDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Elder Details</DialogTitle>
        <DialogContent>
          {selectedElder && (
            <Box sx={{ pt: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                <Avatar sx={{ width: 64, height: 64, bgcolor: "#1976d2" }}>{selectedElder.name.charAt(0)}</Avatar>
                <Box>
                  <Typography variant="h6">{selectedElder.name}</Typography>
                  <Typography color="text.secondary">Age: {selectedElder.age}</Typography>
                </Box>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">Address</Typography>
                  <Typography>{selectedElder.address}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Phone</Typography>
                  <Typography>{selectedElder.phone}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Health Score</Typography>
                  <Chip label={`${selectedElder.healthScore}%`} color={selectedElder.healthScore >= 80 ? "success" : "warning"} />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">Conditions</Typography>
                  <Box sx={{ display: "flex", gap: 0.5, mt: 0.5 }}>
                    {selectedElder.conditions.map((c, i) => (
                      <Chip key={i} label={c} size="small" variant="outlined" />
                    ))}
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">Emergency Contact</Typography>
                  <Typography>{selectedElder.emergencyContact}</Typography>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenElderDialog(false)}>Close</Button>
          <Button variant="contained" onClick={() => { setOpenElderDialog(false); handleCallElder(selectedElder); }}>Call Elder</Button>
        </DialogActions>
      </Dialog>

      {/* Message Dialog */}
      <Dialog open={openMessageDialog} onClose={() => setOpenMessageDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Send Message to {selectedElder?.name}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Your Message"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenMessageDialog(false)}>Cancel</Button>
          <Button variant="contained" startIcon={<Message />} onClick={handleSendMessage}>Send Message</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
}
