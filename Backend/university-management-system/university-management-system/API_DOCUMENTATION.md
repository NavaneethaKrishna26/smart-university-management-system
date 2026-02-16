# API Documentation

## Base URL
```
http://localhost:8080/api
```

## Authentication

Most endpoints require JWT authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

---

## 1. Public APIs

### 1.1 Health Check
**Endpoint:** `GET /public/health`  
**Authentication:** Not required  
**Description:** Check if the API is running

**Response:**
```json
{
  "success": true,
  "message": "University Management System is running"
}
```

### 1.2 Get Upcoming Events
**Endpoint:** `GET /public/events`  
**Authentication:** Not required  
**Description:** Get all upcoming events (from today onwards)

**Response:**
```json
[
  {
    "id": 1,
    "title": "Tech Symposium 2026",
    "description": "Annual technical fest showcasing student projects",
    "eventDate": "2026-03-10",
    "location": "Main Auditorium"
  },
  {
    "id": 2,
    "title": "Career Fair 2026",
    "description": "Meet top recruiters",
    "eventDate": "2026-03-25",
    "location": "University Grounds"
  }
]
```

### 1.3 Get All Active Events
**Endpoint:** `GET /public/events/all`  
**Authentication:** Not required  
**Description:** Get all active events (including past events)

**Response:** Same as above

---

## 2. Authentication APIs

### 2.1 Login
**Endpoint:** `POST /auth/login`  
**Authentication:** Not required  
**Description:** Login to get JWT token

**Request Body:**
```json
{
  "username": "faculty1",
  "password": "faculty123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmYWN1bHR5MSIsInJvbGUiOiJGQUNVTFRZIiwiaWF0IjoxNzA4MDg5NjAwLCJleHAiOjE3MDgxNzYwMDB9.xxx",
    "role": "FACULTY",
    "username": "faculty1",
    "fullName": "Dr. John Smith"
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Invalid username or password"
}
```

**Validation Error (400):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "username": "Username is required",
    "password": "Password is required"
  }
}
```

---

## 3. Faculty APIs

### 3.1 Get My Classes
**Endpoint:** `GET /faculty/classes`  
**Authentication:** Required (FACULTY role)  
**Description:** Get all classes assigned to the logged-in faculty

**Request Headers:**
```
Authorization: Bearer <jwt-token>
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Classes retrieved successfully",
  "data": [
    {
      "id": 1,
      "className": "Data Structures",
      "classCode": "CS101",
      "subject": "Computer Science",
      "semester": "Spring 2026",
      "department": "Computer Science",
      "facultyName": "Dr. John Smith",
      "studentCount": 5
    }
  ]
}
```

**Error Response (403):**
```json
{
  "success": false,
  "message": "Access denied"
}
```

### 3.2 Get Students in Class
**Endpoint:** `GET /faculty/classes/{classId}/students`  
**Authentication:** Required (FACULTY role)  
**Description:** Get all students enrolled in a specific class

**Path Parameters:**
- `classId` (Long) - ID of the class

**Success Response (200):**
```json
{
  "success": true,
  "message": "Students retrieved successfully",
  "data": [
    {
      "id": 1,
      "rollNumber": "STU001",
      "fullName": "Student 1",
      "email": "student1@university.edu",
      "department": "Computer Science",
      "semester": "Spring 2026",
      "phoneNumber": "9876543211"
    },
    {
      "id": 2,
      "rollNumber": "STU002",
      "fullName": "Student 2",
      "email": "student2@university.edu",
      "department": "Computer Science",
      "semester": "Spring 2026",
      "phoneNumber": "9876543212"
    }
  ]
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Class not found with id : '999'"
}
```

### 3.3 Mark Attendance
**Endpoint:** `POST /faculty/attendance`  
**Authentication:** Required (FACULTY role)  
**Description:** Mark attendance for students in a class

**Request Body:**
```json
{
  "classId": 1,
  "date": "2026-02-16",
  "records": [
    {
      "studentId": 1,
      "status": "PRESENT",
      "remarks": ""
    },
    {
      "studentId": 2,
      "status": "ABSENT",
      "remarks": "Medical leave"
    },
    {
      "studentId": 3,
      "status": "PRESENT",
      "remarks": ""
    },
    {
      "studentId": 4,
      "status": "LATE",
      "remarks": "Arrived 10 minutes late"
    },
    {
      "studentId": 5,
      "status": "EXCUSED",
      "remarks": "Attending conference"
    }
  ]
}
```

**Status Values:**
- `PRESENT` - Student is present
- `ABSENT` - Student is absent
- `LATE` - Student arrived late
- `EXCUSED` - Absent with valid reason

**Success Response (200):**
```json
{
  "success": true,
  "message": "Attendance marked successfully",
  "data": {
    "sessionId": 1,
    "classId": 1,
    "className": "Data Structures",
    "date": "2026-02-16",
    "facultyName": "Dr. John Smith",
    "students": [
      {
        "studentId": 1,
        "rollNumber": "STU001",
        "studentName": "Student 1",
        "status": "PRESENT",
        "remarks": ""
      },
      {
        "studentId": 2,
        "rollNumber": "STU002",
        "studentName": "Student 2",
        "status": "ABSENT",
        "remarks": "Medical leave"
      }
    ]
  }
}
```

**Error Response (400) - Duplicate Attendance:**
```json
{
  "success": false,
  "message": "Attendance already marked for this date. Please update instead."
}
```

**Error Response (400) - Unauthorized:**
```json
{
  "success": false,
  "message": "You are not authorized to mark attendance for this class"
}
```

**Validation Error (400):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "classId": "Class ID is required",
    "date": "Date is required",
    "records": "Attendance records are required"
  }
}
```

### 3.4 Get Attendance by Date Range
**Endpoint:** `GET /faculty/attendance`  
**Authentication:** Required (FACULTY role)  
**Description:** Get attendance records for a class within a date range

**Query Parameters:**
- `classId` (Long, required) - ID of the class
- `from` (Date, required) - Start date (format: YYYY-MM-DD)
- `to` (Date, required) - End date (format: YYYY-MM-DD)

**Example Request:**
```
GET /faculty/attendance?classId=1&from=2026-02-01&to=2026-02-28
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Attendance retrieved successfully",
  "data": [
    {
      "sessionId": 1,
      "classId": 1,
      "className": "Data Structures",
      "date": "2026-02-16",
      "facultyName": "Dr. John Smith",
      "students": [
        {
          "studentId": 1,
          "rollNumber": "STU001",
          "studentName": "Student 1",
          "status": "PRESENT",
          "remarks": ""
        }
      ]
    }
  ]
}
```

---

## 4. Admin APIs

### 4.1 Generate Attendance Report
**Endpoint:** `GET /admin/attendance/report`  
**Authentication:** Required (ADMIN role)  
**Description:** Generate comprehensive attendance report for a class

**Query Parameters:**
- `classId` (Long, required) - ID of the class

**Example Request:**
```
GET /admin/attendance/report?classId=1
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Attendance report generated successfully",
  "data": {
    "classId": 1,
    "className": "Data Structures",
    "totalClassesConducted": 10,
    "studentReports": [
      {
        "studentId": 1,
        "rollNumber": "STU001",
        "studentName": "Student 1",
        "totalPresent": 8,
        "totalAbsent": 2,
        "totalLate": 0,
        "totalExcused": 0,
        "attendancePercentage": 80.0
      },
      {
        "studentId": 2,
        "rollNumber": "STU002",
        "studentName": "Student 2",
        "totalPresent": 7,
        "totalAbsent": 2,
        "totalLate": 1,
        "totalExcused": 0,
        "attendancePercentage": 80.0
      }
    ]
  }
}
```

**Notes:**
- `attendancePercentage` includes PRESENT and LATE statuses
- Formula: `((totalPresent + totalLate) / totalClassesConducted) * 100`

---

## Error Responses

### 400 Bad Request
Invalid request data or validation errors

### 401 Unauthorized
Missing or invalid JWT token

### 403 Forbidden
User doesn't have permission to access the resource

### 404 Not Found
Requested resource doesn't exist

### 500 Internal Server Error
Server error occurred

---

## Testing with cURL

### Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"faculty1","password":"faculty123"}'
```

### Get Classes (Replace TOKEN)
```bash
curl http://localhost:8080/api/faculty/classes \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Mark Attendance
```bash
curl -X POST http://localhost:8080/api/faculty/attendance \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "classId": 1,
    "date": "2026-02-16",
    "records": [
      {"studentId": 1, "status": "PRESENT"},
      {"studentId": 2, "status": "ABSENT"}
    ]
  }'
```

---

## Rate Limiting

Currently no rate limiting is implemented. For production:
- Implement rate limiting per user/IP
- Add request throttling
- Use API gateway for better control

---

## API Versioning

Current version: v1 (implicit)  
Future versions can be added as: `/api/v2/...`

---

## CORS

Allowed origins (configurable in application.properties):
- `http://localhost:3000` (React default)
- `http://localhost:5173` (Vite default)

Add more origins as needed for your frontend.
