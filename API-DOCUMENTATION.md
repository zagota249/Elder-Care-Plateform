# 📚 ElderCare API Documentation

<div align="center">

![ElderCare Logo](https://img.shields.io/badge/ElderCare-API%20v1.0-blue?style=for-the-badge&logo=node.js)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

**A comprehensive REST API for Elder Care Management System**

</div>

---

## 📑 Table of Contents

1. [Overview](#-overview)
2. [Getting Started](#-getting-started)
3. [Authentication](#-authentication)
4. [API Endpoints](#-api-endpoints)
   - [Auth Routes](#1-auth-routes-)
   - [Admin Routes](#2-admin-routes-)
   - [Family Routes](#3-family-routes-)
   - [Volunteer Routes](#4-volunteer-caregiver-routes-)
5. [Data Models](#-data-models)
6. [Error Handling](#-error-handling)
7. [Rate Limiting](#-rate-limiting)

---

## 🌟 Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    ELDERCARE API ARCHITECTURE                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   ┌──────────┐     ┌──────────┐     ┌──────────┐               │
│   │  React   │────▶│  Express │────▶│ MongoDB  │               │
│   │ Frontend │◀────│   API    │◀────│ Database │               │
│   └──────────┘     └──────────┘     └──────────┘               │
│        :3000            :5000                                    │
│                                                                  │
│   ┌──────────────────────────────────────────────────────────┐ │
│   │                    API ENDPOINTS                          │ │
│   ├──────────────────────────────────────────────────────────┤ │
│   │  /api/auth      → Authentication (Login, Register)       │ │
│   │  /api/admin     → Admin Dashboard & User Management      │ │
│   │  /api/family    → Family Member Access to Elder Data     │ │
│   │  /api/volunteer → Caregiver Tasks & Activities           │ │
│   └──────────────────────────────────────────────────────────┘ │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Key Features
- 🔐 JWT-based Authentication
- 👥 Role-based Access Control (Elder, Family, Caregiver, Admin)
- 📊 Health Metrics Tracking
- 💊 Medication Management
- 📅 Activity & Event Scheduling
- 🏥 Emergency Contact Management

---

## 🚀 Getting Started

### Base URL
```
Development:  http://localhost:5000/api
Production:   https://your-domain.com/api
```

### Prerequisites
- Node.js v18+
- MongoDB v6+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-repo/eldercare.git

# Navigate to backend
cd eldercare/backend

# Install dependencies
npm install

# Set environment variables
cp .env.example .env

# Start server
npm start
```

### Environment Variables

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/eldercare
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
```

---

## 🔐 Authentication

### How Authentication Works

```
┌─────────────────────────────────────────────────────────────────┐
│                    AUTHENTICATION FLOW                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. USER LOGIN                                                   │
│     ┌────────┐         ┌────────┐         ┌────────┐           │
│     │ Client │──POST──▶│  API   │──Check─▶│   DB   │           │
│     │        │ /signin │        │         │        │           │
│     └────────┘         └────────┘         └────────┘           │
│                              │                                   │
│  2. TOKEN ISSUED             ▼                                   │
│     ┌────────────────────────────────────┐                      │
│     │  { token: "eyJhbGciOiJIUzI..." }   │                      │
│     └────────────────────────────────────┘                      │
│                              │                                   │
│  3. PROTECTED REQUESTS       ▼                                   │
│     ┌────────┐         ┌────────┐                               │
│     │ Client │──GET───▶│  API   │  Header: Authorization        │
│     │        │ /profile│        │  Bearer eyJhbGciOiJIUzI...    │
│     └────────┘         └────────┘                               │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Request Headers

```http
Authorization: Bearer <your-jwt-token>
Content-Type: application/json
```

### User Roles

| Role | Access Level | Description |
|------|--------------|-------------|
| `elder` | Basic | Can view own profile and health data |
| `familyMember` | Limited | Can view assigned elder's data |
| `caregiver` | Standard | Can manage assigned elders, log activities |
| `admin` | Full | Complete system access |

---

## 📡 API Endpoints

---

### 1. Auth Routes 🔑

Base Path: `/api/auth`

```
┌────────────────────────────────────────────────────────────────┐
│                     AUTH ENDPOINTS                              │
├────────────────────────────────────────────────────────────────┤
│  POST   /api/auth/signup           Register new user           │
│  POST   /api/auth/signin           Login user                  │
│  POST   /api/auth/forgot-password  Request password reset      │
│  POST   /api/auth/reset-password   Reset password              │
│  GET    /api/auth/profile          Get current user (🔒)       │
└────────────────────────────────────────────────────────────────┘
```

---

#### 📝 POST `/api/auth/signup`

Register a new user account.

**Request Body:**
```json
{
  "fullName": "Bilal Rafiq",
  "email": "bilal@example.com",
  "password": "securePassword123",
  "role": "elder"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "_id": "65abc123def456",
      "fullName": "Bilal Rafiq",
      "email": "bilal@example.com",
      "role": "elder",
      "createdAt": "2026-01-03T10:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Email already exists"
}
```

---

#### 🔓 POST `/api/auth/signin`

Login with email and password.

**Request Body:**
```json
{
  "email": "bilal@example.com",
  "password": "securePassword123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "_id": "65abc123def456",
      "fullName": "Bilal Rafiq",
      "email": "bilal@example.com",
      "role": "elder"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

#### 📧 POST `/api/auth/forgot-password`

Request a password reset link.

**Request Body:**
```json
{
  "email": "bilal@example.com"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Password reset link sent to email"
}
```

---

#### 🔄 POST `/api/auth/reset-password`

Reset password with token.

**Request Body:**
```json
{
  "token": "reset-token-from-email",
  "newPassword": "newSecurePassword123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Password reset successful"
}
```

---

#### 👤 GET `/api/auth/profile` 🔒

Get current logged-in user's profile.

**Headers:**
```http
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "65abc123def456",
    "fullName": "Bilal Rafiq",
    "email": "bilal@example.com",
    "role": "elder",
    "createdAt": "2026-01-03T10:00:00.000Z"
  }
}
```

---

### 2. Admin Routes 👨‍💼

Base Path: `/api/admin`

**🔒 All routes require Admin role**

```
┌────────────────────────────────────────────────────────────────┐
│                     ADMIN ENDPOINTS                             │
├────────────────────────────────────────────────────────────────┤
│  GET    /api/admin/stats              Dashboard statistics     │
│  GET    /api/admin/system-health      System health status     │
│  GET    /api/admin/users              List all users           │
│  PATCH  /api/admin/users/:id/status   Update user status       │
│  DELETE /api/admin/users/:id          Delete user              │
│  GET    /api/admin/elders             List all elders          │
└────────────────────────────────────────────────────────────────┘
```

---

#### 📊 GET `/api/admin/stats` 🔒

Get dashboard statistics.

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "totalUsers": 150,
    "totalElders": 80,
    "totalCaregivers": 45,
    "totalFamilyMembers": 25,
    "activeUsers": 120,
    "newUsersThisMonth": 15,
    "healthAlertsCount": 5
  }
}
```

---

#### 👥 GET `/api/admin/users` 🔒

Get all users with pagination.

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | number | 1 | Page number |
| `limit` | number | 10 | Items per page |
| `role` | string | - | Filter by role |

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "users": [
      {
        "_id": "65abc123def456",
        "fullName": "Bilal Rafiq",
        "email": "bilal@example.com",
        "role": "elder",
        "status": "active",
        "createdAt": "2026-01-03T10:00:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 15,
      "totalItems": 150
    }
  }
}
```

---

#### ✏️ PATCH `/api/admin/users/:userId/status` 🔒

Update a user's status (active/inactive).

**URL Parameters:**
- `userId` - User's MongoDB ObjectId

**Request Body:**
```json
{
  "status": "inactive"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "User status updated successfully"
}
```

---

#### ❌ DELETE `/api/admin/users/:userId` 🔒

Delete a user from the system.

**URL Parameters:**
- `userId` - User's MongoDB ObjectId

**Success Response (200):**
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

---

### 3. Family Routes 👨‍👩‍👧

Base Path: `/api/family`

**🔒 All routes require authentication**

```
┌────────────────────────────────────────────────────────────────┐
│                    FAMILY ENDPOINTS                             │
├────────────────────────────────────────────────────────────────┤
│  GET    /api/family/elder/:id              Elder details       │
│  GET    /api/family/elder/:id/dashboard    Elder dashboard     │
│  GET    /api/family/elder/:id/health       Health metrics      │
│  GET    /api/family/elder/:id/medications  Medications list    │
│  GET    /api/family/elder/:id/activities   Activities list     │
│  GET    /api/family/elder/:id/events       Events list         │
│  POST   /api/family/elder/:id/events       Create event        │
└────────────────────────────────────────────────────────────────┘
```

---

#### 👴 GET `/api/family/elder/:elderId` 🔒

Get elder's complete details.

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "65elder123",
    "fullName": "Ahmed Khan",
    "age": 72,
    "gender": "male",
    "address": {
      "street": "123 Main St",
      "city": "Lahore",
      "state": "Punjab"
    },
    "emergencyContacts": [
      {
        "name": "Ali Khan",
        "relationship": "Son",
        "phone": "+92-300-1234567"
      }
    ],
    "medicalInfo": {
      "bloodType": "O+",
      "allergies": ["Penicillin"],
      "conditions": ["Diabetes", "Hypertension"]
    },
    "healthScore": 85,
    "status": "active"
  }
}
```

---

#### 💓 GET `/api/family/elder/:elderId/health` 🔒

Get elder's health metrics.

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `type` | string | - | Filter by metric type |
| `startDate` | date | - | Start date for range |
| `endDate` | date | - | End date for range |

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "65health123",
      "type": "heartRate",
      "value": 72,
      "unit": "bpm",
      "status": "normal",
      "recordedAt": "2026-01-03T10:00:00.000Z"
    },
    {
      "_id": "65health124",
      "type": "bloodPressure",
      "value": { "systolic": 120, "diastolic": 80 },
      "unit": "mmHg",
      "status": "normal",
      "recordedAt": "2026-01-03T10:00:00.000Z"
    }
  ]
}
```

---

#### 💊 GET `/api/family/elder/:elderId/medications` 🔒

Get elder's medication schedule.

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "65med123",
      "name": "Metformin",
      "dosage": "500mg",
      "frequency": "twice daily",
      "times": ["08:00", "20:00"],
      "startDate": "2025-06-01",
      "endDate": null,
      "notes": "Take with meals"
    }
  ]
}
```

---

### 4. Volunteer (Caregiver) Routes 🏥

Base Path: `/api/volunteer`

**🔒 All routes require Caregiver role**

```
┌────────────────────────────────────────────────────────────────┐
│                   VOLUNTEER ENDPOINTS                           │
├────────────────────────────────────────────────────────────────┤
│  GET    /api/volunteer/elders              Assigned elders     │
│  GET    /api/volunteer/tasks/today         Today's tasks       │
│  GET    /api/volunteer/stats               Volunteer stats     │
│  POST   /api/volunteer/activity            Log activity        │
│  PATCH  /api/volunteer/availability        Update availability │
│  PATCH  /api/volunteer/tasks/:type/:id/complete  Complete task │
└────────────────────────────────────────────────────────────────┘
```

---

#### 👥 GET `/api/volunteer/elders` 🔒

Get list of elders assigned to the caregiver.

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "65elder123",
      "fullName": "Ahmed Khan",
      "age": 72,
      "healthScore": 85,
      "status": "active",
      "lastVisit": "2026-01-02T14:00:00.000Z"
    }
  ]
}
```

---

#### 📋 GET `/api/volunteer/tasks/today` 🔒

Get today's scheduled tasks.

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "medications": [
      {
        "_id": "65task123",
        "elderName": "Ahmed Khan",
        "task": "Give Metformin 500mg",
        "time": "08:00",
        "completed": false
      }
    ],
    "activities": [
      {
        "_id": "65act123",
        "elderName": "Ahmed Khan",
        "task": "Morning walk",
        "time": "07:00",
        "completed": true
      }
    ],
    "appointments": [
      {
        "_id": "65apt123",
        "elderName": "Ahmed Khan",
        "task": "Doctor visit",
        "time": "15:00",
        "location": "City Hospital"
      }
    ]
  }
}
```

---

#### ✅ PATCH `/api/volunteer/tasks/:taskType/:taskId/complete` 🔒

Mark a task as completed.

**URL Parameters:**
- `taskType` - Type of task (medication/activity/appointment)
- `taskId` - Task's MongoDB ObjectId

**Request Body:**
```json
{
  "notes": "Completed successfully",
  "completedAt": "2026-01-03T08:05:00.000Z"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Task marked as completed"
}
```

---

#### 📝 POST `/api/volunteer/activity` 🔒

Log a new activity for an elder.

**Request Body:**
```json
{
  "elderId": "65elder123",
  "type": "exercise",
  "description": "30 minutes morning walk",
  "duration": 30,
  "notes": "Elder was energetic today"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Activity logged successfully",
  "data": {
    "_id": "65activity456",
    "elderId": "65elder123",
    "type": "exercise",
    "description": "30 minutes morning walk",
    "createdAt": "2026-01-03T07:30:00.000Z"
  }
}
```

---

## 📊 Data Models

### User Model

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER SCHEMA                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  {                                                               │
│    _id:              ObjectId        (auto-generated)           │
│    fullName:         String          (required)                 │
│    email:            String          (required, unique)         │
│    password:         String          (required, hashed)         │
│    role:             Enum            [elder, caregiver,         │
│                                       familyMember, admin]      │
│    resetToken:       String          (for password reset)       │
│    resetTokenExpiry: Date                                       │
│    createdAt:        Date            (auto)                     │
│    updatedAt:        Date            (auto)                     │
│  }                                                               │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Elder Model

```
┌─────────────────────────────────────────────────────────────────┐
│                        ELDER SCHEMA                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  {                                                               │
│    _id:               ObjectId                                  │
│    userId:            ObjectId (ref: User)                      │
│    fullName:          String                                    │
│    age:               Number                                    │
│    dateOfBirth:       Date                                      │
│    gender:            Enum [male, female, other]                │
│    address: {                                                   │
│      street:          String                                    │
│      city:            String                                    │
│      state:           String                                    │
│      zipCode:         String                                    │
│    }                                                            │
│    emergencyContacts: [{                                        │
│      name:            String                                    │
│      relationship:    String                                    │
│      phone:           String                                    │
│      email:           String                                    │
│    }]                                                           │
│    medicalInfo: {                                               │
│      bloodType:       String                                    │
│      allergies:       [String]                                  │
│      conditions:      [String]                                  │
│      primaryDoctor:   { name, phone, hospital }                 │
│    }                                                            │
│    healthScore:       Number (0-100)                            │
│    status:            Enum [active, inactive, emergency]        │
│  }                                                               │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Health Metric Model

```
┌─────────────────────────────────────────────────────────────────┐
│                    HEALTH METRIC SCHEMA                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  {                                                               │
│    _id:         ObjectId                                        │
│    elderId:     ObjectId (ref: Elder)                           │
│    type:        Enum [heartRate, bloodPressure, steps,          │
│                       sleep, weight, glucose]                   │
│    value:       Mixed (Number or Object)                        │
│    unit:        String (bpm, mmHg, steps, hours, kg, mg/dL)     │
│    status:      Enum [normal, low, high, critical]              │
│    recordedAt:  Date                                            │
│    notes:       String                                          │
│  }                                                               │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## ⚠️ Error Handling

### Standard Error Response

```json
{
  "success": false,
  "message": "Error description",
  "error": {
    "code": "ERROR_CODE",
    "details": "Additional details if available"
  }
}
```

### HTTP Status Codes

| Code | Meaning | When Used |
|------|---------|-----------|
| `200` | OK | Successful GET, PATCH |
| `201` | Created | Successful POST |
| `400` | Bad Request | Invalid input data |
| `401` | Unauthorized | Missing/invalid token |
| `403` | Forbidden | Insufficient permissions |
| `404` | Not Found | Resource doesn't exist |
| `409` | Conflict | Duplicate resource |
| `500` | Server Error | Internal server error |

---

## 🔒 Rate Limiting

```
┌─────────────────────────────────────────────────────────────────┐
│                      RATE LIMITS                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   Endpoint Type        │  Limit          │  Window              │
│  ─────────────────────────────────────────────────────────────  │
│   Authentication       │  5 requests     │  15 minutes          │
│   General API          │  100 requests   │  15 minutes          │
│   Admin Operations     │  50 requests    │  15 minutes          │
│                                                                  │
│   Response when exceeded:                                        │
│   {                                                              │
│     "success": false,                                            │
│     "message": "Too many requests, please try again later"       │
│   }                                                              │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 👥 Project Team

| Name | Roll Number | Role |
|------|-------------|------|
| Bilal Rafiq | 24-CS-458 | Full Stack Developer |
| Talha Tariq | 24-CS-363 | Frontend Developer |
| Zee Waqar | 24-CS-464 | Backend Developer |
| Muhammad Zain bin Zafar | 24-CS-486 | Backend Developer |

---

## 📞 Support

For API support, contact: `eldercare.support@example.com`

---

<div align="center">

**Built with ❤️ by ElderCare Team**

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

</div>
