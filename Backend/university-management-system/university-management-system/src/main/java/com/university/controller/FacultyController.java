package com.university.controller;

import com.university.dto.*;
import com.university.service.AttendanceService;
import com.university.service.FacultyService;
import com.university.service.StudentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/faculty")
@CrossOrigin(origins = "*")
public class FacultyController {
    
    @Autowired
    private FacultyService facultyService;
    
    @Autowired
    private StudentService studentService;
    
    @Autowired
    private AttendanceService attendanceService;
    
    @GetMapping("/classes")
    public ResponseEntity<ApiResponse> getMyClasses(Authentication authentication) {
        String username = authentication.getName();
        List<ClassDTO> classes = facultyService.getClassesByFacultyUsername(username);
        return ResponseEntity.ok(new ApiResponse(true, "Classes retrieved successfully", classes));
    }
    
    @GetMapping("/classes/{classId}/students")
    public ResponseEntity<ApiResponse> getStudentsByClass(@PathVariable Long classId) {
        List<StudentDTO> students = studentService.getStudentsByClassId(classId);
        return ResponseEntity.ok(new ApiResponse(true, "Students retrieved successfully", students));
    }
    
    @PostMapping("/attendance")
    public ResponseEntity<ApiResponse> markAttendance(
            @Valid @RequestBody AttendanceRequest request,
            Authentication authentication) {
        String username = authentication.getName();
        AttendanceResponse response = attendanceService.markAttendance(request, username);
        return ResponseEntity.ok(new ApiResponse(true, "Attendance marked successfully", response));
    }
    
    @GetMapping("/attendance")
    public ResponseEntity<ApiResponse> getAttendance(
            @RequestParam Long classId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to) {
        List<AttendanceResponse> attendanceList = attendanceService.getAttendanceByDateRange(classId, from, to);
        return ResponseEntity.ok(new ApiResponse(true, "Attendance retrieved successfully", attendanceList));
    }
}
