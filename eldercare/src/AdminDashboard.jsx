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
  Badge,
  Menu,
  MenuItem,
  Divider,
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
  Person,
  Settings,
  Logout,
  Close,
  Check,
} from "@mui/icons-material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

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

  // eslint-disable-next-line no-unused-vars
  const [settingsDialog, setSettingsDialog] = useState(false);

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  const handleApproveVolunteer = (id) => {
    setVolunteers(volunteers.map(v => 
      v.id === id ? { ...v, status: "approved" } : v
    ));
    setStats(prev => ({ ...prev, activeVolunteers: prev.activeVolunteers + 1 }));
  };

  const handleRejectVolunteer = (id) => {
    setVolunteers(volunteers.map(v => 
      v.id === id ? { ...v, status: "rejected" } : v
    ));
  };

  const handleResolveAlert = (id) => {
    setSosAlerts(sosAlerts.map(a => 
      a.id === id ? { ...a, status: "resolved" } : a
    ));
    setStats(prev => ({ ...prev, activeSosAlerts: Math.max(0, prev.activeSosAlerts - 1) }));
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter(u => u.id !== id));
  };

  const handleGenerateReport = (reportType) => {
    alert(`Generating ${reportType} report...`);
  };

  const handleRefresh = () => {
    alert("Data refreshed!");
  };

  const handleViewUser = (user) => {
    alert(`User: ${user.name}\nEmail: ${user.email}\nRole: ${user.role}\nStatus: ${user.status}`);
  };

  const handleViewVolunteer = (volunteer) => {
    alert(`Volunteer: ${volunteer.name}\nEmail: ${volunteer.email}\nSkills: ${volunteer.skills}\nStatus: ${volunteer.status}`);
  };

  const handleViewAlert = (alertItem) => {
    alert(`SOS Alert\nElder: ${alertItem.elder}\nAddress: ${alertItem.address}\nStatus: ${alertItem.status}\nTime: ${alertItem.time}`);
  };

  const getStatusChip = (status) => {
    const statusConfig = {
      active: { color: "#4caf50", bg: "#e8f5e9", label: "Active" },
      pending: { color: "#ff9800", bg: "#fff3e0", label: "Pending" },
      approved: { color: "#4caf50", bg: "#e8f5e9", label: "Approved" },
      rejected: { color: "#f44336", bg: "#ffebee", label: "Rejected" },
      resolved: { color: "#4caf50", bg: "#e8f5e9", label: "Resolved" },
      responded: { color: "#2196f3", bg: "#e3f2fd", label: "Responded" },
      inactive: { color: "#9e9e9e", bg: "#f5f5f5", label: "Inactive" },
    };
    const config = statusConfig[status] || statusConfig.inactive;
    return (
      <Chip 
        label={config.label} 
        size="small" 
        sx={{ 
          backgroundColor: config.bg, 
          color: config.color,
          fontWeight: 600,
          fontSize: "0.75rem"
        }} 
      />
    );
  };

  return (
    <Box sx={{ width: "100%", p: 0, overflow: "auto" }}>
      {/* Header */}
      <Box
        sx={{
          backgroundColor: "white",
          px: 3,
          py: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #e0e0e0",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
          <TextField
            placeholder="Search..."
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ width: 300 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: "#9e9e9e" }} />
                </InputAdornment>
              ),
            }}
          />
          
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography sx={{ color: "#666" }}>{currentDate}</Typography>
            <IconButton onClick={(e) => setNotificationAnchor(e.currentTarget)}>
              <Badge badgeContent={notifications.filter(n => !n.read).length} color="error">
                <Notifications />
              </Badge>
            </IconButton>
            <Avatar 
              sx={{ bgcolor: "#7c4dff", cursor: "pointer" }}
              onClick={(e) => setAnchorEl(e.currentTarget)}
            >
              AU
            </Avatar>
          </Box>
        </Box>

        {/* Notification Menu */}
        <Menu
          anchorEl={notificationAnchor}
          open={Boolean(notificationAnchor)}
          onClose={() => setNotificationAnchor(null)}
          PaperProps={{ sx: { width: 320, maxHeight: 400 } }}
        >
          <Box sx={{ p: 2, borderBottom: "1px solid #e0e0e0" }}>
            <Typography sx={{ fontWeight: 600 }}>Notifications</Typography>
          </Box>
          {notifications.map((notif) => (
            <MenuItem key={notif.id} sx={{ py: 1.5, backgroundColor: notif.read ? "transparent" : "#e3f2fd" }}>
              <Box>
                <Typography sx={{ fontSize: "0.85rem" }}>{notif.message}</Typography>
                <Typography sx={{ fontSize: "0.75rem", color: "#999" }}>{notif.time}</Typography>
              </Box>
            </MenuItem>
          ))}
        </Menu>

        {/* Profile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem onClick={() => { setAnchorEl(null); alert("Profile view coming soon!"); }}><Person sx={{ mr: 1 }} /> Profile</MenuItem>
          <MenuItem onClick={() => { setAnchorEl(null); alert("Settings coming soon!"); }}><Settings sx={{ mr: 1 }} /> Settings</MenuItem>
          <Divider />
          <MenuItem sx={{ color: "#f44336" }} onClick={() => { localStorage.removeItem("token"); localStorage.removeItem("user"); navigate("/signin"); }}><Logout sx={{ mr: 1 }} /> Logout</MenuItem>
        </Menu>

        {/* Content Area */}
        <Box sx={{ p: 3 }}>
          {/* DASHBOARD SECTION */}
          {activeNav === "dashboard" && (
            <>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, color: "#1e3a5f" }}>Admin Dashboard</Typography>
                <Typography sx={{ color: "#666" }}>System overview and management</Typography>
              </Box>

              {/* Stats Cards */}
              <Box sx={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 3, mb: 3 }}>
                <Card sx={{ borderRadius: 3, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
                  <CardContent sx={{ p: 2.5 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <Box>
                        <Typography sx={{ color: "#666", fontSize: "0.85rem", mb: 0.5 }}>Total Elders</Typography>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: "#1e3a5f" }}>
                          <People sx={{ fontSize: 28, mr: 1, verticalAlign: "middle", color: "#4caf50" }} />
                          {stats.totalElders}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                      <TrendingUp sx={{ color: "#4caf50", fontSize: 16, mr: 0.5 }} />
                      <Typography sx={{ color: "#4caf50", fontSize: "0.75rem" }}>+5% from last month</Typography>
                    </Box>
                  </CardContent>
                </Card>

                <Card sx={{ borderRadius: 3, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
                  <CardContent sx={{ p: 2.5 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <Box>
                        <Typography sx={{ color: "#666", fontSize: "0.85rem", mb: 0.5 }}>Active Volunteers</Typography>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: "#1e3a5f" }}>
                          <VolunteerActivism sx={{ fontSize: 28, mr: 1, verticalAlign: "middle", color: "#2196f3" }} />
                          {stats.activeVolunteers}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                      <TrendingUp sx={{ color: "#4caf50", fontSize: 16, mr: 0.5 }} />
                      <Typography sx={{ color: "#4caf50", fontSize: "0.75rem" }}>+8% from last month</Typography>
                    </Box>
                  </CardContent>
                </Card>

                <Card sx={{ borderRadius: 3, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
                  <CardContent sx={{ p: 2.5 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <Box>
                        <Typography sx={{ color: "#666", fontSize: "0.85rem", mb: 0.5 }}>Active SOS Alerts</Typography>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: "#1e3a5f" }}>
                          <Warning sx={{ fontSize: 28, mr: 1, verticalAlign: "middle", color: "#ff9800" }} />
                          {stats.activeSosAlerts}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                      <CheckCircle sx={{ color: "#4caf50", fontSize: 16, mr: 0.5 }} />
                      <Typography sx={{ color: "#666", fontSize: "0.75rem" }}>All resolved</Typography>
                    </Box>
                  </CardContent>
                </Card>

                <Card sx={{ borderRadius: 3, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
                  <CardContent sx={{ p: 2.5 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <Box>
                        <Typography sx={{ color: "#666", fontSize: "0.85rem", mb: 0.5 }}>Avg Response Time</Typography>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: "#1e3a5f" }}>
                          <AccessTime sx={{ fontSize: 28, mr: 1, verticalAlign: "middle", color: "#9c27b0" }} />
                          {stats.avgResponseTime}
                          <Typography component="span" sx={{ fontSize: "1rem", fontWeight: 400 }}>m</Typography>
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                      <CheckCircle sx={{ color: "#4caf50", fontSize: 16, mr: 0.5 }} />
                      <Typography sx={{ color: "#666", fontSize: "0.75rem" }}>Excellent response rate</Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Box>

              {/* Charts Row */}
              <Box sx={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 3, mb: 3 }}>
                {/* SOS Response Trends */}
                <Card sx={{ borderRadius: 3, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                      <Assessment sx={{ color: "#1e3a5f" }} />
                      <Typography variant="h6" sx={{ fontWeight: 600, color: "#1e3a5f" }}>SOS Response Trends</Typography>
                    </Box>
                    <Typography sx={{ color: "#666", fontSize: "0.85rem", mb: 2 }}>Weekly overview of alerts and resolutions</Typography>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={sosChartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <RechartsTooltip />
                        <Legend />
                        <Bar dataKey="Alerts" fill="#f44336" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="Resolved" fill="#4caf50" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* User Distribution */}
                <Card sx={{ borderRadius: 3, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                      <People sx={{ color: "#1e3a5f" }} />
                      <Typography variant="h6" sx={{ fontWeight: 600, color: "#1e3a5f" }}>User Distribution</Typography>
                    </Box>
                    <Typography sx={{ color: "#666", fontSize: "0.85rem", mb: 2 }}>Platform user breakdown</Typography>
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={userDistributionData}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={80}
                          paddingAngle={2}
                          dataKey="value"
                          label={({ name, value }) => `${name} ${value}%`}
                        >
                          {userDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <RechartsTooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </Box>

              {/* Pending Volunteer Approvals */}
              <Card sx={{ borderRadius: 3, boxShadow: "0 2px 8px rgba(0,0,0,0.08)", mb: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                    <Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <VolunteerActivism sx={{ color: "#4caf50" }} />
                        <Typography variant="h6" sx={{ fontWeight: 600, color: "#1e3a5f" }}>Pending Volunteer Approvals</Typography>
                      </Box>
                      <Typography sx={{ color: "#666", fontSize: "0.85rem" }}>Review and approve new volunteers</Typography>
                    </Box>
                    <Chip label={`${volunteers.filter(v => v.status === "pending").length} pending`} size="small" sx={{ backgroundColor: "#fff3e0", color: "#ff9800" }} />
                  </Box>
                  
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow sx={{ backgroundColor: "#f5f7fa" }}>
                          <TableCell sx={{ fontWeight: 600 }}>Volunteer</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Applied Date</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {volunteers.filter(v => v.status === "pending").map((volunteer) => (
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
                            <TableCell sx={{ color: "#666" }}>{volunteer.appliedDate}</TableCell>
                            <TableCell>{getStatusChip(volunteer.status)}</TableCell>
                            <TableCell>
                              <Box sx={{ display: "flex", gap: 1 }}>
                                <Button 
                                  size="small" 
                                  variant="outlined"
                                  onClick={() => handleViewVolunteer(volunteer)}
                                  sx={{ textTransform: "none", borderRadius: 2 }}
                                >
                                  Review
                                </Button>
                                <Button 
                                  size="small" 
                                  variant="contained" 
                                  color="success"
                                  startIcon={<Check />}
                                  onClick={() => handleApproveVolunteer(volunteer.id)}
                                  sx={{ textTransform: "none", borderRadius: 2 }}
                                >
                                  Approve
                                </Button>
                              </Box>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>

              {/* Recent SOS Alerts */}
              <Card sx={{ borderRadius: 3, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                    <Warning sx={{ color: "#f44336" }} />
                    <Typography variant="h6" sx={{ fontWeight: 600, color: "#1e3a5f" }}>Recent SOS Alerts</Typography>
                  </Box>
                  <Typography sx={{ color: "#666", fontSize: "0.85rem", mb: 2 }}>Latest emergency responses</Typography>
                  
                  {sosAlerts.map((alert) => (
                    <Box 
                      key={alert.id} 
                      sx={{ 
                        display: "flex", 
                        justifyContent: "space-between", 
                        alignItems: "center",
                        p: 2,
                        mb: 1.5,
                        backgroundColor: "#fff",
                        borderRadius: 2,
                        border: "1px solid #e0e0e0",
                        "&:hover": { backgroundColor: "#f5f7fa" }
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Avatar sx={{ bgcolor: alert.status === "resolved" ? "#e8f5e9" : "#e3f2fd", color: alert.status === "resolved" ? "#4caf50" : "#2196f3" }}>
                          {alert.elder.split(" ").map(n => n[0]).join("")}
                        </Avatar>
                        <Box>
                          <Typography sx={{ fontWeight: 600 }}>{alert.elder}</Typography>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                            <LocationOn sx={{ fontSize: 14, color: "#999" }} />
                            <Typography sx={{ color: "#666", fontSize: "0.8rem" }}>{alert.address}</Typography>
                          </Box>
                          <Typography sx={{ color: "#999", fontSize: "0.75rem" }}>{alert.time}</Typography>
                        </Box>
                      </Box>
                      {getStatusChip(alert.status)}
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </>
          )}

          {/* USERS SECTION */}
          {activeNav === "users" && (
            <>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: "#1e3a5f" }}>Users Management</Typography>
                  <Typography sx={{ color: "#666" }}>Manage all platform users</Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Button variant="outlined" startIcon={<Refresh />} onClick={handleRefresh} sx={{ borderRadius: 2, textTransform: "none" }}>Refresh</Button>
                  <Button variant="outlined" startIcon={<FilterList />} sx={{ borderRadius: 2, textTransform: "none" }}>Filter</Button>
                  <Button variant="contained" startIcon={<Add />} onClick={() => alert("Add User dialog coming soon!")} sx={{ borderRadius: 2, textTransform: "none" }}>Add User</Button>
                </Box>
              </Box>

              <Card sx={{ borderRadius: 3, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ backgroundColor: "#f5f7fa" }}>
                        <TableCell sx={{ fontWeight: 600 }}>User</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Role</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Phone</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Join Date</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id} sx={{ "&:hover": { backgroundColor: "#f5f7fa" } }}>
                          <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                              <Avatar sx={{ bgcolor: "#7c4dff", width: 36, height: 36 }}>
                                {user.name.split(" ").map(n => n[0]).join("")}
                              </Avatar>
                              <Typography sx={{ fontWeight: 500 }}>{user.name}</Typography>
                            </Box>
                          </TableCell>
                          <TableCell sx={{ color: "#666" }}>{user.email}</TableCell>
                          <TableCell>
                            <Chip 
                              label={user.role.charAt(0).toUpperCase() + user.role.slice(1)} 
                              size="small" 
                              sx={{ 
                                backgroundColor: user.role === "elder" ? "#e8f5e9" : user.role === "family" ? "#f3e5f5" : "#e3f2fd",
                                color: user.role === "elder" ? "#4caf50" : user.role === "family" ? "#9c27b0" : "#2196f3"
                              }}
                            />
                          </TableCell>
                          <TableCell sx={{ color: "#666" }}>{user.phone}</TableCell>
                          <TableCell sx={{ color: "#666" }}>{user.joinDate}</TableCell>
                          <TableCell>{getStatusChip(user.status)}</TableCell>
                          <TableCell>
                            <Box sx={{ display: "flex", gap: 0.5 }}>
                              <IconButton size="small" onClick={() => handleViewUser(user)}><Visibility fontSize="small" /></IconButton>
                              <IconButton size="small" onClick={() => alert(`Edit user: ${user.name}`)}><Edit fontSize="small" /></IconButton>
                              <IconButton size="small" onClick={() => handleDeleteUser(user.id)} sx={{ color: "#f44336" }}><Delete fontSize="small" /></IconButton>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Card>
            </>
          )}

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

          {/* SOS ALERTS SECTION */}
          {activeNav === "sosAlerts" && (
            <>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: "#1e3a5f" }}>SOS Alerts</Typography>
                  <Typography sx={{ color: "#666" }}>Monitor and respond to emergency alerts</Typography>
                </Box>
                <Button variant="contained" color="error" startIcon={<Refresh />} sx={{ borderRadius: 2, textTransform: "none" }}>Refresh Alerts</Button>
              </Box>

              {/* Alert Stats */}
              <Box sx={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 3, mb: 3 }}>
                <Card sx={{ borderRadius: 3, borderLeft: "4px solid #f44336" }}>
                  <CardContent sx={{ py: 2 }}>
                    <Typography sx={{ color: "#666", fontSize: "0.85rem" }}>Active Alerts</Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: "#f44336" }}>{sosAlerts.filter(a => a.status !== "resolved").length}</Typography>
                  </CardContent>
                </Card>
                <Card sx={{ borderRadius: 3, borderLeft: "4px solid #2196f3" }}>
                  <CardContent sx={{ py: 2 }}>
                    <Typography sx={{ color: "#666", fontSize: "0.85rem" }}>Responded</Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: "#2196f3" }}>{sosAlerts.filter(a => a.status === "responded").length}</Typography>
                  </CardContent>
                </Card>
                <Card sx={{ borderRadius: 3, borderLeft: "4px solid #4caf50" }}>
                  <CardContent sx={{ py: 2 }}>
                    <Typography sx={{ color: "#666", fontSize: "0.85rem" }}>Resolved</Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: "#4caf50" }}>{sosAlerts.filter(a => a.status === "resolved").length}</Typography>
                  </CardContent>
                </Card>
                <Card sx={{ borderRadius: 3, borderLeft: "4px solid #9c27b0" }}>
                  <CardContent sx={{ py: 2 }}>
                    <Typography sx={{ color: "#666", fontSize: "0.85rem" }}>Avg Response</Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: "#9c27b0" }}>{stats.avgResponseTime}m</Typography>
                  </CardContent>
                </Card>
              </Box>

              <Card sx={{ borderRadius: 3, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ backgroundColor: "#f5f7fa" }}>
                        <TableCell sx={{ fontWeight: 600 }}>Elder</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Location</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Time</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Responder</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {sosAlerts.map((alert) => (
                        <TableRow key={alert.id} sx={{ "&:hover": { backgroundColor: "#f5f7fa" } }}>
                          <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                              <Avatar sx={{ bgcolor: "#ffebee", color: "#f44336", width: 36, height: 36 }}>
                                {alert.elder.split(" ").map(n => n[0]).join("")}
                              </Avatar>
                              <Typography sx={{ fontWeight: 500 }}>{alert.elder}</Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                              <LocationOn sx={{ fontSize: 16, color: "#999" }} />
                              <Typography sx={{ color: "#666", fontSize: "0.85rem" }}>{alert.address}</Typography>
                            </Box>
                          </TableCell>
                          <TableCell sx={{ color: "#666" }}>{alert.time}</TableCell>
                          <TableCell sx={{ color: "#666" }}>{alert.responder || "-"}</TableCell>
                          <TableCell>{getStatusChip(alert.status)}</TableCell>
                          <TableCell>
                            <Box sx={{ display: "flex", gap: 1 }}>
                              <Button 
                                size="small" 
                                variant="outlined"
                                onClick={() => handleViewAlert(alert)}
                                sx={{ textTransform: "none", borderRadius: 2 }}
                              >
                                Details
                              </Button>
                              {alert.status !== "resolved" && (
                                <Button 
                                  size="small" 
                                  variant="contained" 
                                  color="success"
                                  onClick={() => handleResolveAlert(alert.id)}
                                  sx={{ textTransform: "none", borderRadius: 2 }}
                                >
                                  Resolve
                                </Button>
                              )}
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Card>
            </>
          )}

          {/* REPORTS SECTION */}
          {activeNav === "reports" && (
            <>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, color: "#1e3a5f" }}>Reports & Analytics</Typography>
                <Typography sx={{ color: "#666" }}>View system reports and analytics</Typography>
              </Box>

              <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3, mb: 3 }}>
                <Card sx={{ borderRadius: 3, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>Weekly SOS Trends</Typography>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={sosChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <RechartsTooltip />
                        <Legend />
                        <Bar dataKey="Alerts" fill="#f44336" />
                        <Bar dataKey="Resolved" fill="#4caf50" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card sx={{ borderRadius: 3, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>User Distribution</Typography>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={userDistributionData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={2}
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}%`}
                        >
                          {userDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <RechartsTooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </Box>

              {/* Quick Reports */}
              <Card sx={{ borderRadius: 3, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>Generate Reports</Typography>
                  <Box sx={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 2 }}>
                    <Button variant="outlined" startIcon={<Assessment />} onClick={() => handleGenerateReport("User Activity")} sx={{ p: 2, borderRadius: 2, textTransform: "none", flexDirection: "column", gap: 1, "&:hover": { transform: "scale(1.05)", boxShadow: 2 }, transition: "all 0.2s" }}>
                      <Typography>User Activity</Typography>
                    </Button>
                    <Button variant="outlined" startIcon={<Warning />} onClick={() => handleGenerateReport("SOS Summary")} sx={{ p: 2, borderRadius: 2, textTransform: "none", flexDirection: "column", gap: 1, "&:hover": { transform: "scale(1.05)", boxShadow: 2 }, transition: "all 0.2s" }}>
                      <Typography>SOS Summary</Typography>
                    </Button>
                    <Button variant="outlined" startIcon={<VolunteerActivism />} onClick={() => handleGenerateReport("Volunteer Hours")} sx={{ p: 2, borderRadius: 2, textTransform: "none", flexDirection: "column", gap: 1, "&:hover": { transform: "scale(1.05)", boxShadow: 2 }, transition: "all 0.2s" }}>
                      <Typography>Volunteer Hours</Typography>
                    </Button>
                    <Button variant="outlined" startIcon={<People />} onClick={() => handleGenerateReport("Registration")} sx={{ p: 2, borderRadius: 2, textTransform: "none", flexDirection: "column", gap: 1, "&:hover": { transform: "scale(1.05)", boxShadow: 2 }, transition: "all 0.2s" }}>
                      <Typography>Registration</Typography>
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </>
          )}
        </Box>
    </Box>
  );
}
