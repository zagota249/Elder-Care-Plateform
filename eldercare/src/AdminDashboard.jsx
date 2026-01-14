import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Badge,
  Menu,
  MenuItem,
  Divider,
  Snackbar,
  Paper,
  Switch,
  Menu,
} from "@mui/material";
import {
  Search,
  Notifications,
  Dashboard,
  People,
  VolunteerActivism,
  Warning,
  Assessment,
  TrendingUp,
  CheckCircle,
  Visibility,
  Edit,
  Delete,
  Add,
  Refresh,
  FilterList,
  LocationOn,
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
  const [activeNav, setActiveNav] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications] = useState([
    { id: 1, message: "New volunteer registration pending", time: "5 min ago", read: false },
    { id: 2, message: "SOS Alert resolved - Margaret Thompson", time: "1 hour ago", read: false },
    { id: 3, message: "System backup completed", time: "2 hours ago", read: true },
  ]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchor, setNotificationAnchor] = useState(null);

  // Stats Data
  const [stats, setStats] = useState({
    totalElders: 2,
    activeVolunteers: 1,
    activeSosAlerts: 0,
    avgResponseTime: 4.2,
  });

  // Users Data
  const [users, setUsers] = useState([
    { id: 1, name: "Margaret Thompson", email: "margaret@example.com", role: "elder", status: "active", phone: "+1 234-567-8901", joinDate: "10/15/2025" },
    { id: 2, name: "James Wilson", email: "james@example.com", role: "elder", status: "active", phone: "+1 234-567-8902", joinDate: "10/20/2025" },
    { id: 3, name: "Sarah Johnson", email: "sarah@example.com", role: "family", status: "active", phone: "+1 234-567-8903", joinDate: "10/25/2025" },
  ]);

  // Volunteers Data
  const [volunteers, setVolunteers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", appliedDate: "11/3/2025", status: "pending", phone: "+1 234-567-8904", skills: "First Aid, Driving" },
    { id: 2, name: "Emily Chen", email: "emily@example.com", appliedDate: "11/4/2025", status: "pending", phone: "+1 234-567-8905", skills: "Medical, Cooking" },
    { id: 3, name: "Michael Brown", email: "michael@example.com", appliedDate: "11/5/2025", status: "pending", phone: "+1 234-567-8906", skills: "Transportation" },
    { id: 4, name: "Lisa Martinez", email: "lisa@example.com", appliedDate: "10/15/2025", status: "approved", phone: "+1 234-567-8907", skills: "Companionship" },
  ]);

  // SOS Alerts Data
  const [sosAlerts, setSosAlerts] = useState([
    { id: 1, elder: "Margaret Thompson", address: "123 Oak Street, Glenfield", time: "11/6/2025, 9:30:04 AM", status: "resolved", responder: "John Doe" },
    { id: 2, elder: "Robert Jenkins", address: "456 Maple Avenue, Springfield", time: "11/4/2025, 2:15:00 PM", status: "responded", responder: "Emily Chen" },
  ]);

  // Chart Data
  const sosChartData = [
    { name: "Mon", Alerts: 3, Resolved: 3 },
    { name: "Tue", Alerts: 5, Resolved: 4 },
    { name: "Wed", Alerts: 2, Resolved: 2 },
    { name: "Thu", Alerts: 6, Resolved: 5 },
    { name: "Fri", Alerts: 4, Resolved: 4 },
    { name: "Sat", Alerts: 3, Resolved: 3 },
    { name: "Sun", Alerts: 1, Resolved: 1 },
  ];

  const userDistributionData = [
    { name: "Elders", value: 50, color: "#4CAF50" },
    { name: "Family", value: 25, color: "#9C27B0" },
    { name: "Volunteers", value: 25, color: "#2196F3" },
  ];

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

  const handleNavClick = (nav) => {
    setActiveNav(nav);
  };

  const handleApproveVolunteer = (id) => {
    setVolunteers(volunteers.map(v => 
      v.id === id ? { ...v, status: "approved" } : v
    ));
    setStats(prev => ({ ...prev, activeVolunteers: prev.activeVolunteers + 1 }));
    setSnackbar({ open: true, message: "Volunteer approved successfully!", severity: "success" });
  };

  const handleRejectVolunteer = (id) => {
    setVolunteers(volunteers.map(v => 
      v.id === id ? { ...v, status: "rejected" } : v
    ));
    setSnackbar({ open: true, message: "Volunteer rejected.", severity: "info" });
  };

  const handleResolveAlert = (id) => {
    setSosAlerts(sosAlerts.map(a => 
      a.id === id ? { ...a, status: "resolved" } : a
    ));
    setStats(prev => ({ ...prev, activeSosAlerts: Math.max(0, prev.activeSosAlerts - 1) }));
    setSnackbar({ open: true, message: "Alert resolved successfully!", severity: "success" });
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter(u => u.id !== id));
    setSnackbar({ open: true, message: "User deleted successfully!", severity: "info" });
  };

  const handleGenerateReport = (reportType) => {
    setSnackbar({ open: true, message: `Generating ${reportType} report...`, severity: "info" });
    setTimeout(() => {
      setSnackbar({ open: true, message: `${reportType} report downloaded successfully!`, severity: "success" });
    }, 1500);
  };

  const handleAddUser = () => {
    if (newUser.name.trim() && newUser.email.trim()) {
      setUsers(prev => [...prev, { id: Date.now(), ...newUser, status: "active", joinDate: new Date().toLocaleDateString() }]);
      setSnackbar({ open: true, message: "User added successfully!", severity: "success" });
      setAddUserDialog(false);
      setNewUser({ name: "", email: "", phone: "", role: "elder" });
    }
  };

  const handleEditUser = (user) => {
    setEditUserDialog({ open: true, user: { ...user } });
  };

  const handleSaveEditUser = () => {
    setUsers(prev => prev.map(u => u.id === editUserDialog.user.id ? editUserDialog.user : u));
    setSnackbar({ open: true, message: "User updated successfully!", severity: "success" });
    setEditUserDialog({ open: false, user: null });
  };

  const handleRefresh = () => {
    setSnackbar({ open: true, message: "Data refreshed!", severity: "success" });
  };

  const handleViewUser = (user) => {
    setSelectedItem(user);
    setOpenUserDialog(true);
  };

  const handleViewVolunteer = (volunteer) => {
    setSelectedItem(volunteer);
    setOpenVolunteerDialog(true);
  };

  const handleViewAlert = (alert) => {
    setSelectedItem(alert);
    setOpenAlertDialog(true);
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

          {/* VOLUNTEERS SECTION */}
          {activeNav === "volunteers" && (
            <>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: "#1e3a5f" }}>Volunteers Management</Typography>
                  <Typography sx={{ color: "#666" }}>Manage volunteer applications and status</Typography>
                </Box>
                <Button variant="contained" startIcon={<Refresh />} sx={{ borderRadius: 2, textTransform: "none" }}>Refresh</Button>
              </Box>

              {/* Stats */}
              <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 3, mb: 3 }}>
                <Card sx={{ borderRadius: 3, backgroundColor: "#fff3e0" }}>
                  <CardContent sx={{ textAlign: "center", py: 2 }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: "#ff9800" }}>{volunteers.filter(v => v.status === "pending").length}</Typography>
                    <Typography sx={{ color: "#666" }}>Pending</Typography>
                  </CardContent>
                </Card>
                <Card sx={{ borderRadius: 3, backgroundColor: "#e8f5e9" }}>
                  <CardContent sx={{ textAlign: "center", py: 2 }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: "#4caf50" }}>{volunteers.filter(v => v.status === "approved").length}</Typography>
                    <Typography sx={{ color: "#666" }}>Approved</Typography>
                  </CardContent>
                </Card>
                <Card sx={{ borderRadius: 3, backgroundColor: "#ffebee" }}>
                  <CardContent sx={{ textAlign: "center", py: 2 }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: "#f44336" }}>{volunteers.filter(v => v.status === "rejected").length}</Typography>
                    <Typography sx={{ color: "#666" }}>Rejected</Typography>
                  </CardContent>
                </Card>
              </Box>

              <Card sx={{ borderRadius: 3, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ backgroundColor: "#f5f7fa" }}>
                        <TableCell sx={{ fontWeight: 600 }}>Volunteer</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Phone</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Skills</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Applied Date</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {volunteers.map((volunteer) => (
                        <TableRow key={volunteer.id} sx={{ "&:hover": { backgroundColor: "#f5f7fa" } }}>
                          <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                              <Avatar sx={{ bgcolor: "#e3f2fd", color: "#1976d2", width: 36, height: 36 }}>
                                {volunteer.name.split(" ").map(n => n[0]).join("")}
                              </Avatar>
                              <Typography sx={{ fontWeight: 500 }}>{volunteer.name}</Typography>
                            </Box>
                          </TableCell>
                          <TableCell sx={{ color: "#666" }}>{volunteer.email}</TableCell>
                          <TableCell sx={{ color: "#666" }}>{volunteer.phone}</TableCell>
                          <TableCell sx={{ color: "#666" }}>{volunteer.skills}</TableCell>
                          <TableCell sx={{ color: "#666" }}>{volunteer.appliedDate}</TableCell>
                          <TableCell>{getStatusChip(volunteer.status)}</TableCell>
                          <TableCell>
                            {volunteer.status === "pending" ? (
                              <Box sx={{ display: "flex", gap: 1 }}>
                                <Button 
                                  size="small" 
                                  variant="contained" 
                                  color="success"
                                  onClick={() => handleApproveVolunteer(volunteer.id)}
                                  sx={{ textTransform: "none", borderRadius: 2, minWidth: "auto", px: 1.5 }}
                                >
                                  <Check fontSize="small" />
                                </Button>
                                <Button 
                                  size="small" 
                                  variant="contained" 
                                  color="error"
                                  onClick={() => handleRejectVolunteer(volunteer.id)}
                                  sx={{ textTransform: "none", borderRadius: 2, minWidth: "auto", px: 1.5 }}
                                >
                                  <Close fontSize="small" />
                                </Button>
                              </Box>
                            ) : (
                              <IconButton size="small" onClick={() => handleViewVolunteer(volunteer)}><Visibility fontSize="small" /></IconButton>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Card>
            </>
          )}

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
          <Button onClick={() => setOpenUserDialog(false)}>Close</Button>
          <Button variant="contained">Edit User</Button>
        </DialogActions>
      </Dialog>

      {/* Volunteer View Dialog */}
      <Dialog open={openVolunteerDialog} onClose={() => setOpenVolunteerDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ borderBottom: "1px solid #e0e0e0" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h6">Volunteer Details</Typography>
            <IconButton onClick={() => setOpenVolunteerDialog(false)}><Close /></IconButton>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          {selectedItem && (
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                <Avatar sx={{ width: 64, height: 64, bgcolor: "#2196f3", fontSize: "1.5rem" }}>
                  {selectedItem.name.split(" ").map(n => n[0]).join("")}
                </Avatar>
                <Box>
                  <Typography variant="h6">{selectedItem.name}</Typography>
                  {getStatusChip(selectedItem.status)}
                </Box>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Email sx={{ color: "#666" }} />
                  <Typography>{selectedItem.email}</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Phone sx={{ color: "#666" }} />
                  <Typography>{selectedItem.phone}</Typography>
                </Box>
                <Box>
                  <Typography sx={{ color: "#666", mb: 0.5 }}>Skills:</Typography>
                  <Typography>{selectedItem.skills}</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <AccessTime sx={{ color: "#666" }} />
                  <Typography>Applied: {selectedItem.appliedDate}</Typography>
                </Box>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenVolunteerDialog(false)}>Close</Button>
          {selectedItem?.status === "pending" && (
            <>
              <Button variant="outlined" color="error" onClick={() => { handleRejectVolunteer(selectedItem.id); setOpenVolunteerDialog(false); }}>Reject</Button>
              <Button variant="contained" color="success" onClick={() => { handleApproveVolunteer(selectedItem.id); setOpenVolunteerDialog(false); }}>Approve</Button>
            </>
          )}
        </DialogActions>
      </Dialog>

      {/* Alert View Dialog */}
      <Dialog open={openAlertDialog} onClose={() => setOpenAlertDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ borderBottom: "1px solid #e0e0e0", backgroundColor: "#ffebee" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Warning sx={{ color: "#f44336" }} />
              <Typography variant="h6">SOS Alert Details</Typography>
            </Box>
            <IconButton onClick={() => setOpenAlertDialog(false)}><Close /></IconButton>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          {selectedItem && (
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                <Avatar sx={{ width: 64, height: 64, bgcolor: "#f44336", fontSize: "1.5rem" }}>
                  {selectedItem.elder.split(" ").map(n => n[0]).join("")}
                </Avatar>
                <Box>
                  <Typography variant="h6">{selectedItem.elder}</Typography>
                  {getStatusChip(selectedItem.status)}
                </Box>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <LocationOn sx={{ color: "#666" }} />
                  <Typography>{selectedItem.address}</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <AccessTime sx={{ color: "#666" }} />
                  <Typography>{selectedItem.time}</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Person sx={{ color: "#666" }} />
                  <Typography>Responder: {selectedItem.responder || "Not assigned"}</Typography>
                </Box>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAlertDialog(false)}>Close</Button>
          {selectedItem?.status !== "resolved" && (
            <Button variant="contained" color="success" onClick={() => { handleResolveAlert(selectedItem.id); setOpenAlertDialog(false); }}>Mark Resolved</Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Add User Dialog */}
      <Dialog open={addUserDialog} onClose={() => setAddUserDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            sx={{ mt: 2, mb: 2 }}
          />
          <TextField
            fullWidth
            label="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Phone"
            value={newUser.phone}
            onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddUserDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddUser}>Add User</Button>
        </DialogActions>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={editUserDialog.open} onClose={() => setEditUserDialog({ open: false, user: null })} maxWidth="sm" fullWidth>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          {editUserDialog.user && (
            <>
              <TextField
                fullWidth
                label="Name"
                value={editUserDialog.user.name}
                onChange={(e) => setEditUserDialog({ ...editUserDialog, user: { ...editUserDialog.user, name: e.target.value } })}
                sx={{ mt: 2, mb: 2 }}
              />
              <TextField
                fullWidth
                label="Email"
                value={editUserDialog.user.email}
                onChange={(e) => setEditUserDialog({ ...editUserDialog, user: { ...editUserDialog.user, email: e.target.value } })}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Phone"
                value={editUserDialog.user.phone}
                onChange={(e) => setEditUserDialog({ ...editUserDialog, user: { ...editUserDialog.user, phone: e.target.value } })}
                sx={{ mb: 2 }}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditUserDialog({ open: false, user: null })}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveEditUser}>Save Changes</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
