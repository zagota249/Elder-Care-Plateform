# ElderCare Management Platform

A comprehensive web-based platform designed to support elderly care management, connecting elders, family members, caregivers, volunteers, and administrators in a unified system.

![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-7.x-47A248?logo=mongodb)
![MUI](https://img.shields.io/badge/MUI-v7-007FFF?logo=mui)
![Docker](https://img.shields.io/badge/Docker-Supported-2496ED?logo=docker)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [User Roles](#user-roles)
- [Screenshots](#screenshots)
- [Contributors](#contributors)

## 🎯 Overview

ElderCare is a software engineering project that provides a centralized platform for managing elderly care. The system allows elders to track their medications, appointments, and health metrics while enabling family members and caregivers to monitor and assist remotely. Volunteers can sign up for activities, and administrators have full control over the platform.

## ✨ Features

### For Elders
- 📅 View and manage daily medication schedules
- 🏥 Track medical appointments
- 📊 Monitor health metrics
- 🔔 Receive reminders and notifications

### For Family Members
- 👴 Monitor elder's health and activities
- 💊 View medication adherence
- 📱 Stay connected with caregivers
- 📋 Access health reports

### For Volunteers
- 📝 Register for volunteer activities
- 📆 View upcoming events
- ✅ Track participation history

### For Administrators
- 👥 Manage all user accounts
- 📊 View platform analytics
- ⚙️ System configuration
- 📈 Generate reports

### General Features
- 🔐 Secure authentication (JWT)
- 🔑 Password reset via email
- 📱 Responsive design for all devices
- 🎨 Clean, elderly-friendly UI

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React 18 | UI Framework |
| React Router v6 | Navigation |
| Material UI (MUI) v7 | UI Components |
| Axios | HTTP Client |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime Environment |
| Express 5 | Web Framework |
| MongoDB | Database |
| Mongoose 9 | ODM |
| JWT | Authentication |
| bcryptjs | Password Hashing |

### DevOps
| Technology | Purpose |
|------------|---------|
| Docker | Containerization |
| Docker Compose | Multi-container orchestration |

## 📁 Project Structure

```
project/
├── backend/                 # Node.js Express API
│   ├── controllers/         # Request handlers
│   ├── middleware/          # Auth middleware
│   ├── models/              # Mongoose schemas
│   ├── routes/              # API routes
│   ├── server.js            # Entry point
│   └── Dockerfile
│
├── eldercare/               # React Frontend
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── App.js           # Main app with routes
│   │   ├── homepage.jsx     # Landing page
│   │   ├── signIn.jsx       # Authentication
│   │   ├── signUp.jsx       # Registration
│   │   ├── elder_Dashboard.jsx
│   │   ├── FamilyDashboard.jsx
│   │   ├── VolunteerDashboard.jsx
│   │   ├── AdminDashboard.jsx
│   │   └── ...
│   └── Dockerfile
│
├── docker-compose.yml       # Docker orchestration
└── README.md
```

## 🚀 Installation

### Prerequisites
- Node.js 18.x or higher
- MongoDB 7.x (or Docker)
- npm or yarn

### Option 1: Using Docker (Recommended)

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/eldercare-platform.git
cd eldercare-platform

# Start all services
docker-compose up -d

# Access the application
# Frontend: http://localhost:3000
# Backend:  http://localhost:5000
# MongoDB:  localhost:27017
```

### Option 2: Manual Setup

#### Backend Setup
```bash
cd backend
npm install
npm start
```

#### Frontend Setup
```bash
cd eldercare
npm install
npm start
```

## 🏃 Running the Application

| Service | URL | Port |
|---------|-----|------|
| Frontend | http://localhost:3000 | 3000 |
| Backend API | http://localhost:5000 | 5000 |
| MongoDB | localhost | 27017 |

### Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/eldercare
JWT_SECRET=your_jwt_secret_key
```

## 📚 API Documentation

Full API documentation is available at [API-DOCUMENTATION.md](./API-DOCUMENTATION.md)

### Quick API Reference

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/signup` | POST | Register new user |
| `/api/auth/signin` | POST | User login |
| `/api/auth/forgot-password` | POST | Request password reset |
| `/api/auth/reset-password` | POST | Reset password |
| `/api/family/elders` | GET | Get linked elders |
| `/api/volunteer/activities` | GET | Get activities |
| `/api/admin/users` | GET | Get all users (admin) |

## 👥 User Roles

| Role | Description | Access Level |
|------|-------------|--------------|
| **Elder** | Primary care recipient | Personal dashboard, medications, appointments |
| **Family Member** | Family of elder | Monitor elder's health, view reports |
| **Caregiver** | Professional caregiver | Manage assigned elders |
| **Volunteer** | Community volunteer | Activities, events |
| **Admin** | System administrator | Full platform access |

## 📸 Screenshots

> Add screenshots of your application here

<!-- 
![Homepage](./screenshots/homepage.png)
![Dashboard](./screenshots/dashboard.png)
-->

## 🧪 Testing

```bash
# Run frontend tests
cd eldercare
npm test

# Run backend tests (if configured)
cd backend
npm test
```

## 🤝 Contributors

| Name | Role | GitHub |
|------|------|--------|
| Your Name | Developer | [@yourusername](https://github.com/yourusername) |
| Team Member 2 | Developer | [@username2](https://github.com/username2) |

## 📄 License

This project is developed for academic purposes as part of a Software Engineering course.

---

<p align="center">
  Made with ❤️ for elderly care
</p>
