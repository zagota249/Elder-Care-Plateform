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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  LinearProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Paper,
  Switch,
  Menu,
} from "@mui/material";
import {
  Dashboard,
  People,
  PersonAdd,
  Notifications,
  Search,
  Warning,
  CheckCircle,
  Edit,
  Delete,
  Visibility,
  Settings,
  Logout,
  LocalHospital,
  VolunteerActivism,
  FamilyRestroom,
  ElderlyWoman,
  Report,
  BarChart,
  Add,
  Close,
  Save,
  Refresh,
  Star,
  Favorite,
  AccessTime,
  TrendingUp,
  TrendingDown,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart as RechartsBarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

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

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openSettingsDialog, setOpenSettingsDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  // Stats Data
  const [statsData] = useState([
    { label: "Total Elders", value: 156, icon: <ElderlyWoman />, color: "#1976d2", change: "+12%" },
    { label: "Family Members", value: 423, icon: <FamilyRestroom />, color: "#2e7d32", change: "+8%" },
    { label: "Volunteers", value: 89, icon: <VolunteerActivism />, color: "#ed6c02", change: "+15%" },
    { label: "Active Alerts", value: 7, icon: <Warning />, color: "#d32f2f", change: "-3%" },
  ]);

  // Users Data
  const [users, setUsers] = useState([
    { id: 1, name: "Margaret Johnson", email: "margaret@email.com", role: "elder", status: "active", joinDate: "Dec 15, 2025", phone: "555-0101" },
    { id: 2, name: "John Smith", email: "john@email.com", role: "familyMember", status: "active", joinDate: "Dec 14, 2025", phone: "555-0102" },
    { id: 3, name: "Sarah Wilson", email: "sarah@email.com", role: "caregiver", status: "pending", joinDate: "Dec 13, 2025", phone: "555-0103" },
    { id: 4, name: "Robert Brown", email: "robert@email.com", role: "elder", status: "active", joinDate: "Dec 12, 2025", phone: "555-0104" },
    { id: 5, name: "Emily Davis", email: "emily@email.com", role: "familyMember", status: "inactive", joinDate: "Dec 10, 2025", phone: "555-0105" },
  ]);

  // Elders Data
  const [elders, setElders] = useState([
    { id: 1, name: "Margaret Johnson", age: 78, address: "123 Oak St", healthScore: 85, caregiver: "Sarah Wilson" },
    { id: 2, name: "Robert Brown", age: 82, address: "456 Maple Ave", healthScore: 72, caregiver: "Sarah Wilson" },
    { id: 3, name: "Helen Martinez", age: 75, address: "789 Pine Rd", healthScore: 90, caregiver: "Mike Johnson" },
  ]);

  // Volunteers Data
  const [volunteers, setVolunteers] = useState([
    { id: 1, name: "Sarah Wilson", email: "sarah@email.com", hours: 45, rating: 4.9, status: "active" },
    { id: 2, name: "Mike Johnson", email: "mike@email.com", hours: 32, rating: 4.7, status: "active" },
    { id: 3, name: "Lisa Chen", email: "lisa@email.com", hours: 28, rating: 4.8, status: "inactive" },
  ]);

  // Emergency Alerts
  const [emergencyAlerts, setEmergencyAlerts] = useState([
    { id: 1, elder: "Margaret Johnson", type: "SOS", time: "10 mins ago", status: "active" },
    { id: 2, elder: "Robert Brown", type: "Missed Medication", time: "1 hour ago", status: "resolved" },
    { id: 3, elder: "Helen Martinez", type: "Fall Detected", time: "2 hours ago", status: "resolved" },
  ]);

  // Reports Data
  const [reports] = useState([
    { id: 1, title: "Monthly Health Summary", date: "Dec 2025", type: "health" },
    { id: 2, title: "Volunteer Activity Report", date: "Dec 2025", type: "volunteer" },
    { id: 3, title: "Emergency Response Times", date: "Dec 2025", type: "emergency" },
    { id: 4, title: "User Growth Analytics", date: "Dec 2025", type: "analytics" },
  ]);

  // Settings
  const [settings, setSettings] = useState({
    notifications: true,
    emailAlerts: true,
    smsAlerts: false,
    autoBackup: true,
  });

  // Notification Menu
  const [notificationAnchor, setNotificationAnchor] = useState(null);
  const [adminNotifications, setAdminNotifications] = useState([
    { id: 1, title: "New User Registration", message: "Sarah Wilson just registered as a volunteer", time: "5 min ago", read: false },
    { id: 2, title: "Emergency Alert", message: "SOS triggered by Margaret Johnson", time: "10 min ago", read: false },
    { id: 3, title: "System Update", message: "New version 2.1 is available", time: "1 hour ago", read: true },
    { id: 4, title: "Report Ready", message: "Monthly health summary is ready", time: "2 hours ago", read: true },
  ]);

  const handleNotificationClick = (event) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchor(null);
  };

  const markNotificationRead = (id) => {
    setAdminNotifications(adminNotifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllRead = () => {
    setAdminNotifications(adminNotifications.map(n => ({ ...n, read: true })));
    setSnackbar({ open: true, message: "All notifications marked as read", severity: "success" });
  };

  const unreadCount = adminNotifications.filter(n => !n.read).length;

  // Chart Data
  const userGrowthData = [
    { month: "Jul", elders: 120, family: 340, volunteers: 65 },
    { month: "Aug", elders: 128, family: 360, volunteers: 70 },
    { month: "Sep", elders: 135, family: 380, volunteers: 75 },
    { month: "Oct", elders: 142, family: 395, volunteers: 80 },
    { month: "Nov", elders: 150, family: 410, volunteers: 85 },
    { month: "Dec", elders: 156, family: 423, volunteers: 89 },
  ];

  const healthComplianceData = [
    { week: "Week 1", compliance: 85 },
    { week: "Week 2", compliance: 88 },
    { week: "Week 3", compliance: 82 },
    { week: "Week 4", compliance: 92 },
  ];

  const emergencyResponseData = [
    { month: "Oct", avgTime: 3.2 },
    { month: "Nov", avgTime: 2.8 },
    { month: "Dec", avgTime: 2.4 },
  ];

  const userDistributionData = [
    { name: "Elders", value: 156, color: "#1976d2" },
    { name: "Family", value: 423, color: "#2e7d32" },
    { name: "Volunteers", value: 89, color: "#ed6c02" },
  ];

  const activityData = [
    { day: "Mon", logins: 245, actions: 890 },
    { day: "Tue", logins: 230, actions: 850 },
    { day: "Wed", logins: 260, actions: 920 },
    { day: "Thu", logins: 280, actions: 980 },
    { day: "Fri", logins: 250, actions: 900 },
    { day: "Sat", logins: 180, actions: 650 },
    { day: "Sun", logins: 160, actions: 580 },
  ];

  // New User Form
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "elder", status: "active", phone: "" });

  // System Health
  const systemHealth = [
    { service: "API Server", status: "operational", uptime: "99.9%" },
    { service: "Database", status: "operational", uptime: "99.8%" },
    { service: "Notifications", status: "operational", uptime: "99.5%" },
    { service: "Video Calls", status: "degraded", uptime: "95.2%" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/signin");
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "elder": return "primary";
      case "familyMember": return "success";
      case "caregiver": return "warning";
      case "admin": return "error";
      default: return "default";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
      case "operational": return "success";
      case "pending":
      case "degraded": return "warning";
      case "inactive":
      case "down": return "error";
      default: return "default";
    }
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const handleEditUser = (user) => {
    setEditingUser({ ...user });
    setOpenEditDialog(true);
  };

  const handleSaveEdit = () => {
    setUsers(users.map((u) => (u.id === editingUser.id ? editingUser : u)));
    setOpenEditDialog(false);
    setSnackbar({ open: true, message: "User updated successfully!", severity: "success" });
  };

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) {
      setSnackbar({ open: true, message: "Please fill all required fields", severity: "error" });
      return;
    }
    const user = {
      id: users.length + 1,
      ...newUser,
      joinDate: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    };
    setUsers([user, ...users]);
    setNewUser({ name: "", email: "", role: "elder", status: "active", phone: "" });
    setOpenAddDialog(false);
    setSnackbar({ open: true, message: "User added successfully!", severity: "success" });
  };

  const handleDeleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((u) => u.id !== id));
      setSnackbar({ open: true, message: "User deleted successfully!", severity: "success" });
    }
  };

  const handleResolveAlert = (id) => {
    setEmergencyAlerts(emergencyAlerts.map((a) => (a.id === id ? { ...a, status: "resolved" } : a)));
    setSnackbar({ open: true, message: "Alert resolved!", severity: "success" });
  };

  const handleSaveSettings = () => {
    setOpenSettingsDialog(false);
    setSnackbar({ open: true, message: "Settings saved successfully!", severity: "success" });
  };

  const sidebarItems = [
    { icon: <Dashboard />, label: "Dashboard", key: "dashboard" },
    { icon: <People />, label: "Users", key: "users" },
    { icon: <ElderlyWoman />, label: "Elders", key: "elders" },
    { icon: <VolunteerActivism />, label: "Volunteers", key: "volunteers" },
    { icon: <Report />, label: "Reports", key: "reports" },
    { icon: <BarChart />, label: "Analytics", key: "analytics" },
    { icon: <Settings />, label: "Settings", key: "settings" },
  ];

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return renderDashboard();
      case "users":
        return renderUsers();
      case "elders":
        return renderElders();
      case "volunteers":
        return renderVolunteers();
      case "reports":
        return renderReports();
      case "analytics":
        return renderAnalytics();
      case "settings":
        return renderSettings();
      default:
        return renderDashboard();
    }
  };

  const renderDashboard = () => (
    <>
      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statsData.map((stat, index) => (
          <Grid item xs={12} sm={6} lg={3} key={index}>
            <Card sx={{ ...cardHoverSx, height: "100%" }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <Box>
                    <Typography color="text.secondary" variant="body2" sx={{ fontWeight: 500 }}>{stat.label}</Typography>
                    <Typography variant="h3" sx={{ fontWeight: 700, my: 1.5 }}>{stat.value}</Typography>
                    <Chip 
                      icon={stat.change.startsWith("+") ? <TrendingUp fontSize="small" /> : <TrendingDown fontSize="small" />}
                      label={stat.change} 
                      size="small" 
                      color={stat.change.startsWith("+") ? "success" : "error"} 
                      sx={{ height: 24, fontWeight: 600 }} 
                    />
                  </Box>
                  <Avatar sx={{ bgcolor: `${stat.color}15`, width: 64, height: 64 }}>
                    <Box sx={{ color: stat.color }}>{stat.icon}</Box>
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Quick User Growth Chart */}
        <Grid item xs={12} lg={8}>
          <Card sx={{ ...cardHoverSx, mb: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>User Growth Overview</Typography>
                <Button size="small" onClick={() => setActiveTab("analytics")}>View Details</Button>
              </Box>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={userGrowthData}>
                  <defs>
                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1976d2" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#1976d2" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="month" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip contentStyle={{ borderRadius: 8, border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }} />
                  <Area type="monotone" dataKey="family" name="Family" stroke="#2e7d32" fillOpacity={0.3} fill="#2e7d32" />
                  <Area type="monotone" dataKey="elders" name="Elders" stroke="#1976d2" fillOpacity={0.3} fill="#1976d2" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Recent Users Table */}
          <Card sx={cardHoverSx}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>Recent Users</Typography>
                <Button startIcon={<PersonAdd />} variant="contained" size="small" onClick={() => setOpenAddDialog(true)}>
                  Add User
                </Button>
              </Box>
              <TableContainer>
                <Table size="medium">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Role</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Join Date</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.slice(0, 5).map((user) => (
                      <TableRow key={user.id} hover sx={{ "&:hover": { backgroundColor: "#f8f9fa" } }}>
                        <TableCell>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <Avatar sx={{ width: 40, height: 40, bgcolor: "#1976d2" }}>{user.name.charAt(0)}</Avatar>
                            <Box>
                              <Typography sx={{ fontWeight: 500 }}>{user.name}</Typography>
                              <Typography variant="body2" color="text.secondary">{user.email}</Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell><Chip label={user.role} size="small" color={getRoleColor(user.role)} /></TableCell>
                        <TableCell><Chip label={user.status} size="small" color={getStatusColor(user.status)} variant="outlined" /></TableCell>
                        <TableCell>{user.joinDate}</TableCell>
                        <TableCell>
                          <IconButton size="small" onClick={() => handleViewUser(user)} sx={{ mr: 0.5 }}><Visibility fontSize="small" /></IconButton>
                          <IconButton size="small" onClick={() => handleEditUser(user)} sx={{ mr: 0.5 }}><Edit fontSize="small" /></IconButton>
                          <IconButton size="small" color="error" onClick={() => handleDeleteUser(user.id)}><Delete fontSize="small" /></IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Button fullWidth sx={{ mt: 2 }} onClick={() => setActiveTab("users")}>View All Users</Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Column - Emergency Alerts & System Health */}
        <Grid item xs={12} lg={4}>
          {/* Emergency Alerts */}
          <Card sx={{ ...cardHoverSx, mb: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
                <Warning color="error" /> Emergency Alerts
              </Typography>
              <List sx={{ p: 0 }}>
                {emergencyAlerts.map((alert, index) => (
                  <Box key={alert.id}>
                    <ListItem sx={{ px: 0, py: 1.5 }} secondaryAction={
                      alert.status === "active" && (
                        <Button size="small" color="success" variant="outlined" onClick={() => handleResolveAlert(alert.id)}>Resolve</Button>
                      )
                    }>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: alert.status === "active" ? "#ffebee" : "#e8f5e9", width: 44, height: 44 }}>
                          {alert.status === "active" ? <Warning color="error" fontSize="small" /> : <CheckCircle color="success" fontSize="small" />}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText 
                        primary={<Typography sx={{ fontWeight: 500 }}>{alert.elder}</Typography>}
                        secondary={`${alert.type} • ${alert.time}`} 
                      />
                    </ListItem>
                    {index < emergencyAlerts.length - 1 && <Divider />}
                  </Box>
                ))}
              </List>
            </CardContent>
          </Card>

          {/* System Health */}
          <Card sx={cardHoverSx}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>System Health</Typography>
              {systemHealth.map((service, index) => (
                <Box key={index} sx={{ mb: 2.5 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>{service.service}</Typography>
                    <Chip label={service.status} size="small" color={getStatusColor(service.status)} />
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={parseFloat(service.uptime)} 
                    sx={{ height: 8, borderRadius: 4 }} 
                    color={getStatusColor(service.status)} 
                  />
                  <Typography variant="caption" color="text.secondary">{service.uptime}% uptime</Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );

  const renderUsers = () => (
    <Card sx={cardHoverSx}>
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>User Management</Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField size="small" placeholder="Search users..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{ startAdornment: <InputAdornment position="start"><Search /></InputAdornment> }} />
            <Button startIcon={<PersonAdd />} variant="contained" onClick={() => setOpenAddDialog(true)}>Add User</Button>
          </Box>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Join Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id} hover>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Avatar sx={{ width: 32, height: 32 }}>{user.name.charAt(0)}</Avatar>
                      {user.name}
                    </Box>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell><Chip label={user.role} size="small" color={getRoleColor(user.role)} /></TableCell>
                  <TableCell><Chip label={user.status} size="small" color={getStatusColor(user.status)} variant="outlined" /></TableCell>
                  <TableCell>{user.joinDate}</TableCell>
                  <TableCell>
                    <IconButton size="small" onClick={() => handleViewUser(user)}><Visibility fontSize="small" /></IconButton>
                    <IconButton size="small" onClick={() => handleEditUser(user)}><Edit fontSize="small" /></IconButton>
                    <IconButton size="small" color="error" onClick={() => handleDeleteUser(user.id)}><Delete fontSize="small" /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );

  const renderElders = () => (
    <Card sx={cardHoverSx}>
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>Elders Management</Typography>
          <Button startIcon={<Add />} variant="contained">Add Elder</Button>
        </Box>
        <Grid container spacing={3}>
          {elders.map((elder) => (
            <Grid item xs={12} md={4} key={elder.id}>
              <Card variant="outlined" sx={{ ...cardHoverSx, p: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                  <Avatar sx={{ bgcolor: "#1976d2", width: 56, height: 56 }}>{elder.name.charAt(0)}</Avatar>
                  <Box>
                    <Typography variant="h6">{elder.name}</Typography>
                    <Typography color="text.secondary">Age: {elder.age}</Typography>
                  </Box>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body2" sx={{ mb: 1 }}><strong>Address:</strong> {elder.address}</Typography>
                <Typography variant="body2" sx={{ mb: 1 }}><strong>Caregiver:</strong> {elder.caregiver}</Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
                  <Typography variant="body2">Health Score:</Typography>
                  <Chip label={elder.healthScore} color={elder.healthScore >= 80 ? "success" : elder.healthScore >= 60 ? "warning" : "error"} size="small" />
                </Box>
                <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                  <Button size="small" variant="outlined" fullWidth>View Details</Button>
                  <Button size="small" variant="contained" fullWidth>Contact</Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );

  const renderVolunteers = () => (
    <Card sx={cardHoverSx}>
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>Volunteers Management</Typography>
          <Button startIcon={<Add />} variant="contained">Add Volunteer</Button>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Hours This Month</TableCell>
                <TableCell>Rating</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {volunteers.map((vol) => (
                <TableRow key={vol.id} hover>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Avatar sx={{ width: 32, height: 32 }}>{vol.name.charAt(0)}</Avatar>
                      {vol.name}
                    </Box>
                  </TableCell>
                  <TableCell>{vol.email}</TableCell>
                  <TableCell>{vol.hours} hrs</TableCell>
                  <TableCell><Chip icon={<Star />} label={vol.rating} size="small" color="warning" /></TableCell>
                  <TableCell><Chip label={vol.status} size="small" color={getStatusColor(vol.status)} /></TableCell>
                  <TableCell>
                    <Button size="small" variant="outlined" sx={{ mr: 1 }}>View</Button>
                    <Button size="small" variant="contained">Assign</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );

  const renderReports = () => (
    <Card sx={cardHoverSx}>
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>Reports</Typography>
          <Button startIcon={<Add />} variant="contained">Generate Report</Button>
        </Box>
        <Grid container spacing={3}>
          {reports.map((report) => (
            <Grid item xs={12} md={6} key={report.id}>
              <Card variant="outlined" sx={{ ...cardHoverSx, p: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar sx={{ bgcolor: "#e3f2fd" }}><Report color="primary" /></Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6">{report.title}</Typography>
                    <Typography color="text.secondary" variant="body2">{report.date}</Typography>
                  </Box>
                  <Box>
                    <Button size="small" variant="outlined" sx={{ mr: 1 }}>View</Button>
                    <Button size="small" variant="contained">Download</Button>
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );

  const renderAnalytics = () => (
    <Box>
      {/* Key Metrics Row */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} lg={3}>
          <Card sx={{ ...cardHoverSx, background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "white" }}>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box>
                  <Typography sx={{ opacity: 0.9, fontSize: "0.85rem" }}>User Growth</Typography>
                  <Typography variant="h3" sx={{ fontWeight: 700, my: 1 }}>+24%</Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <TrendingUp fontSize="small" />
                    <Typography variant="body2">vs last month</Typography>
                  </Box>
                </Box>
                <People sx={{ fontSize: 50, opacity: 0.3 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Card sx={{ ...cardHoverSx, background: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)", color: "white" }}>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box>
                  <Typography sx={{ opacity: 0.9, fontSize: "0.85rem" }}>Health Compliance</Typography>
                  <Typography variant="h3" sx={{ fontWeight: 700, my: 1 }}>92%</Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <TrendingUp fontSize="small" />
                    <Typography variant="body2">+4% this week</Typography>
                  </Box>
                </Box>
                <Favorite sx={{ fontSize: 50, opacity: 0.3 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Card sx={{ ...cardHoverSx, background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)", color: "white" }}>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box>
                  <Typography sx={{ opacity: 0.9, fontSize: "0.85rem" }}>Avg Response Time</Typography>
                  <Typography variant="h3" sx={{ fontWeight: 700, my: 1 }}>2.4m</Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <TrendingDown fontSize="small" />
                    <Typography variant="body2">-15% improvement</Typography>
                  </Box>
                </Box>
                <AccessTime sx={{ fontSize: 50, opacity: 0.3 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Card sx={{ ...cardHoverSx, background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)", color: "white" }}>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box>
                  <Typography sx={{ opacity: 0.9, fontSize: "0.85rem" }}>Active Users</Typography>
                  <Typography variant="h3" sx={{ fontWeight: 700, my: 1 }}>668</Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <TrendingUp fontSize="small" />
                    <Typography variant="body2">Online now</Typography>
                  </Box>
                </Box>
                <BarChart sx={{ fontSize: 50, opacity: 0.3 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts Row 1 */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {/* User Growth Chart */}
        <Grid item xs={12} lg={8}>
          <Card sx={cardHoverSx}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>User Growth Trends</Typography>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={userGrowthData}>
                  <defs>
                    <linearGradient id="colorElders" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1976d2" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#1976d2" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorFamily" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2e7d32" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#2e7d32" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorVolunteers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ed6c02" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#ed6c02" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="month" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip contentStyle={{ borderRadius: 8, border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }} />
                  <Legend />
                  <Area type="monotone" dataKey="family" name="Family Members" stroke="#2e7d32" fillOpacity={1} fill="url(#colorFamily)" />
                  <Area type="monotone" dataKey="elders" name="Elders" stroke="#1976d2" fillOpacity={1} fill="url(#colorElders)" />
                  <Area type="monotone" dataKey="volunteers" name="Volunteers" stroke="#ed6c02" fillOpacity={1} fill="url(#colorVolunteers)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* User Distribution Pie Chart */}
        <Grid item xs={12} lg={4}>
          <Card sx={cardHoverSx}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>User Distribution</Typography>
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={userDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {userDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <Box sx={{ display: "flex", justifyContent: "center", gap: 3, mt: 2 }}>
                {userDistributionData.map((item) => (
                  <Box key={item.name} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box sx={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: item.color }} />
                    <Typography variant="body2">{item.name}</Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts Row 2 */}
      <Grid container spacing={3}>
        {/* Weekly Activity */}
        <Grid item xs={12} lg={6}>
          <Card sx={cardHoverSx}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>Weekly Activity</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsBarChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="day" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip contentStyle={{ borderRadius: 8, border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }} />
                  <Legend />
                  <Bar dataKey="logins" name="Logins" fill="#1976d2" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="actions" name="Actions" fill="#9c27b0" radius={[4, 4, 0, 0]} />
                </RechartsBarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Health Compliance Trend */}
        <Grid item xs={12} lg={6}>
          <Card sx={cardHoverSx}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>Health Compliance Trend</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={healthComplianceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="week" stroke="#666" />
                  <YAxis domain={[70, 100]} stroke="#666" />
                  <Tooltip contentStyle={{ borderRadius: 8, border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }} />
                  <Line 
                    type="monotone" 
                    dataKey="compliance" 
                    name="Compliance %" 
                    stroke="#4caf50" 
                    strokeWidth={3}
                    dot={{ fill: "#4caf50", strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );

  const renderSettings = () => (
    <Card sx={cardHoverSx}>
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>System Settings</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>Notification Settings</Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography>Push Notifications</Typography>
                  <Switch checked={settings.notifications} onChange={(e) => setSettings({ ...settings, notifications: e.target.checked })} />
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography>Email Alerts</Typography>
                  <Switch checked={settings.emailAlerts} onChange={(e) => setSettings({ ...settings, emailAlerts: e.target.checked })} />
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography>SMS Alerts</Typography>
                  <Switch checked={settings.smsAlerts} onChange={(e) => setSettings({ ...settings, smsAlerts: e.target.checked })} />
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>System Settings</Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography>Auto Backup</Typography>
                  <Switch checked={settings.autoBackup} onChange={(e) => setSettings({ ...settings, autoBackup: e.target.checked })} />
                </Box>
                <Button variant="outlined" startIcon={<Refresh />} fullWidth>Refresh System Cache</Button>
                <Button variant="contained" startIcon={<Save />} fullWidth onClick={() => setSnackbar({ open: true, message: "Settings saved!", severity: "success" })}>
                  Save All Settings
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#f0f2f5" }}>
      {/* Sidebar - PC optimized */}
      <Box sx={{ 
        width: 280, 
        backgroundColor: "#1a237e", 
        color: "white", 
        p: 3, 
        display: "flex", 
        flexDirection: "column",
        position: "fixed",
        height: "100vh",
        overflowY: "auto",
        boxShadow: "4px 0 12px rgba(0,0,0,0.1)",
      }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4, pb: 3, borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          <LocalHospital sx={{ fontSize: 36 }} />
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>ElderCare</Typography>
            <Typography sx={{ fontSize: "0.75rem", opacity: 0.7 }}>Admin Dashboard</Typography>
          </Box>
        </Box>

        <Typography sx={{ fontSize: "0.7rem", opacity: 0.5, mb: 1, letterSpacing: 1, fontWeight: 600 }}>MAIN MENU</Typography>
        <List sx={{ p: 0 }}>
          {sidebarItems.map((item) => (
            <ListItem
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                py: 1.5,
                backgroundColor: activeTab === item.key ? "rgba(255,255,255,0.2)" : "transparent",
                cursor: "pointer",
                transition: "all 0.2s ease",
                "&:hover": { backgroundColor: activeTab === item.key ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.08)" },
              }}
            >
              <ListItemAvatar sx={{ minWidth: 40 }}>
                <Box sx={{ color: activeTab === item.key ? "white" : "rgba(255,255,255,0.7)" }}>{item.icon}</Box>
              </ListItemAvatar>
              <ListItemText 
                primary={item.label} 
                sx={{ "& .MuiTypography-root": { fontWeight: activeTab === item.key ? 600 : 400 } }}
              />
              {activeTab === item.key && (
                <Box sx={{ width: 4, height: 24, backgroundColor: "#00bcd4", borderRadius: 2, ml: 1 }} />
              )}
            </ListItem>
          ))}
        </List>

        <Box sx={{ mt: "auto", pt: 3, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, p: 2, backgroundColor: "rgba(255,255,255,0.05)", borderRadius: 2, mb: 2 }}>
            <Avatar sx={{ bgcolor: "#00bcd4", width: 40, height: 40 }}>A</Avatar>
            <Box>
              <Typography sx={{ fontWeight: 600, fontSize: "0.9rem" }}>Administrator</Typography>
              <Typography sx={{ fontSize: "0.75rem", opacity: 0.7 }}>admin@eldercare.com</Typography>
            </Box>
          </Box>
          <Button 
            fullWidth 
            startIcon={<Logout />} 
            onClick={handleLogout} 
            sx={{ 
              color: "white", 
              justifyContent: "flex-start", 
              py: 1.5,
              borderRadius: 2,
              "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" }
            }}
          >
            Logout
          </Button>
        </Box>
      </Box>

      {/* Main Content - with left margin for fixed sidebar */}
      <Box sx={{ flex: 1, ml: "280px", minHeight: "100vh" }}>
        {/* Header - PC optimized */}
        <Box sx={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          p: 3, 
          backgroundColor: "white",
          borderBottom: "1px solid #e0e0e0",
          position: "sticky",
          top: 0,
          zIndex: 100,
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, color: "#1a237e" }}>
              {sidebarItems.find((i) => i.key === activeTab)?.label || "Dashboard"}
            </Typography>
            <Typography variant="body2" color="text.secondary">Welcome back, Administrator • {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <TextField 
              size="small" 
              placeholder="Search..." 
              sx={{ 
                width: 300,
                "& .MuiOutlinedInput-root": { 
                  borderRadius: 3,
                  backgroundColor: "#f5f5f5",
                  "&:hover": { backgroundColor: "#eeeeee" },
                }
              }}
              InputProps={{ startAdornment: <InputAdornment position="start"><Search sx={{ color: "#9e9e9e" }} /></InputAdornment> }}
            />
            <IconButton onClick={handleNotificationClick} sx={{ backgroundColor: "#f5f5f5", "&:hover": { backgroundColor: "#e0e0e0" } }}>
              <Badge badgeContent={unreadCount} color="error">
                <Notifications sx={{ color: "#666" }} />
              </Badge>
            </IconButton>
            <Avatar sx={{ bgcolor: "#1a237e", cursor: "pointer", width: 44, height: 44 }} onClick={() => setActiveTab("settings")}>A</Avatar>
          </Box>
        </Box>

        {/* Notification Menu */}
        <Menu
          anchorEl={notificationAnchor}
          open={Boolean(notificationAnchor)}
          onClose={handleNotificationClose}
          PaperProps={{
            sx: {
              width: 380,
              maxHeight: 480,
              borderRadius: 3,
              boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
            }
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #e0e0e0" }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>Notifications</Typography>
            {unreadCount > 0 && (
              <Button size="small" onClick={markAllRead}>Mark all read</Button>
            )}
          </Box>
          
          {adminNotifications.length === 0 ? (
            <Box sx={{ p: 4, textAlign: "center" }}>
              <Notifications sx={{ fontSize: 48, color: "#ccc", mb: 1 }} />
              <Typography color="text.secondary">No notifications</Typography>
            </Box>
          ) : (
            <List sx={{ p: 0 }}>
              {adminNotifications.map((notif, index) => (
                <Box key={notif.id}>
                  <ListItem 
                    sx={{ 
                      py: 2, 
                      px: 2,
                      backgroundColor: notif.read ? "transparent" : "#e3f2fd",
                      cursor: "pointer",
                      "&:hover": { backgroundColor: notif.read ? "#f5f5f5" : "#bbdefb" }
                    }}
                    onClick={() => markNotificationRead(notif.id)}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: notif.read ? "#f5f5f5" : "#1976d2", width: 44, height: 44 }}>
                        <Notifications sx={{ color: notif.read ? "#999" : "white", fontSize: 20 }} />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={<Typography sx={{ fontWeight: notif.read ? 400 : 600 }}>{notif.title}</Typography>}
                      secondary={
                        <Box>
                          <Typography sx={{ fontSize: "0.85rem", color: "#666" }}>{notif.message}</Typography>
                          <Typography sx={{ fontSize: "0.75rem", color: "#999", mt: 0.5 }}>{notif.time}</Typography>
                        </Box>
                      }
                    />
                    {!notif.read && <Box sx={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#1976d2" }} />}
                  </ListItem>
                  {index < adminNotifications.length - 1 && <Divider />}
                </Box>
              ))}
            </List>
          )}
          
          <Box sx={{ p: 1.5, borderTop: "1px solid #e0e0e0" }}>
            <Button fullWidth variant="text" sx={{ textTransform: "none" }}>View All Notifications</Button>
          </Box>
        </Menu>

        {/* Content Area */}
        <Box sx={{ p: 3 }}>
          {renderContent()}
        </Box>
      </Box>

      {/* Add User Dialog */}
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            Add New User
            <IconButton onClick={() => setOpenAddDialog(false)}><Close /></IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField fullWidth label="Full Name" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} required />
            <TextField fullWidth label="Email" type="email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} required />
            <TextField fullWidth label="Phone" value={newUser.phone} onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })} />
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select value={newUser.role} label="Role" onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}>
                <MenuItem value="elder">Elder</MenuItem>
                <MenuItem value="familyMember">Family Member</MenuItem>
                <MenuItem value="caregiver">Caregiver/Volunteer</MenuItem>
                <MenuItem value="admin">Administrator</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select value={newUser.status} label="Status" onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
          <Button variant="contained" startIcon={<Add />} onClick={handleAddUser}>Add User</Button>
        </DialogActions>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          {editingUser && (
            <Box sx={{ pt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField fullWidth label="Full Name" value={editingUser.name} onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })} />
              <TextField fullWidth label="Email" value={editingUser.email} onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })} />
              <TextField fullWidth label="Phone" value={editingUser.phone || ""} onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })} />
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select value={editingUser.status} label="Status" onChange={(e) => setEditingUser({ ...editingUser, status: e.target.value })}>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
          <Button variant="contained" startIcon={<Save />} onClick={handleSaveEdit}>Save Changes</Button>
        </DialogActions>
      </Dialog>

      {/* View User Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>User Details</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <Box sx={{ pt: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                <Avatar sx={{ width: 64, height: 64, bgcolor: "#1976d2" }}>{selectedUser.name.charAt(0)}</Avatar>
                <Box>
                  <Typography variant="h6">{selectedUser.name}</Typography>
                  <Typography color="text.secondary">{selectedUser.email}</Typography>
                </Box>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Role</Typography>
                  <Chip label={selectedUser.role} color={getRoleColor(selectedUser.role)} sx={{ mt: 0.5 }} />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Status</Typography>
                  <Chip label={selectedUser.status} color={getStatusColor(selectedUser.status)} variant="outlined" sx={{ mt: 0.5 }} />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Phone</Typography>
                  <Typography>{selectedUser.phone || "N/A"}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Join Date</Typography>
                  <Typography>{selectedUser.joinDate}</Typography>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
          <Button variant="contained" onClick={() => { setOpenDialog(false); handleEditUser(selectedUser); }}>Edit User</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
}
