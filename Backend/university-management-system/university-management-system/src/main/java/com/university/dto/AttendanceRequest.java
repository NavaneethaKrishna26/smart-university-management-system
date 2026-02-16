package com.university.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AttendanceRequest {
    
    @NotNull(message = "Class ID is required")
    private Long classId;
    
    @NotNull(message = "Date is required")
    private LocalDate date;
    
    @NotEmpty(message = "Attendance records are required")
    private List<AttendanceRecordDTO> records;
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AttendanceRecordDTO {
        @NotNull(message = "Student ID is required")
        private Long studentId;
        
        @NotNull(message = "Status is required")
        private String status; // PRESENT, ABSENT, LATE, EXCUSED
        
        private String remarks;
    }
}
