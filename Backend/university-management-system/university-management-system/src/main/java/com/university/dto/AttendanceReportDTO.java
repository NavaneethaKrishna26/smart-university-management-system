package com.university.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AttendanceReportDTO {
    private Long classId;
    private String className;
    private Integer totalClassesConducted;
    private List<StudentAttendanceReport> studentReports;
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class StudentAttendanceReport {
        private Long studentId;
        private String rollNumber;
        private String studentName;
        private Integer totalPresent;
        private Integer totalAbsent;
        private Integer totalLate;
        private Integer totalExcused;
        private Double attendancePercentage;
    }
}
