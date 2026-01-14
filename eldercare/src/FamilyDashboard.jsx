import React, { useState } from "react";
import {
  Box, Typography, Card, CardContent, Grid, Avatar, Button, LinearProgress, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Chip,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, Snackbar, Alert, IconButton,
} from "@mui/material";
import {
  Dashboard as DashboardIcon, People, Medication, Task, Message, Notifications, Settings, Logout, LocationOn, CalendarToday, Visibility, WarningAmber, CheckCircle, Favorite, Close, Add, Send, Phone, Delete,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function FamilyDashboard() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  // Elders State
  const [elders, setElders] = useState([
    { id: 1, name: "Margaret Thompson", address: "123 Oak Street, Springfield", phone: "+1 (555) 234-5678", status: "Stable", statusColor: "#4caf50", medicineAdherence: { taken: 2, total: 3 }, avatar: "M" },
    { id: 2, name: "Robert Jenkins", address: "456 Maple Avenue, Springfield", phone: "+1 (555) 345-6789", status: "Available", statusColor: "#4caf50", medicineAdherence: { taken: 0, total: 1 }, avatar: "R" },
  ]);

  // Tasks State
  const [tasks, setTasks] = useState([
    { id: 1, title: "Doctor Appointment", description: "Tomorrow at 10:00 AM", status: "pending", priority: "high" },
    { id: 2, title: "Refill Prescriptions", description: "Due in 3 days", status: "pending", priority: "medium" },
  ]);

  // Messages State
  // eslint-disable-next-line no-unused-vars
  const [conversations, setConversations] = useState([
    { id: 1, from: "Caregiver John", avatar: "C", color: "#1976d2", message: "Margaret is doing well today.", time: "2 hours ago", unread: true },
    { id: 2, from: "Dr. Smith", avatar: "D", color: "#4caf50", message: "Prescription updated.", time: "Yesterday", unread: false },
  ]);

  // Notifications State
  // eslint-disable-next-line no-unused-vars
  const [notificationsList, setNotificationsList] = useState([
    { id: 1, type: "medicine", message: "Margaret took her morning medication", time: "1 hour ago", icon: <CheckCircle sx={{ color: "#4caf50" }} /> },
    { id: 2, type: "appointment", message: "Doctor visit scheduled for tomorrow", time: "3 hours ago", icon: <CalendarToday sx={{ color: "#f59e0b" }} /> },
    { id: 3, type: "message", message: "New message from Caregiver John", time: "2 hours ago", icon: <Message sx={{ color: "#1976d2" }} /> },
  ]);

  // Dialog States
  const [addElderDialog, setAddElderDialog] = useState(false);
  const [newElder, setNewElder] = useState({ name: "", address: "", phone: "" });
  const [elderDetailDialog, setElderDetailDialog] = useState({ open: false, elder: null });
  const [messageDialog, setMessageDialog] = useState({ open: false, recipient: null, message: "" });
  const [callDialog, setCallDialog] = useState({ open: false, elder: null });
  const [locationDialog, setLocationDialog] = useState({ open: false, elder: null });
  const [scheduleDialog, setScheduleDialog] = useState({ open: false, elder: null });
  const [settingsDialog, setSettingsDialog] = useState(false);
  const [addTaskDialog, setAddTaskDialog] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", description: "", priority: "medium" });
  const [composeDialog, setComposeDialog] = useState(false);
  const [replyDialog, setReplyDialog] = useState({ open: false, message: null, reply: "" });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/signin");
  };

  const menuItems = [
    { icon: <DashboardIcon />, label: "Dashboard" },
    { icon: <People />, label: "My Elders" },
    { icon: <Medication />, label: "Medicines" },
    { icon: <Task />, label: "Tasks" },
    { icon: <Message />, label: "Messages" },
    { icon: <Notifications />, label: "Notifications" },
  ];

  // Handlers
  const handleAddElder = () => {
    if (newElder.name.trim() && newElder.address.trim()) {
      setElders(prev => [...prev, {
        id: Date.now(),
        name: newElder.name,
        address: newElder.address,
        phone: newElder.phone || "+1 (555) 000-0000",
        status: "New",
        statusColor: "#1976d2",
        medicineAdherence: { taken: 0, total: 0 },
        avatar: newElder.name[0].toUpperCase(),
      }]);
      setSnackbar({ open: true, message: `${newElder.name} added successfully!`, severity: "success" });
      setAddElderDialog(false);
      setNewElder({ name: "", address: "", phone: "" });
    }
  };

  const handleViewDetails = (elder) => {
    setElderDetailDialog({ open: true, elder });
  };

  const handleCall = (elder) => {
    setCallDialog({ open: true, elder });
  };

  const handleMakeCall = () => {
    setSnackbar({ open: true, message: `Calling ${callDialog.elder.name}...`, severity: "info" });
    setCallDialog({ open: false, elder: null });
  };

  const handleMessage = (recipient) => {
    setMessageDialog({ open: true, recipient, message: "" });
  };

  const handleSendMessage = () => {
    if (messageDialog.message.trim()) {
      setSnackbar({ open: true, message: `Message sent to ${messageDialog.recipient.name || messageDialog.recipient.from}!`, severity: "success" });
      setMessageDialog({ open: false, recipient: null, message: "" });
    }
  };

  const handleLocation = (elder) => {
    setLocationDialog({ open: true, elder });
  };

  const handleSchedule = (elder) => {
    setScheduleDialog({ open: true, elder });
  };

  const handleMarkMedicineTaken = (elderId) => {
    setElders(prev => prev.map(e => 
      e.id === elderId ? { ...e, medicineAdherence: { ...e.medicineAdherence, taken: Math.min(e.medicineAdherence.taken + 1, e.medicineAdherence.total) } } : e
    ));
    setSnackbar({ open: true, message: "Medication marked as taken!", severity: "success" });
  };

  const handleAddTask = () => {
    if (newTask.title.trim()) {
      setTasks(prev => [...prev, { id: Date.now(), ...newTask, status: "pending" }]);
      setSnackbar({ open: true, message: "Task added successfully!", severity: "success" });
      setAddTaskDialog(false);
      setNewTask({ title: "", description: "", priority: "medium" });
    }
  };

  const handleCompleteTask = (taskId) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: "completed" } : t));
    setSnackbar({ open: true, message: "Task completed!", severity: "success" });
  };

  const handleReply = (msg) => {
    setReplyDialog({ open: true, message: msg, reply: "" });
  };

  const handleSendReply = () => {
    if (replyDialog.reply.trim()) {
      setSnackbar({ open: true, message: `Reply sent to ${replyDialog.message.from}!`, severity: "success" });
      setReplyDialog({ open: false, message: null, reply: "" });
    }
  };

  const handleSettings = () => setSettingsDialog(true);

  const handleDeleteElder = (elderId) => {
    setElders(prev => prev.filter(e => e.id !== elderId));
    setElderDetailDialog({ open: false, elder: null });
    setSnackbar({ open: true, message: "Elder removed from your list.", severity: "info" });
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#f5f7fa" }}>
      {/* Sidebar */}
      <Box sx={{ width: 260, backgroundColor: "#1a1a2e", color: "white", display: "flex", flexDirection: "column", p: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3, p: 1 }}>
          <Box sx={{ width: 40, height: 40, borderRadius: "50%", backgroundColor: "#3b82f6", display: "flex", alignItems: "center", justifyContent: "center", mr: 2 }}>
            <CheckCircle sx={{ color: "white" }} />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>ElderCare</Typography>
            <Typography variant="caption" sx={{ color: "#9ca3af" }}>Family Portal</Typography>
          </Box>
        </Box>

        <Box sx={{ backgroundColor: "rgba(255,255,255,0.1)", borderRadius: 2, p: 2, mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar sx={{ bgcolor: "#3b82f6", mr: 2 }}>ST</Avatar>
            <Box>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>Sarah Thompson</Typography>
              <Typography variant="caption" sx={{ color: "#9ca3af" }}>Family Member</Typography>
            </Box>
          </Box>
        </Box>

        <List sx={{ flexGrow: 1 }}>
          {menuItems.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton onClick={() => setActiveMenu(item.label)} sx={{ borderRadius: 2, mb: 0.5, backgroundColor: activeMenu === item.label ? "rgba(59, 130, 246, 0.2)" : "transparent", "&:hover": { backgroundColor: "rgba(59, 130, 246, 0.1)", transform: "translateX(5px)" }, transition: "all 0.2s" }}>
                <ListItemIcon sx={{ color: activeMenu === item.label ? "#3b82f6" : "white", minWidth: 40 }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} sx={{ color: activeMenu === item.label ? "#3b82f6" : "white" }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ backgroundColor: "rgba(255,255,255,0.1)", my: 1 }} />

        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={handleSettings} sx={{ borderRadius: 2, mb: 0.5, "&:hover": { backgroundColor: "rgba(59, 130, 246, 0.1)" } }}>
              <ListItemIcon sx={{ color: "white", minWidth: 40 }}><Settings /></ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout} sx={{ borderRadius: 2, color: "#ef4444", "&:hover": { backgroundColor: "rgba(239, 68, 68, 0.1)" } }}>
              <ListItemIcon sx={{ color: "#ef4444", minWidth: 40 }}><Logout /></ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: 3, overflow: "auto" }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: "#1976d2", mb: 0.5 }}>
            {activeMenu === "Dashboard" ? "Family Dashboard" : activeMenu}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {activeMenu === "Dashboard" && "Manage care for your loved ones"}
            {activeMenu === "My Elders" && "View and manage your elder family members"}
            {activeMenu === "Medicines" && "Track medication schedules"}
            {activeMenu === "Tasks" && "View and manage care tasks"}
            {activeMenu === "Messages" && "Communicate with caregivers"}
            {activeMenu === "Notifications" && "View alerts and notifications"}
          </Typography>
        </Box>

        {/* Dashboard Section */}
        {activeMenu === "Dashboard" && (
          <>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              {[
                { icon: <WarningAmber />, label: "SOS Alerts", value: 0, color: "#f59e0b", bg: "#fff7ed", desc: "No active alerts" },
                { icon: <CalendarToday />, label: "Pending Tasks", value: tasks.filter(t => t.status === "pending").length, color: "#3b82f6", bg: "#eff6ff", desc: "Tasks need completion" },
                { icon: <Favorite />, label: "Medicines Due", value: elders.reduce((acc, e) => acc + (e.medicineAdherence.total - e.medicineAdherence.taken), 0), color: "#ec4899", bg: "#fdf2f8", desc: "Not taken yet" },
              ].map((stat, i) => (
                <Grid item xs={12} md={4} key={i}>
                  <Card sx={{ borderRadius: 3, boxShadow: 2, transition: "all 0.3s", "&:hover": { transform: "translateY(-5px)", boxShadow: 6 } }}>
                    <CardContent sx={{ p: 2 }}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <Box sx={{ p: 1, borderRadius: 2, bgcolor: stat.bg, mr: 1 }}>{React.cloneElement(stat.icon, { sx: { color: stat.color } })}</Box>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>{stat.label}</Typography>
                      </Box>
                      <Typography variant="h3" sx={{ fontWeight: 700, color: stat.color }}>{stat.value}</Typography>
                      <Typography variant="body2" color="text.secondary">{stat.desc}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>Your Elders</Typography>
              <Button variant="contained" startIcon={<Add />} onClick={() => setAddElderDialog(true)} sx={{ borderRadius: 2, "&:hover": { transform: "scale(1.05)" } }}>Add Elder</Button>
            </Box>
            <Grid container spacing={2}>
              {elders.map((elder) => (
                <Grid item xs={12} md={6} key={elder.id}>
                  <Card sx={{ borderRadius: 3, boxShadow: 2, transition: "all 0.3s", "&:hover": { transform: "translateY(-3px)", boxShadow: 6 } }}>
                    <CardContent sx={{ p: 2 }}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <Avatar sx={{ width: 56, height: 56, bgcolor: "#1976d2", mr: 2 }}>{elder.avatar}</Avatar>
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="h6" sx={{ fontWeight: 700 }}>{elder.name}</Typography>
                          <Typography variant="body2" color="text.secondary">{elder.address}</Typography>
                          <Chip label={elder.status} size="small" sx={{ mt: 0.5, bgcolor: elder.statusColor, color: "white" }} />
                        </Box>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>Medicine Adherence</Typography>
                          <Typography variant="body2">{elder.medicineAdherence.taken}/{elder.medicineAdherence.total}</Typography>
                        </Box>
                        <LinearProgress variant="determinate" value={(elder.medicineAdherence.taken / elder.medicineAdherence.total) * 100 || 0} sx={{ height: 8, borderRadius: 4 }} />
                      </Box>
                      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                        <Button variant="outlined" size="small" startIcon={<LocationOn />} onClick={() => handleLocation(elder)} sx={{ borderRadius: 2, "&:hover": { transform: "scale(1.05)" } }}>Location</Button>
                        <Button variant="outlined" size="small" startIcon={<CalendarToday />} onClick={() => handleSchedule(elder)} sx={{ borderRadius: 2, "&:hover": { transform: "scale(1.05)" } }}>Schedule</Button>
                        <Button variant="contained" size="small" startIcon={<Visibility />} onClick={() => handleViewDetails(elder)} sx={{ borderRadius: 2, "&:hover": { transform: "scale(1.05)" } }}>Details</Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}

        {/* My Elders Section */}
        {activeMenu === "My Elders" && (
          <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>Elder Family Members</Typography>
              <Button variant="contained" startIcon={<Add />} onClick={() => setAddElderDialog(true)} sx={{ borderRadius: 2 }}>Add Elder</Button>
            </Box>
            <Grid container spacing={2}>
              {elders.map((elder) => (
                <Grid item xs={12} md={6} key={elder.id}>
                  <Card sx={{ borderRadius: 3, boxShadow: 2, transition: "all 0.3s", "&:hover": { transform: "translateY(-3px)", boxShadow: 6 } }}>
                    <CardContent sx={{ p: 2 }}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <Avatar sx={{ width: 60, height: 60, bgcolor: "#1976d2", mr: 2 }}>{elder.avatar}</Avatar>
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 700 }}>{elder.name}</Typography>
                          <Typography variant="body2" color="text.secondary">{elder.address}</Typography>
                          <Chip label={elder.status} size="small" sx={{ mt: 0.5, bgcolor: elder.statusColor, color: "white" }} />
                        </Box>
                      </Box>
                      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                        <Button variant="outlined" size="small" startIcon={<Phone />} onClick={() => handleCall(elder)} sx={{ borderRadius: 2 }}>Call</Button>
                        <Button variant="outlined" size="small" startIcon={<Message />} onClick={() => handleMessage(elder)} sx={{ borderRadius: 2 }}>Message</Button>
                        <Button variant="contained" size="small" startIcon={<Visibility />} onClick={() => handleViewDetails(elder)} sx={{ borderRadius: 2 }}>Details</Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Medicines Section */}
        {activeMenu === "Medicines" && (
          <Grid container spacing={2}>
            {elders.map((elder) => (
              <Grid item xs={12} key={elder.id}>
                <Card sx={{ borderRadius: 3, boxShadow: 2, transition: "all 0.3s", "&:hover": { transform: "translateY(-3px)", boxShadow: 6 } }}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>{elder.name}'s Medications</Typography>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <LinearProgress variant="determinate" value={(elder.medicineAdherence.taken / elder.medicineAdherence.total) * 100 || 0} sx={{ flexGrow: 1, height: 10, borderRadius: 5, mr: 2 }} />
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{elder.medicineAdherence.taken}/{elder.medicineAdherence.total} taken</Typography>
                    </Box>
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <Button variant="outlined" size="small" onClick={() => handleSchedule(elder)} sx={{ borderRadius: 2 }}>View Schedule</Button>
                      <Button variant="contained" size="small" onClick={() => handleMarkMedicineTaken(elder.id)} disabled={elder.medicineAdherence.taken >= elder.medicineAdherence.total} sx={{ borderRadius: 2 }}>Mark as Taken</Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Tasks Section */}
        {activeMenu === "Tasks" && (
          <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>Care Tasks</Typography>
              <Button variant="contained" startIcon={<Add />} onClick={() => setAddTaskDialog(true)} sx={{ borderRadius: 2 }}>Add Task</Button>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Card sx={{ borderRadius: 3, boxShadow: 2, borderLeft: "4px solid #f59e0b", transition: "all 0.3s", "&:hover": { boxShadow: 6 } }}>
                  <CardContent sx={{ p: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>Pending Tasks</Typography>
                    {tasks.filter(t => t.status === "pending").map(task => (
                      <Box key={task.id} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", p: 2, bgcolor: "#fff7ed", borderRadius: 2, mb: 1, mt: 2 }}>
                        <Box>
                          <Typography variant="body1" sx={{ fontWeight: 600 }}>{task.title}</Typography>
                          <Typography variant="caption" color="text.secondary">{task.description}</Typography>
                        </Box>
                        <Button size="small" variant="contained" onClick={() => handleCompleteTask(task.id)} sx={{ borderRadius: 2 }}>Complete</Button>
                      </Box>
                    ))}
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card sx={{ borderRadius: 3, boxShadow: 2, borderLeft: "4px solid #4caf50", transition: "all 0.3s", "&:hover": { boxShadow: 6 } }}>
                  <CardContent sx={{ p: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>Completed Tasks</Typography>
                    {tasks.filter(t => t.status === "completed").map(task => (
                      <Box key={task.id} sx={{ display: "flex", alignItems: "center", p: 2, bgcolor: "#f0fdf4", borderRadius: 2, mb: 1, mt: 2 }}>
                        <CheckCircle sx={{ color: "#4caf50", mr: 2 }} />
                        <Box>
                          <Typography variant="body1" sx={{ fontWeight: 600 }}>{task.title}</Typography>
                          <Typography variant="caption" color="text.secondary">{task.description}</Typography>
                        </Box>
                      </Box>
                    ))}
                    {tasks.filter(t => t.status === "completed").length === 0 && (
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>No completed tasks yet</Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        )}

        {/* Messages Section */}
        {activeMenu === "Messages" && (
          <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>Conversations</Typography>
                <Button variant="contained" size="small" startIcon={<Send />} onClick={() => setComposeDialog(true)} sx={{ borderRadius: 2 }}>New Message</Button>
              </Box>
              <List>
                {conversations.map((msg) => (
                  <ListItem key={msg.id} sx={{ bgcolor: msg.unread ? "#eff6ff" : "#f5f7fa", borderRadius: 2, mb: 1, transition: "all 0.2s", "&:hover": { bgcolor: "#e0e7ff", transform: "translateX(5px)" } }}>
                    <Avatar sx={{ bgcolor: msg.color, mr: 2 }}>{msg.avatar}</Avatar>
                    <ListItemText primary={<Typography sx={{ fontWeight: msg.unread ? 700 : 400 }}>{msg.from}</Typography>} secondary={`${msg.message} - ${msg.time}`} />
                    <Button variant="outlined" size="small" onClick={() => handleReply(msg)} sx={{ borderRadius: 2 }}>Reply</Button>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        )}

        {/* Notifications Section */}
        {activeMenu === "Notifications" && (
          <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Recent Notifications</Typography>
              <List>
                {notificationsList.map((notif) => (
                  <ListItem key={notif.id} sx={{ bgcolor: "#f5f7fa", borderRadius: 2, mb: 1, borderLeft: notif.type === "medicine" ? "4px solid #4caf50" : notif.type === "appointment" ? "4px solid #f59e0b" : "4px solid #1976d2", transition: "all 0.2s", "&:hover": { transform: "translateX(5px)" } }}>
                    <ListItemIcon>{notif.icon}</ListItemIcon>
                    <ListItemText primary={notif.message} secondary={notif.time} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        )}
      </Box>

      {/* Add Elder Dialog */}
      <Dialog open={addElderDialog} onClose={() => setAddElderDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle><Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>Add New Elder<IconButton onClick={() => setAddElderDialog(false)}><Close /></IconButton></Box></DialogTitle>
        <DialogContent>
          <Box sx={{ py: 2 }}>
            <TextField fullWidth label="Full Name" value={newElder.name} onChange={(e) => setNewElder({ ...newElder, name: e.target.value })} sx={{ mb: 2 }} />
            <TextField fullWidth label="Address" value={newElder.address} onChange={(e) => setNewElder({ ...newElder, address: e.target.value })} sx={{ mb: 2 }} />
            <TextField fullWidth label="Phone Number" value={newElder.phone} onChange={(e) => setNewElder({ ...newElder, phone: e.target.value })} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddElderDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddElder}>Add Elder</Button>
        </DialogActions>
      </Dialog>

      {/* Elder Detail Dialog */}
      <Dialog open={elderDetailDialog.open} onClose={() => setElderDetailDialog({ open: false, elder: null })} maxWidth="sm" fullWidth>
        <DialogTitle><Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>Elder Details<IconButton onClick={() => setElderDetailDialog({ open: false, elder: null })}><Close /></IconButton></Box></DialogTitle>
        <DialogContent>
          {elderDetailDialog.elder && (
            <Box sx={{ py: 2, textAlign: "center" }}>
              <Avatar sx={{ width: 80, height: 80, bgcolor: "#1976d2", mx: "auto", mb: 2, fontSize: "2rem" }}>{elderDetailDialog.elder.avatar}</Avatar>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>{elderDetailDialog.elder.name}</Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>{elderDetailDialog.elder.address}</Typography>
              <Chip label={elderDetailDialog.elder.status} sx={{ bgcolor: elderDetailDialog.elder.statusColor, color: "white", mb: 2 }} />
              <Typography variant="body2" sx={{ mb: 1 }}>Phone: {elderDetailDialog.elder.phone}</Typography>
              <Typography variant="body2">Medicine: {elderDetailDialog.elder.medicineAdherence.taken}/{elderDetailDialog.elder.medicineAdherence.total} taken</Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button color="error" startIcon={<Delete />} onClick={() => handleDeleteElder(elderDetailDialog.elder?.id)}>Remove</Button>
          <Button variant="outlined" startIcon={<Phone />} onClick={() => { setElderDetailDialog({ open: false, elder: null }); handleCall(elderDetailDialog.elder); }}>Call</Button>
          <Button variant="contained" startIcon={<Message />} onClick={() => { setElderDetailDialog({ open: false, elder: null }); handleMessage(elderDetailDialog.elder); }}>Message</Button>
        </DialogActions>
      </Dialog>

      {/* Call Dialog */}
      <Dialog open={callDialog.open} onClose={() => setCallDialog({ open: false, elder: null })}>
        <DialogTitle>Call Elder</DialogTitle>
        <DialogContent>
          {callDialog.elder && (
            <Box sx={{ textAlign: "center", py: 2 }}>
              <Avatar sx={{ width: 80, height: 80, bgcolor: "#1976d2", mx: "auto", mb: 2 }}>{callDialog.elder.avatar}</Avatar>
              <Typography variant="h6">{callDialog.elder.name}</Typography>
              <Typography variant="body1" color="text.secondary">{callDialog.elder.phone}</Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCallDialog({ open: false, elder: null })}>Cancel</Button>
          <Button variant="contained" color="success" startIcon={<Phone />} onClick={handleMakeCall}>Call Now</Button>
        </DialogActions>
      </Dialog>

      {/* Message Dialog */}
      <Dialog open={messageDialog.open} onClose={() => setMessageDialog({ open: false, recipient: null, message: "" })} maxWidth="sm" fullWidth>
        <DialogTitle>Send Message</DialogTitle>
        <DialogContent>
          <Box sx={{ py: 2 }}>
            {messageDialog.recipient && <Typography variant="body1" sx={{ mb: 2 }}>To: {messageDialog.recipient.name || messageDialog.recipient.from}</Typography>}
            <TextField fullWidth multiline rows={4} placeholder="Type your message..." value={messageDialog.message} onChange={(e) => setMessageDialog({ ...messageDialog, message: e.target.value })} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setMessageDialog({ open: false, recipient: null, message: "" })}>Cancel</Button>
          <Button variant="contained" startIcon={<Send />} onClick={handleSendMessage}>Send</Button>
        </DialogActions>
      </Dialog>

      {/* Location Dialog */}
      <Dialog open={locationDialog.open} onClose={() => setLocationDialog({ open: false, elder: null })} maxWidth="sm" fullWidth>
        <DialogTitle>Elder Location</DialogTitle>
        <DialogContent>
          {locationDialog.elder && (
            <Box sx={{ py: 2 }}>
              <Box sx={{ bgcolor: "#f5f7fa", p: 3, borderRadius: 2, textAlign: "center" }}>
                <LocationOn sx={{ fontSize: 48, color: "#1976d2", mb: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 700 }}>{locationDialog.elder.name}</Typography>
                <Typography variant="body1" color="text.secondary">{locationDialog.elder.address}</Typography>
                <Typography variant="body2" sx={{ mt: 2, color: "#4caf50" }}>✓ Location tracking active</Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLocationDialog({ open: false, elder: null })}>Close</Button>
          <Button variant="contained" onClick={() => { setSnackbar({ open: true, message: "Opening maps...", severity: "info" }); setLocationDialog({ open: false, elder: null }); }}>Open in Maps</Button>
        </DialogActions>
      </Dialog>

      {/* Schedule Dialog */}
      <Dialog open={scheduleDialog.open} onClose={() => setScheduleDialog({ open: false, elder: null })} maxWidth="sm" fullWidth>
        <DialogTitle>Medicine Schedule</DialogTitle>
        <DialogContent>
          {scheduleDialog.elder && (
            <Box sx={{ py: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>{scheduleDialog.elder.name}'s Schedule</Typography>
              <Box sx={{ bgcolor: "#f5f7fa", p: 2, borderRadius: 2, mb: 2 }}>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>Morning (8:00 AM)</Typography>
                <Typography variant="body2" color="text.secondary">Metformin 500mg, Lisinopril 10mg</Typography>
              </Box>
              <Box sx={{ bgcolor: "#f5f7fa", p: 2, borderRadius: 2 }}>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>Evening (8:00 PM)</Typography>
                <Typography variant="body2" color="text.secondary">Metformin 500mg</Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setScheduleDialog({ open: false, elder: null })}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Add Task Dialog */}
      <Dialog open={addTaskDialog} onClose={() => setAddTaskDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <Box sx={{ py: 2 }}>
            <TextField fullWidth label="Task Title" value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} sx={{ mb: 2 }} />
            <TextField fullWidth label="Description" value={newTask.description} onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddTaskDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddTask}>Add Task</Button>
        </DialogActions>
      </Dialog>

      {/* Compose Dialog */}
      <Dialog open={composeDialog} onClose={() => setComposeDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>New Message</DialogTitle>
        <DialogContent>
          <Box sx={{ py: 2 }}>
            <TextField fullWidth label="To" sx={{ mb: 2 }} />
            <TextField fullWidth multiline rows={4} label="Message" />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setComposeDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => { setComposeDialog(false); setSnackbar({ open: true, message: "Message sent!", severity: "success" }); }}>Send</Button>
        </DialogActions>
      </Dialog>

      {/* Reply Dialog */}
      <Dialog open={replyDialog.open} onClose={() => setReplyDialog({ open: false, message: null, reply: "" })} maxWidth="sm" fullWidth>
        <DialogTitle>Reply</DialogTitle>
        <DialogContent>
          {replyDialog.message && (
            <Box sx={{ py: 2 }}>
              <Box sx={{ bgcolor: "#f5f7fa", p: 2, borderRadius: 2, mb: 2 }}>
                <Typography variant="body2" color="text.secondary">From: {replyDialog.message.from}</Typography>
                <Typography variant="body1">{replyDialog.message.message}</Typography>
              </Box>
              <TextField fullWidth multiline rows={3} placeholder="Type your reply..." value={replyDialog.reply} onChange={(e) => setReplyDialog({ ...replyDialog, reply: e.target.value })} />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setReplyDialog({ open: false, message: null, reply: "" })}>Cancel</Button>
          <Button variant="contained" onClick={handleSendReply}>Send Reply</Button>
        </DialogActions>
      </Dialog>

      {/* Settings Dialog */}
      <Dialog open={settingsDialog} onClose={() => setSettingsDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Settings</DialogTitle>
        <DialogContent>
          <List>
            <ListItem sx={{ bgcolor: "#f5f7fa", borderRadius: 2, mb: 1 }}>
              <ListItemText primary="Notifications" secondary="Receive alerts" />
              <Chip label="Enabled" color="success" size="small" />
            </ListItem>
            <ListItem sx={{ bgcolor: "#f5f7fa", borderRadius: 2, mb: 1 }}>
              <ListItemText primary="Location Tracking" secondary="Track elders' location" />
              <Chip label="Enabled" color="success" size="small" />
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSettingsDialog(false)}>Close</Button>
          <Button variant="contained" onClick={() => { setSettingsDialog(false); setSnackbar({ open: true, message: "Settings saved!", severity: "success" }); }}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
}
