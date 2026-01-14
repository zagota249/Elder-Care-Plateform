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
