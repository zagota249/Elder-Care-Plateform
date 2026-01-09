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
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {statsData.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={cardHoverSx}>
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <Box>
                    <Typography color="text.secondary" variant="body2">{stat.label}</Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700, my: 1 }}>{stat.value}</Typography>
                    <Chip label={stat.change} size="small" color={stat.change.startsWith("+") ? "success" : "error"} sx={{ height: 20 }} />
                  </Box>
                  <Avatar sx={{ bgcolor: stat.color, width: 56, height: 56 }}>{stat.icon}</Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Recent Users */}
        <Grid item xs={12} lg={8}>
          <Card sx={cardHoverSx}>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>Recent Users</Typography>
                <Button startIcon={<PersonAdd />} variant="contained" size="small" onClick={() => setOpenAddDialog(true)}>
                  Add User
                </Button>
              </Box>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Role</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.slice(0, 5).map((user) => (
                      <TableRow key={user.id} hover>
                        <TableCell>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Avatar sx={{ width: 32, height: 32 }}>{user.name.charAt(0)}</Avatar>
                            {user.name}
                          </Box>
                        </TableCell>
                        <TableCell><Chip label={user.role} size="small" color={getRoleColor(user.role)} /></TableCell>
                        <TableCell><Chip label={user.status} size="small" color={getStatusColor(user.status)} variant="outlined" /></TableCell>
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
              <Button fullWidth sx={{ mt: 2 }} onClick={() => setActiveTab("users")}>View All Users</Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Emergency Alerts & System Health */}
        <Grid item xs={12} lg={4}>
          <Card sx={{ ...cardHoverSx, mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
                <Warning color="error" /> Emergency Alerts
              </Typography>
              <List dense>
                {emergencyAlerts.map((alert) => (
                  <ListItem key={alert.id} sx={{ px: 0 }} secondaryAction={
                    alert.status === "active" && (
                      <Button size="small" color="success" onClick={() => handleResolveAlert(alert.id)}>Resolve</Button>
                    )
                  }>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: alert.status === "active" ? "#ffebee" : "#e8f5e9", width: 40, height: 40 }}>
                        {alert.status === "active" ? <Warning color="error" fontSize="small" /> : <CheckCircle color="success" fontSize="small" />}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={alert.elder} secondary={`${alert.type} • ${alert.time}`} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>

          <Card sx={cardHoverSx}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>System Health</Typography>
              {systemHealth.map((service, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                    <Typography variant="body2">{service.service}</Typography>
                    <Chip label={service.status} size="small" color={getStatusColor(service.status)} />
                  </Box>
                  <LinearProgress variant="determinate" value={parseFloat(service.uptime)} sx={{ height: 6, borderRadius: 3 }} color={getStatusColor(service.status)} />
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
    <Card sx={cardHoverSx}>
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>Analytics Dashboard</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, textAlign: "center", ...cardHoverSx }}>
              <BarChart sx={{ fontSize: 60, color: "#1976d2" }} />
              <Typography variant="h6" sx={{ mt: 2 }}>User Growth</Typography>
              <Typography variant="h3" sx={{ fontWeight: 700, color: "#1976d2" }}>+24%</Typography>
              <Typography color="text.secondary">This month</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, textAlign: "center", ...cardHoverSx }}>
              <Favorite sx={{ fontSize: 60, color: "#e91e63" }} />
              <Typography variant="h6" sx={{ mt: 2 }}>Health Compliance</Typography>
              <Typography variant="h3" sx={{ fontWeight: 700, color: "#4caf50" }}>92%</Typography>
              <Typography color="text.secondary">Average across elders</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, textAlign: "center", ...cardHoverSx }}>
              <AccessTime sx={{ fontSize: 60, color: "#ff9800" }} />
              <Typography variant="h6" sx={{ mt: 2 }}>Avg Response Time</Typography>
              <Typography variant="h3" sx={{ fontWeight: 700, color: "#ff9800" }}>2.4m</Typography>
              <Typography color="text.secondary">Emergency alerts</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, textAlign: "center", ...cardHoverSx }}>
              <People sx={{ fontSize: 60, color: "#9c27b0" }} />
              <Typography variant="h6" sx={{ mt: 2 }}>Active Users</Typography>
              <Typography variant="h3" sx={{ fontWeight: 700, color: "#9c27b0" }}>668</Typography>
              <Typography color="text.secondary">Currently online</Typography>
            </Paper>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
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
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#f5f7fa" }}>
      {/* Sidebar */}
      <Box sx={{ width: 260, backgroundColor: "#1a237e", color: "white", p: 2, display: "flex", flexDirection: "column" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
          <LocalHospital sx={{ fontSize: 32 }} />
          <Typography variant="h6" sx={{ fontWeight: 700 }}>ElderCare Admin</Typography>
        </Box>

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
              <ListItemAvatar sx={{ minWidth: 40 }}>{item.icon}</ListItemAvatar>
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
            <Typography variant="h4" sx={{ fontWeight: 700, color: "#1a237e" }}>
              {sidebarItems.find((i) => i.key === activeTab)?.label || "Dashboard"}
            </Typography>
            <Typography variant="body2" color="text.secondary">Welcome back, Administrator</Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <IconButton onClick={() => setSnackbar({ open: true, message: "Notifications refreshed!", severity: "info" })}>
              <Badge badgeContent={emergencyAlerts.filter((a) => a.status === "active").length} color="error">
                <Notifications />
              </Badge>
            </IconButton>
            <Avatar sx={{ bgcolor: "#1a237e", cursor: "pointer" }} onClick={() => setActiveTab("settings")}>A</Avatar>
          </Box>
        </Box>

        {renderContent()}
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
