package com.university.controller;

import com.university.dto.ApiResponse;
import com.university.dto.AttendanceReportDTO;
import com.university.service.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {
    
    @Autowired
    private AttendanceService attendanceService;
    
    @GetMapping("/attendance/report")
    public ResponseEntity<ApiResponse> getAttendanceReport(@RequestParam Long classId) {
        AttendanceReportDTO report = attendanceService.generateAttendanceReport(classId);
        return ResponseEntity.ok(new ApiResponse(true, "Attendance report generated successfully", report));
    }
}
