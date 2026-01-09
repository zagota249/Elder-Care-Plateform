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
  LinearProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
} from "@mui/material";
import {
  Phone,
  VideoCall,
  Message,
  Notifications,
  LocationOn,
  Favorite,
  AccessTime,
  Warning,
  CheckCircle,
  LocalHospital,
  Medication,
  Event,
  Logout,
  Add,
  Close,
  Edit,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

// Card hover style
const cardHoverSx = {
  borderRadius: 3,
  boxShadow: 3,
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: 6,
  },
};

export default function FamilyDashboard() {
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [openAddMedDialog, setOpenAddMedDialog] = useState(false);
  const [openAddEventDialog, setOpenAddEventDialog] = useState(false);
  const [openEditElderDialog, setOpenEditElderDialog] = useState(false);

  // Editable Elder Data
  const [elderData, setElderData] = useState({
    name: "Margaret Johnson",
    age: 78,
    status: "Active",
    lastActive: "5 mins ago",
    location: "Home",
    healthScore: 85,
  });

  // Editable Health Metrics
  const [healthMetrics, setHealthMetrics] = useState([
    { label: "Heart Rate", value: "72 bpm", status: "normal", icon: <Favorite /> },
    { label: "Blood Pressure", value: "120/80", status: "normal", icon: <LocalHospital /> },
    { label: "Steps Today", value: "2,450", status: "low", icon: <AccessTime /> },
    { label: "Sleep", value: "7.5 hrs", status: "normal", icon: <CheckCircle /> },
  ]);

  // Editable Medications
  const [medications, setMedications] = useState([
    { id: 1, name: "Metformin", time: "8:00 AM", status: "taken", dose: "500mg" },
    { id: 2, name: "Lisinopril", time: "12:00 PM", status: "pending", dose: "10mg" },
    { id: 3, name: "Aspirin", time: "6:00 PM", status: "upcoming", dose: "81mg" },
  ]);

  // Editable Activities
  const [recentActivities, setRecentActivities] = useState([
    { id: 1, activity: "Took morning medication", time: "8:05 AM", type: "medication" },
    { id: 2, activity: "Completed morning walk", time: "9:30 AM", type: "activity" },
    { id: 3, activity: "Video call with Dr. Smith", time: "11:00 AM", type: "appointment" },
    { id: 4, activity: "Lunch reminder acknowledged", time: "12:30 PM", type: "reminder" },
  ]);

  // Editable Events
  const [upcomingEvents, setUpcomingEvents] = useState([
    { id: 1, title: "Doctor Appointment", date: "Dec 21, 2025", time: "10:00 AM", type: "medical" },
    { id: 2, title: "Physical Therapy", date: "Dec 22, 2025", time: "2:00 PM", type: "therapy" },
    { id: 3, title: "Family Visit", date: "Dec 24, 2025", time: "4:00 PM", type: "social" },
  ]);

  // Alerts
  const [alerts, setAlerts] = useState([
    { id: 1, message: "Medication reminder: Lisinopril due in 30 mins", type: "warning" },
  ]);

  // New Forms
  const [newMed, setNewMed] = useState({ name: "", dose: "", time: "" });
  const [newEvent, setNewEvent] = useState({ title: "", date: "", time: "", type: "medical" });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/signin");
  };

  const dismissAlert = (id) => {
    setAlerts(alerts.filter((a) => a.id !== id));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "taken":
      case "normal":
        return "success";
      case "pending":
      case "low":
        return "warning";
      case "missed":
        return "error";
      default:
        return "default";
    }
  };

  const handleAddMedication = () => {
    if (!newMed.name || !newMed.dose || !newMed.time) {
      setSnackbar({ open: true, message: "Please fill all required fields", severity: "error" });
      return;
    }
    const med = {
      id: medications.length + 1,
      ...newMed,
      status: "upcoming",
    };
    setMedications([...medications, med]);
    setNewMed({ name: "", dose: "", time: "" });
    setOpenAddMedDialog(false);
    setSnackbar({ open: true, message: "Medication added successfully!", severity: "success" });
  };

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.date || !newEvent.time) {
      setSnackbar({ open: true, message: "Please fill all required fields", severity: "error" });
      return;
    }
    const event = {
      id: upcomingEvents.length + 1,
      ...newEvent,
    };
    setUpcomingEvents([...upcomingEvents, event]);
    setNewEvent({ title: "", date: "", time: "", type: "medical" });
    setOpenAddEventDialog(false);
    setSnackbar({ open: true, message: "Event added successfully!", severity: "success" });
  };

  const handleUpdateElder = () => {
    setOpenEditElderDialog(false);
    setSnackbar({ open: true, message: "Elder information updated!", severity: "success" });
  };

  const markMedicationTaken = (id) => {
    setMedications(medications.map((m) => (m.id === id ? { ...m, status: "taken" } : m)));
    setRecentActivities([
      { id: recentActivities.length + 1, activity: `Medication taken`, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), type: "medication" },
      ...recentActivities,
    ]);
    setSnackbar({ open: true, message: "Medication marked as taken!", severity: "success" });
  };

  const handleEmergencySOS = () => {
    setSnackbar({ open: true, message: "Emergency SOS sent! Help is on the way.", severity: "error" });
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f7fa", p: 3 }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: "#1a237e" }}>
            Family Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Monitor and stay connected with your loved one
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <IconButton>
            <Badge badgeContent={alerts.length} color="error">
              <Notifications />
            </Badge>
          </IconButton>
          <Button variant="outlined" color="error" startIcon={<Logout />} onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Box>

      {/* Alerts */}
      {alerts.map((alert) => (
        <Alert
          key={alert.id}
          severity={alert.type}
          onClose={() => dismissAlert(alert.id)}
          sx={{ mb: 2 }}
        >
          {alert.message}
        </Alert>
      ))}

      <Grid container spacing={3}>
        {/* Elder Profile Card */}
        <Grid item xs={12} md={4}>
          <Card sx={cardHoverSx}>
            <CardContent sx={{ textAlign: "center", py: 4 }}>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={
                  <Box
                    sx={{
                      width: 16,
                      height: 16,
                      borderRadius: "50%",
                      backgroundColor: "#4caf50",
                      border: "2px solid white",
                    }}
                  />
                }
              >
                <Avatar
                  sx={{ width: 100, height: 100, mx: "auto", fontSize: "2.5rem", bgcolor: "#1976d2" }}
                >
                  {elderData.name.charAt(0)}
                </Avatar>
              </Badge>
              <Typography variant="h5" sx={{ mt: 2, fontWeight: 600 }}>
                {elderData.name}
              </Typography>
              <Typography color="text.secondary">Age: {elderData.age}</Typography>
              <Chip
                icon={<CheckCircle />}
                label={elderData.status}
                color="success"
                size="small"
                sx={{ mt: 1 }}
              />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Last active: {elderData.lastActive}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mb: 2 }}>
                <Button variant="contained" startIcon={<Phone />} size="small">
                  Call
                </Button>
                <Button variant="contained" startIcon={<VideoCall />} size="small" color="secondary">
                  Video
                </Button>
                <Button variant="outlined" startIcon={<Message />} size="small">
                  Chat
                </Button>
              </Box>

              <Button variant="text" startIcon={<Edit />} onClick={() => setOpenEditElderDialog(true)}>
                Edit Info
              </Button>

              <Box sx={{ mt: 2, display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
                <LocationOn color="action" fontSize="small" />
                <Typography variant="body2" color="text.secondary">
                  {elderData.location}
                </Typography>
              </Box>
            </CardContent>
          </Card>

          {/* Health Score */}
          <Card sx={{ ...cardHoverSx, mt: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Health Score
              </Typography>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h2" sx={{ color: "#4caf50", fontWeight: 700 }}>
                  {elderData.healthScore}
                </Typography>
                <Typography color="text.secondary">Out of 100</Typography>
                <LinearProgress
                  variant="determinate"
                  value={elderData.healthScore}
                  sx={{ mt: 2, height: 10, borderRadius: 5 }}
                  color="success"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} md={8}>
          {/* Health Metrics */}
          <Card sx={{ ...cardHoverSx, mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Health Metrics
              </Typography>
              <Grid container spacing={2}>
                {healthMetrics.map((metric, index) => (
                  <Grid item xs={6} sm={3} key={index}>
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        backgroundColor: "#f5f5f5",
                        textAlign: "center",
                        transition: "all 0.3s ease",
                        "&:hover": { backgroundColor: "#e3f2fd", transform: "scale(1.02)" },
                      }}
                    >
                      <Box sx={{ color: getStatusColor(metric.status) === "success" ? "#4caf50" : "#ff9800" }}>
                        {metric.icon}
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 600, mt: 1 }}>
                        {metric.value}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {metric.label}
                      </Typography>
                      <Chip
                        label={metric.status}
                        size="small"
                        color={getStatusColor(metric.status)}
                        sx={{ mt: 1 }}
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>

          <Grid container spacing={3}>
            {/* Medications */}
            <Grid item xs={12} md={6}>
              <Card sx={{ ...cardHoverSx, height: "100%" }}>
                <CardContent>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Today's Medications
                    </Typography>
                    <IconButton color="primary" onClick={() => setOpenAddMedDialog(true)}>
                      <Add />
                    </IconButton>
                  </Box>
                  <List dense>
                    {medications.map((med) => (
                      <ListItem
                        key={med.id}
                        secondaryAction={
                          med.status !== "taken" && (
                            <Button size="small" onClick={() => markMedicationTaken(med.id)}>
                              Mark Taken
                            </Button>
                          )
                        }
                      >
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: "#e3f2fd" }}>
                            <Medication color="primary" />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={med.name}
                          secondary={`${med.dose} • ${med.time}`}
                        />
                        <Chip
                          label={med.status}
                          size="small"
                          color={getStatusColor(med.status)}
                          sx={{ mr: 1 }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>

            {/* Upcoming Events */}
            <Grid item xs={12} md={6}>
              <Card sx={{ ...cardHoverSx, height: "100%" }}>
                <CardContent>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Upcoming Events
                    </Typography>
                    <IconButton color="primary" onClick={() => setOpenAddEventDialog(true)}>
                      <Add />
                    </IconButton>
                  </Box>
                  <List dense>
                    {upcomingEvents.map((event) => (
                      <ListItem key={event.id}>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: "#fff3e0" }}>
                            <Event color="warning" />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={event.title}
                          secondary={`${event.date} • ${event.time}`}
                        />
                        <Chip label={event.type} size="small" variant="outlined" />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Recent Activity */}
          <Card sx={{ ...cardHoverSx, mt: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Recent Activity
              </Typography>
              <List>
                {recentActivities.slice(0, 5).map((activity, index) => (
                  <React.Fragment key={activity.id}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: "#e8f5e9" }}>
                          <CheckCircle color="success" />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={activity.activity}
                        secondary={activity.time}
                      />
                      <Chip label={activity.type} size="small" variant="outlined" />
                    </ListItem>
                    {index < recentActivities.length - 1 && <Divider variant="inset" />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Emergency SOS Button */}
      <Box sx={{ position: "fixed", bottom: 24, right: 24 }}>
        <Button
          variant="contained"
          color="error"
          size="large"
          startIcon={<Warning />}
          onClick={handleEmergencySOS}
          sx={{
            borderRadius: 3,
            px: 3,
            py: 1.5,
            boxShadow: 4,
            transition: "all 0.3s ease",
            "&:hover": { boxShadow: 8, transform: "scale(1.05)" },
          }}
        >
          Emergency SOS
        </Button>
      </Box>

      {/* Add Medication Dialog */}
      <Dialog open={openAddMedDialog} onClose={() => setOpenAddMedDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            Add Medication
            <IconButton onClick={() => setOpenAddMedDialog(false)}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              fullWidth
              label="Medication Name"
              value={newMed.name}
              onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
              required
            />
            <TextField
              fullWidth
              label="Dose"
              placeholder="e.g., 500mg"
              value={newMed.dose}
              onChange={(e) => setNewMed({ ...newMed, dose: e.target.value })}
              required
            />
            <TextField
              fullWidth
              label="Time"
              placeholder="e.g., 8:00 AM"
              value={newMed.time}
              onChange={(e) => setNewMed({ ...newMed, time: e.target.value })}
              required
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddMedDialog(false)}>Cancel</Button>
          <Button variant="contained" startIcon={<Add />} onClick={handleAddMedication}>
            Add Medication
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Event Dialog */}
      <Dialog open={openAddEventDialog} onClose={() => setOpenAddEventDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            Add Event
            <IconButton onClick={() => setOpenAddEventDialog(false)}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              fullWidth
              label="Event Title"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              required
            />
            <TextField
              fullWidth
              label="Date"
              placeholder="e.g., Dec 25, 2025"
              value={newEvent.date}
              onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
              required
            />
            <TextField
              fullWidth
              label="Time"
              placeholder="e.g., 10:00 AM"
              value={newEvent.time}
              onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
              required
            />
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                value={newEvent.type}
                label="Type"
                onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
              >
                <MenuItem value="medical">Medical</MenuItem>
                <MenuItem value="therapy">Therapy</MenuItem>
                <MenuItem value="social">Social</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddEventDialog(false)}>Cancel</Button>
          <Button variant="contained" startIcon={<Add />} onClick={handleAddEvent}>
            Add Event
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Elder Dialog */}
      <Dialog open={openEditElderDialog} onClose={() => setOpenEditElderDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            Edit Elder Information
            <IconButton onClick={() => setOpenEditElderDialog(false)}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              fullWidth
              label="Name"
              value={elderData.name}
              onChange={(e) => setElderData({ ...elderData, name: e.target.value })}
            />
            <TextField
              fullWidth
              label="Age"
              type="number"
              value={elderData.age}
              onChange={(e) => setElderData({ ...elderData, age: parseInt(e.target.value) })}
            />
            <TextField
              fullWidth
              label="Location"
              value={elderData.location}
              onChange={(e) => setElderData({ ...elderData, location: e.target.value })}
            />
            <TextField
              fullWidth
              label="Health Score"
              type="number"
              value={elderData.healthScore}
              onChange={(e) => setElderData({ ...elderData, healthScore: parseInt(e.target.value) })}
              inputProps={{ min: 0, max: 100 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditElderDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleUpdateElder}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
