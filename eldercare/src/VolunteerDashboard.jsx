import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Avatar,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip,
  Rating,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
  IconButton,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  HelpOutline,
  Message,
  Person,
  Settings,
  Logout,
  Phone,
  CheckCircle,
  Star,
  AccessTime,
  People,
  Favorite,
  Close,
  Send,
  Edit,
  Save,
  Cancel,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function VolunteerDashboard() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  // Profile State
  const [profileData, setProfileData] = useState({
    name: "James Wilson",
    email: "james@example.com",
    phone: "+1 (555) 123-4567",
    skills: "First Aid, Driving, Companionship",
    availability: "Weekdays 9AM-5PM",
  });
  const [editingProfile, setEditingProfile] = useState(false);
  const [tempProfile, setTempProfile] = useState({ ...profileData });

  // Dialog States
  const [callDialog, setCallDialog] = useState({ open: false, elder: null });
  const [messageDialog, setMessageDialog] = useState({ open: false, elder: null, message: "" });
  const [settingsDialog, setSettingsDialog] = useState(false);
  const [composeDialog, setComposeDialog] = useState(false);
  const [newMessage, setNewMessage] = useState({ to: "", message: "" });
  const [replyDialog, setReplyDialog] = useState({ open: false, message: null, reply: "" });

  // Elders State
  const [nearbyElders, setNearbyElders] = useState([
    {
      id: 1,
      name: "Margaret Thompson",
      address: "123 Oak Street, Springfield",
      age: 78,
      phone: "+1 (555) 234-5678",
      status: "Needs Help",
      statusColor: "#f59e0b",
      condition: "Diabetes Type 2, High Blood Pressure",
      avatar: "M",
      requestAccepted: false,
    },
    {
      id: 2,
      name: "Robert Jenkins",
      address: "456 Maple Avenue, Springfield",
      age: 82,
      phone: "+1 (555) 345-6789",
      status: "Available",
      statusColor: "#4caf50",
      condition: "Good - Regular checkups needed",
      avatar: "R",
      requestAccepted: false,
    },
  ]);

  // Messages State
  const [conversations, setConversations] = useState([
    { id: 1, from: "Margaret Thompson", avatar: "M", color: "#1976d2", message: "Thank you so much for your help yesterday!", time: "3 hours ago", unread: true },
    { id: 2, from: "Robert Jenkins", avatar: "R", color: "#4caf50", message: "Can you help me with grocery shopping?", time: "1 day ago", unread: true },
    { id: 3, from: "Coordinator Sarah", avatar: "C", color: "#f59e0b", message: "Great work this week! Your rating is improving.", time: "2 days ago", unread: false },
  ]);

  // Stats
  const [stats, setStats] = useState({
    peopleHelped: 24,
    activeRequests: 2,
    rating: 4.8,
    avgResponse: "5 min",
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/signin");
  };

  const menuItems = [
    { icon: <DashboardIcon />, label: "Dashboard" },
    { icon: <HelpOutline />, label: "Help Requests" },
    { icon: <Message />, label: "Messages" },
    { icon: <Person />, label: "Profile" },
  ];

  // Handler Functions
  const handleCall = (elder) => {
    setCallDialog({ open: true, elder });
  };

  const handleMakeCall = () => {
    setSnackbar({ open: true, message: `Calling ${callDialog.elder.name} at ${callDialog.elder.phone}...`, severity: "info" });
    setCallDialog({ open: false, elder: null });
    setTimeout(() => {
      setSnackbar({ open: true, message: "Call connected successfully!", severity: "success" });
    }, 2000);
  };

  const handleMessage = (elder) => {
    setMessageDialog({ open: true, elder, message: "" });
  };

  const handleSendMessage = () => {
    if (messageDialog.message.trim()) {
      setSnackbar({ open: true, message: `Message sent to ${messageDialog.elder.name}!`, severity: "success" });
      setConversations(prev => [{
        id: Date.now(),
        from: messageDialog.elder.name,
        avatar: messageDialog.elder.avatar,
        color: "#1976d2",
        message: `You: ${messageDialog.message}`,
        time: "Just now",
        unread: false,
      }, ...prev]);
      setMessageDialog({ open: false, elder: null, message: "" });
    }
  };

  const handleAcceptRequest = (elderId) => {
    setNearbyElders(prev => prev.map(e => 
      e.id === elderId ? { ...e, requestAccepted: true, status: "Helping", statusColor: "#4caf50" } : e
    ));
    setStats(prev => ({ ...prev, activeRequests: prev.activeRequests - 1, peopleHelped: prev.peopleHelped + 1 }));
    setSnackbar({ open: true, message: "Help request accepted! The elder has been notified.", severity: "success" });
  };

  const handleOfferHelp = (elder) => {
    setSnackbar({ open: true, message: `Help offer sent to ${elder.name}!`, severity: "success" });
  };

  const handleReply = (msg) => {
    setReplyDialog({ open: true, message: msg, reply: "" });
  };

  const handleSendReply = () => {
    if (replyDialog.reply.trim()) {
      setSnackbar({ open: true, message: `Reply sent to ${replyDialog.message.from}!`, severity: "success" });
      setConversations(prev => prev.map(c => 
        c.id === replyDialog.message.id ? { ...c, unread: false } : c
      ));
      setReplyDialog({ open: false, message: null, reply: "" });
    }
  };

  const handleStartConversation = () => {
    setComposeDialog(true);
  };

  const handleSendNewMessage = () => {
    if (newMessage.to.trim() && newMessage.message.trim()) {
      setConversations(prev => [{
        id: Date.now(),
        from: newMessage.to,
        avatar: newMessage.to[0].toUpperCase(),
        color: "#1976d2",
        message: `You: ${newMessage.message}`,
        time: "Just now",
        unread: false,
      }, ...prev]);
      setSnackbar({ open: true, message: `Message sent to ${newMessage.to}!`, severity: "success" });
      setComposeDialog(false);
      setNewMessage({ to: "", message: "" });
    }
  };

  const handleEditProfile = () => {
    setTempProfile({ ...profileData });
    setEditingProfile(true);
  };

  const handleSaveProfile = () => {
    setProfileData({ ...tempProfile });
    setEditingProfile(false);
    setSnackbar({ open: true, message: "Profile updated successfully!", severity: "success" });
  };

  const handleCancelEdit = () => {
    setTempProfile({ ...profileData });
    setEditingProfile(false);
  };

  const handleSettings = () => {
    setSettingsDialog(true);
  };

  return (
    <>
      {/* Main Content */}
      <Box sx={{ width: "100%", p: 3, overflow: "auto" }}>
        {/* Header */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: "#1976d2", mb: 0.5 }}>
            {activeMenu === "Dashboard" ? "Volunteer Dashboard" : activeMenu}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {activeMenu === "Dashboard" && "Thank you for making a difference!"}
            {activeMenu === "Help Requests" && "View and respond to help requests from elders"}
            {activeMenu === "Messages" && "Communicate with elders and coordinators"}
            {activeMenu === "Profile" && "Manage your volunteer profile and settings"}
          </Typography>
        </Box>

        {/* Dashboard Section */}
        {activeMenu === "Dashboard" && (
          <>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              {[
                { icon: <People />, label: "People Helped", value: stats.peopleHelped, color: "#1976d2", bg: "#eff6ff" },
                { icon: <Favorite />, label: "Active Requests", value: stats.activeRequests, color: "#ec4899", bg: "#fdf2f8" },
                { icon: <Star />, label: "Your Rating", value: stats.rating, color: "#f59e0b", bg: "#fff7ed" },
                { icon: <AccessTime />, label: "Avg Response", value: stats.avgResponse, color: "#10b981", bg: "#f0fdf4" },
              ].map((stat, i) => (
                <Grid item xs={12} sm={6} md={3} key={i}>
                  <Card sx={{ borderRadius: 3, boxShadow: 2, transition: "all 0.3s", "&:hover": { transform: "translateY(-5px)", boxShadow: 6 } }}>
                    <CardContent sx={{ p: 2 }}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <Box sx={{ p: 1, borderRadius: 2, bgcolor: stat.bg, mr: 1 }}>{React.cloneElement(stat.icon, { sx: { color: stat.color } })}</Box>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>{stat.label}</Typography>
                      </Box>
                      <Typography variant="h4" sx={{ fontWeight: 700, color: stat.color }}>{stat.value}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>Nearby Elders</Typography>
                <Chip label={`${nearbyElders.length} nearby`} color="primary" size="small" />
              </Box>
              <Grid container spacing={2}>
                {nearbyElders.map((elder) => (
                  <Grid item xs={12} key={elder.id}>
                    <Card sx={{ borderRadius: 3, boxShadow: 2, transition: "all 0.3s", "&:hover": { transform: "translateY(-3px)", boxShadow: 6 } }}>
                      <CardContent sx={{ p: 2 }}>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Avatar sx={{ width: 56, height: 56, bgcolor: "#1976d2", mr: 2 }}>{elder.avatar}</Avatar>
                            <Box>
                              <Typography variant="h6" sx={{ fontWeight: 700 }}>{elder.name}</Typography>
                              <Typography variant="body2" color="text.secondary">{elder.address}</Typography>
                              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                                <Chip label={elder.status} size="small" sx={{ bgcolor: elder.statusColor, color: "white", fontWeight: 600 }} />
                                <Typography variant="caption" color="text.secondary">Age: {elder.age}</Typography>
                              </Box>
                            </Box>
                          </Box>
                          <Box sx={{ display: "flex", gap: 1 }}>
                            <Button variant="outlined" size="small" startIcon={<Phone />} onClick={() => handleCall(elder)} sx={{ borderRadius: 2, "&:hover": { transform: "scale(1.05)" } }}>Call</Button>
                            <Button variant="outlined" size="small" startIcon={<Message />} onClick={() => handleMessage(elder)} sx={{ borderRadius: 2, "&:hover": { transform: "scale(1.05)" } }}>Message</Button>
                            <Button variant="contained" size="small" onClick={() => handleOfferHelp(elder)} sx={{ borderRadius: 2, "&:hover": { transform: "scale(1.05)" } }}>Offer Help</Button>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Card sx={{ borderRadius: 3, boxShadow: 2, bgcolor: "#f0fdf4", transition: "all 0.3s", "&:hover": { boxShadow: 6 } }}>
              <CardContent sx={{ p: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <CheckCircle sx={{ color: "#22c55e", mr: 2, fontSize: 32 }} />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>Successfully helped Margaret Thompson</Typography>
                    <Typography variant="body2" color="text.secondary">2 hours ago • 8 min response time</Typography>
                  </Box>
                  <Rating value={5} readOnly size="small" />
                </Box>
              </CardContent>
            </Card>
          </>
        )}

        {/* Help Requests Section */}
        {activeMenu === "Help Requests" && (
          <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>Active Help Requests</Typography>
              <Chip label={`${nearbyElders.filter(e => !e.requestAccepted).length} Available`} color="warning" />
            </Box>
            <Grid container spacing={2}>
              {nearbyElders.map((elder) => (
                <Grid item xs={12} key={elder.id}>
                  <Card sx={{ borderRadius: 3, boxShadow: 2, borderLeft: elder.requestAccepted ? "4px solid #4caf50" : "4px solid #f59e0b", transition: "all 0.3s", "&:hover": { transform: "translateY(-3px)", boxShadow: 6 } }}>
                    <CardContent sx={{ p: 2 }}>
                      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Avatar sx={{ width: 56, height: 56, bgcolor: "#1976d2", mr: 2 }}>{elder.avatar}</Avatar>
                          <Box>
                            <Typography variant="h6" sx={{ fontWeight: 700 }}>{elder.name}</Typography>
                            <Typography variant="body2" color="text.secondary">{elder.address}</Typography>
                            <Typography variant="body2" sx={{ color: "#64748b", fontStyle: "italic", mt: 0.5 }}>{elder.condition}</Typography>
                          </Box>
                        </Box>
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <Button variant="outlined" size="small" startIcon={<Phone />} onClick={() => handleCall(elder)} sx={{ borderRadius: 2, "&:hover": { transform: "scale(1.05)" } }}>Call</Button>
                          {elder.requestAccepted ? (
                            <Chip label="Accepted" color="success" icon={<CheckCircle />} />
                          ) : (
                            <Button variant="contained" size="small" color="success" onClick={() => handleAcceptRequest(elder.id)} sx={{ borderRadius: 2, "&:hover": { transform: "scale(1.05)" } }}>Accept Request</Button>
                          )}
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Messages Section */}
        {activeMenu === "Messages" && (
          <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>Conversations</Typography>
                <Button variant="contained" size="small" startIcon={<Send />} onClick={handleStartConversation} sx={{ borderRadius: 2, "&:hover": { transform: "scale(1.05)" } }}>New Message</Button>
              </Box>
              <List>
                {conversations.map((msg) => (
                  <ListItem key={msg.id} sx={{ bgcolor: msg.unread ? "#eff6ff" : "#f5f7fa", borderRadius: 2, mb: 1, transition: "all 0.2s", "&:hover": { bgcolor: "#e0e7ff", transform: "translateX(5px)" } }}>
                    <Avatar sx={{ bgcolor: msg.color, mr: 2 }}>{msg.avatar}</Avatar>
                    <ListItemText 
                      primary={<Typography sx={{ fontWeight: msg.unread ? 700 : 400 }}>{msg.from}</Typography>}
                      secondary={`${msg.message} - ${msg.time}`}
                    />
                    <Button variant="outlined" size="small" onClick={() => handleReply(msg)} sx={{ borderRadius: 2, "&:hover": { transform: "scale(1.05)" } }}>Reply</Button>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        )}

        {/* Profile Section */}
        {activeMenu === "Profile" && (
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Card sx={{ borderRadius: 3, boxShadow: 2, textAlign: "center", transition: "all 0.3s", "&:hover": { boxShadow: 6 } }}>
                <CardContent sx={{ p: 3 }}>
                  <Avatar sx={{ width: 100, height: 100, bgcolor: "#1976d2", mx: "auto", mb: 2, fontSize: "2rem" }}>{profileData.name.split(" ").map(n => n[0]).join("")}</Avatar>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>{profileData.name}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>Volunteer since Nov 2024</Typography>
                  <Chip label="Active Volunteer" color="success" sx={{ mb: 2 }} />
                  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mb: 2 }}>
                    <Rating value={stats.rating} precision={0.1} readOnly />
                    <Typography variant="body2" sx={{ ml: 1 }}>{stats.rating}/5.0</Typography>
                  </Box>
                  {!editingProfile ? (
                    <Button variant="outlined" fullWidth startIcon={<Edit />} onClick={handleEditProfile} sx={{ borderRadius: 2, "&:hover": { transform: "scale(1.02)" } }}>Edit Profile</Button>
                  ) : (
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Button variant="contained" fullWidth startIcon={<Save />} onClick={handleSaveProfile} sx={{ borderRadius: 2 }}>Save</Button>
                      <Button variant="outlined" fullWidth startIcon={<Cancel />} onClick={handleCancelEdit} sx={{ borderRadius: 2 }}>Cancel</Button>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={8}>
              <Card sx={{ borderRadius: 3, boxShadow: 2, mb: 2, transition: "all 0.3s", "&:hover": { boxShadow: 6 } }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Profile Information</Typography>
                  <Grid container spacing={2}>
                    {[
                      { label: "Email", field: "email" },
                      { label: "Phone", field: "phone" },
                      { label: "Skills", field: "skills" },
                      { label: "Availability", field: "availability" },
                    ].map((item) => (
                      <Grid item xs={12} sm={6} key={item.field}>
                        <Typography variant="caption" color="text.secondary">{item.label}</Typography>
                        {editingProfile ? (
                          <TextField fullWidth size="small" value={tempProfile[item.field]} onChange={(e) => setTempProfile({ ...tempProfile, [item.field]: e.target.value })} />
                        ) : (
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>{profileData[item.field]}</Typography>
                        )}
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
              <Card sx={{ borderRadius: 3, boxShadow: 2, transition: "all 0.3s", "&:hover": { boxShadow: 6 } }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Statistics</Typography>
                  <Grid container spacing={2}>
                    {[
                      { label: "People Helped", value: 12, color: "#4caf50", bg: "#f0fdf4" },
                      { label: "Avg Response", value: "5 min", color: "#1976d2", bg: "#eff6ff" },
                      { label: "Hours Volunteered", value: 24, color: "#f59e0b", bg: "#fff7ed" },
                      { label: "5-Star Ratings", value: 8, color: "#ec4899", bg: "#fdf2f8" },
                    ].map((stat, i) => (
                      <Grid item xs={6} key={i}>
                        <Box sx={{ textAlign: "center", p: 2, bgcolor: stat.bg, borderRadius: 2, transition: "all 0.3s", "&:hover": { transform: "scale(1.02)" } }}>
                          <Typography variant="h4" sx={{ fontWeight: 700, color: stat.color }}>{stat.value}</Typography>
                          <Typography variant="body2" color="text.secondary">{stat.label}</Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </Box>

      {/* Call Dialog */}
      <Dialog open={callDialog.open} onClose={() => setCallDialog({ open: false, elder: null })}>
        <DialogTitle><Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>Call Elder<IconButton onClick={() => setCallDialog({ open: false, elder: null })}><Close /></IconButton></Box></DialogTitle>
        <DialogContent>
          {callDialog.elder && (
            <Box sx={{ textAlign: "center", py: 2 }}>
              <Avatar sx={{ width: 80, height: 80, bgcolor: "#1976d2", mx: "auto", mb: 2, fontSize: "2rem" }}>{callDialog.elder.avatar}</Avatar>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>{callDialog.elder.name}</Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>{callDialog.elder.phone}</Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCallDialog({ open: false, elder: null })}>Cancel</Button>
          <Button variant="contained" color="success" startIcon={<Phone />} onClick={handleMakeCall}>Call Now</Button>
        </DialogActions>
      </Dialog>

      {/* Message Dialog */}
      <Dialog open={messageDialog.open} onClose={() => setMessageDialog({ open: false, elder: null, message: "" })} maxWidth="sm" fullWidth>
        <DialogTitle><Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>Send Message<IconButton onClick={() => setMessageDialog({ open: false, elder: null, message: "" })}><Close /></IconButton></Box></DialogTitle>
        <DialogContent>
          {messageDialog.elder && (
            <Box sx={{ py: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Avatar sx={{ bgcolor: "#1976d2", mr: 2 }}>{messageDialog.elder.avatar}</Avatar>
                <Typography variant="h6">{messageDialog.elder.name}</Typography>
              </Box>
              <TextField fullWidth multiline rows={4} placeholder="Type your message..." value={messageDialog.message} onChange={(e) => setMessageDialog({ ...messageDialog, message: e.target.value })} />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setMessageDialog({ open: false, elder: null, message: "" })}>Cancel</Button>
          <Button variant="contained" startIcon={<Send />} onClick={handleSendMessage}>Send</Button>
        </DialogActions>
      </Dialog>

      {/* Reply Dialog */}
      <Dialog open={replyDialog.open} onClose={() => setReplyDialog({ open: false, message: null, reply: "" })} maxWidth="sm" fullWidth>
        <DialogTitle>Reply to Message</DialogTitle>
        <DialogContent>
          {replyDialog.message && (
            <Box sx={{ py: 2 }}>
              <Box sx={{ bgcolor: "#f5f7fa", p: 2, borderRadius: 2, mb: 2 }}>
                <Typography variant="body2" color="text.secondary">Original message from {replyDialog.message.from}:</Typography>
                <Typography variant="body1">{replyDialog.message.message}</Typography>
              </Box>
              <TextField fullWidth multiline rows={3} placeholder="Type your reply..." value={replyDialog.reply} onChange={(e) => setReplyDialog({ ...replyDialog, reply: e.target.value })} />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setReplyDialog({ open: false, message: null, reply: "" })}>Cancel</Button>
          <Button variant="contained" startIcon={<Send />} onClick={handleSendReply}>Send Reply</Button>
        </DialogActions>
      </Dialog>

      {/* Compose Dialog */}
      <Dialog open={composeDialog} onClose={() => setComposeDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>New Message</DialogTitle>
        <DialogContent>
          <Box sx={{ py: 2 }}>
            <TextField fullWidth label="To" placeholder="Enter recipient name" value={newMessage.to} onChange={(e) => setNewMessage({ ...newMessage, to: e.target.value })} sx={{ mb: 2 }} />
            <TextField fullWidth multiline rows={4} label="Message" placeholder="Type your message..." value={newMessage.message} onChange={(e) => setNewMessage({ ...newMessage, message: e.target.value })} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setComposeDialog(false)}>Cancel</Button>
          <Button variant="contained" startIcon={<Send />} onClick={handleSendNewMessage}>Send</Button>
        </DialogActions>
      </Dialog>

      {/* Settings Dialog */}
      <Dialog open={settingsDialog} onClose={() => setSettingsDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Settings</DialogTitle>
        <DialogContent>
          <List>
            <ListItem sx={{ bgcolor: "#f5f7fa", borderRadius: 2, mb: 1 }}>
              <ListItemText primary="Notifications" secondary="Receive push notifications" />
              <Chip label="Enabled" color="success" size="small" />
            </ListItem>
            <ListItem sx={{ bgcolor: "#f5f7fa", borderRadius: 2, mb: 1 }}>
              <ListItemText primary="Location Services" secondary="Share your location" />
              <Chip label="Enabled" color="success" size="small" />
            </ListItem>
            <ListItem sx={{ bgcolor: "#f5f7fa", borderRadius: 2 }}>
              <ListItemText primary="Availability Status" secondary="Show when available" />
              <Chip label="Available" color="primary" size="small" />
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
    </>
  );
}
