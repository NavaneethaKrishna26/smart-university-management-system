package com.university.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AttendanceResponse {
    private Long sessionId;
    private Long classId;
    private String className;
    private LocalDate date;
    private String facultyName;
    private List<StudentAttendanceDTO> students;
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class StudentAttendanceDTO {
        private Long studentId;
        private String rollNumber;
        private String studentName;
        private String status;
        private String remarks;
    }
}
