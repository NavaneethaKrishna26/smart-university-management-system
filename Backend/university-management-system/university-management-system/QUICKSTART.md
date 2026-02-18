# Quick Start Guide

## Prerequisites
- JDK 17 installed
- Maven installed
- MySQL installed and running

## Step-by-Step Setup

### 1. Database Setup (5 minutes)

Open MySQL command line or MySQL Workbench and run:

```sql
CREATE DATABASE university_db;
```

That's it! The application will create tables automatically.

### 2. Configure Database Connection (2 minutes)

Open `src/main/resources/application.properties` and update:

```properties
spring.datasource.username=YOUR_MYSQL_USERNAME
spring.datasource.password=YOUR_MYSQL_PASSWORD
```

Default values are:
- Username: `root`
- Password: `root`

### 3. Build and Run (3 minutes)

**Option A: Using Maven**
```bash
cd university-management-system
mvn clean install
mvn spring-boot:run
```

**Option B: Using JAR**
```bash
cd university-management-system
mvn clean package
java -jar target/university-management-system-1.0.0.jar
```

**Option C: Using IDE**
- Open project in IntelliJ IDEA or Eclipse
- Run `UniversityManagementSystemApplication.java`

### 4. Verify Installation

Open browser or Postman and test:
```
http://localhost:8080/api/public/health
```

You should see:
```json
{
  "success": true,
  "message": "University Management System is running"
}
```

## Testing the APIs

### Test 1: Get Events (No Login Required)
```bash
curl http://localhost:8080/api/public/events
```

### Test 2: Login as Faculty
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"faculty1","password":"faculty123"}'
```

Copy the `token` from response.

### Test 3: Get Faculty Classes (Login Required)
```bash
curl http://localhost:8080/api/faculty/classes \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Default Login Credentials

| Role    | Username  | Password    |
|---------|-----------|-------------|
| Admin   | admin     | admin123    |
| Faculty | faculty1  | faculty123  |
| Student | student1  | student123  |
| Student | student2  | student123  |
| Student | student3  | student123  |
| Student | student4  | student123  |
| Student | student5  | student123  |

## Sample Workflow

### For Faculty: Mark Attendance

1. **Login** as faculty1
2. **Get classes** you teach
3. **Get students** in a class
4. **Mark attendance** for today

Example request:
```json
POST /api/faculty/attendance
Authorization: Bearer <your-token>

{
  "classId": 1,
  "date": "2026-02-16",
  "records": [
    {"studentId": 1, "status": "PRESENT"},
    {"studentId": 2, "status": "ABSENT", "remarks": "Medical leave"},
    {"studentId": 3, "status": "PRESENT"},
    {"studentId": 4, "status": "LATE"},
    {"studentId": 5, "status": "PRESENT"}
  ]
}
```

### For Admin: View Reports

1. **Login** as admin
2. **Get attendance report** for a class

```
GET /api/admin/attendance/report?classId=1
Authorization: Bearer <your-token>
```

## Troubleshooting

### Issue: "Access denied for user"
**Solution**: Check MySQL username/password in `application.properties`

### Issue: "Port 8080 already in use"
**Solution**: Change port in `application.properties`:
```properties
server.port=8081
```

### Issue: "Table doesn't exist"
**Solution**: Make sure `spring.jpa.hibernate.ddl-auto=update` in properties

### Issue: "JWT token expired"
**Solution**: Login again to get a new token (valid for 24 hours)

## Next Steps

1. Import `postman_collection.json` into Postman for easy testing
2. Explore all API endpoints in README.md
3. Customize the application for your needs
4. Read full documentation in README.md

## Support

For issues:
1. Check console logs for error messages
2. Verify MySQL is running: `mysql -u root -p`
3. Check application.properties configuration
4. Review README.md for detailed documentation

## Production Deployment

Before deploying to production:
1. Change JWT secret in `application.properties`
2. Use strong passwords for default accounts
3. Update CORS allowed origins
4. Use production database credentials
5. Enable HTTPS

Happy coding! 🚀
