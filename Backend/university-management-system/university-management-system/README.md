# University Management System - Backend

A comprehensive Spring Boot backend application for University Management with Homepage and Attendance Management modules.

## Features

### Module 1: Homepage
- Public access without authentication
- Display upcoming events and news
- RESTful API endpoints

### Module 2: Attendance Management System
- JWT-based authentication
- Role-based access control (FACULTY, ADMIN, STUDENT)
- Faculty can mark and view attendance
- Admin can generate attendance reports
- Prevents duplicate attendance entries

## Technology Stack

- **Java**: 17
- **Spring Boot**: 3.2.2
- **Database**: MySQL 8.0
- **Security**: Spring Security + JWT
- **Build Tool**: Maven
- **ORM**: Spring Data JPA / Hibernate

## Prerequisites

- JDK 17 or higher
- Maven 3.6+
- MySQL 8.0+
- IDE (IntelliJ IDEA, Eclipse, or VS Code)

## Database Setup

1. Install MySQL and create database:
```sql
CREATE DATABASE university_db;
```

2. Update `application.properties` with your MySQL credentials:
```properties
spring.datasource.username=your_username
spring.datasource.password=your_password
```

## Installation & Running

1. **Clone or extract the project**

2. **Navigate to project directory**:
```bash
cd university-management-system
```

3. **Build the project**:
```bash
mvn clean install
```

4. **Run the application**:
```bash
mvn spring-boot:run
```

Or run directly:
```bash
java -jar target/university-management-system-1.0.0.jar
```

The application will start on `http://localhost:8080/api`

## Default Credentials

The application automatically creates sample data on first run:

### Admin
- Username: `admin`
- Password: `admin123`

### Faculty
- Username: `faculty1`
- Password: `faculty123`

### Students
- Username: `student1` to `student5`
- Password: `student123`

## API Endpoints

### Public Endpoints (No Authentication)

#### Health Check
```
GET /api/public/health
```

#### Get Upcoming Events
```
GET /api/public/events
```
Response:
```json
[
  {
    "id": 1,
    "title": "Tech Symposium 2026",
    "description": "Annual technical fest",
    "eventDate": "2026-03-10",
    "location": "Main Auditorium"
  }
]
```

### Authentication Endpoints

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "username": "faculty1",
  "password": "faculty123"
}
```

Response:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiJ9...",
    "role": "FACULTY",
    "username": "faculty1",
    "fullName": "Dr. John Smith"
  }
}
```

### Faculty Endpoints (Requires FACULTY role)

All faculty endpoints require JWT token in Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

#### Get My Classes
```
GET /api/faculty/classes
```

Response:
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

#### Get Students in Class
```
GET /api/faculty/classes/{classId}/students
```

#### Mark Attendance
```
POST /api/faculty/attendance
Content-Type: application/json

{
  "classId": 1,
  "date": "2026-02-15",
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
    }
  ]
}
```

Status values: `PRESENT`, `ABSENT`, `LATE`, `EXCUSED`

#### View Attendance by Date Range
```
GET /api/faculty/attendance?classId=1&from=2026-02-01&to=2026-02-15
```

### Admin Endpoints (Requires ADMIN role)

#### Generate Attendance Report
```
GET /api/admin/attendance/report?classId=1
```

Response:
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
      }
    ]
  }
}
```

## Database Schema

The application uses the following main tables:
- `roles` - User roles (ADMIN, FACULTY, STUDENT)
- `users` - User accounts
- `faculty` - Faculty profiles
- `students` - Student profiles
- `classes` - Class/Course information
- `events` - University events
- `attendance_sessions` - Attendance tracking sessions
- `attendance_records` - Individual attendance records

## Project Structure

```
src/main/java/com/university/
├── config/              # Configuration classes
│   ├── SecurityConfig.java
│   ├── CorsConfig.java
│   └── DataInitializer.java
├── controller/          # REST Controllers
│   ├── AuthController.java
│   ├── PublicController.java
│   ├── FacultyController.java
│   └── AdminController.java
├── dto/                 # Data Transfer Objects
├── entity/              # JPA Entities
├── repository/          # JPA Repositories
├── service/             # Business Logic
├── security/            # Security & JWT
└── exception/           # Exception Handling
```

## Security Features

- JWT-based authentication
- Password encryption using BCrypt
- Role-based access control
- CORS configuration for frontend integration
- Stateless session management

## Testing with Postman

1. Import the provided Postman collection (if available)
2. Login to get JWT token
3. Set the token in Authorization header for protected endpoints
4. Test all endpoints

## Common Issues & Solutions

### Database Connection Error
- Verify MySQL is running
- Check database credentials in `application.properties`
- Ensure database `university_db` exists

### JWT Token Errors
- Token expires after 24 hours (configurable)
- Always include "Bearer " prefix in Authorization header
- Get new token if expired

### Port Already in Use
- Change port in `application.properties`: `server.port=8081`

## Development

To run in development mode with auto-restart:
```bash
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

## Production Deployment

1. Update `application.properties` for production database
2. Change JWT secret key
3. Build production JAR:
```bash
mvn clean package -DskipTests
```

4. Run:
```bash
java -jar target/university-management-system-1.0.0.jar
```

## Contributing

1. Create feature branch
2. Make changes
3. Test thoroughly
4. Submit pull request

## License

This project is licensed under the MIT License.

## Support

For issues and questions:
- Create GitHub issue
- Email: support@university.edu

## Version History

- **v1.0.0** (Feb 2026) - Initial release
  - Homepage module
  - Attendance management module
  - JWT authentication
  - Role-based access control
