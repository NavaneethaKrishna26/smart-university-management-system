package com.university.service;

import com.university.dto.AttendanceReportDTO;
import com.university.dto.AttendanceRequest;
import com.university.dto.AttendanceResponse;
import com.university.entity.*;
import com.university.exception.BadRequestException;
import com.university.exception.ResourceNotFoundException;
import com.university.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AttendanceService {
    
    @Autowired
    private AttendanceSessionRepository attendanceSessionRepository;
    
    @Autowired
    private AttendanceRecordRepository attendanceRecordRepository;
    
    @Autowired
    private ClassRepository classRepository;
    
    @Autowired
    private StudentRepository studentRepository;
    
    @Autowired
    private FacultyService facultyService;
    
    @Transactional
    public AttendanceResponse markAttendance(AttendanceRequest request, String facultyUsername) {
        // Get class
        ClassEntity classEntity = classRepository.findById(request.getClassId())
                .orElseThrow(() -> new ResourceNotFoundException("Class", "id", request.getClassId()));
        
        // Get faculty
        Faculty faculty = facultyService.getFacultyByUsername(facultyUsername);
        
        // Verify faculty teaches this class
        if (!classEntity.getFaculty().getId().equals(faculty.getId())) {
            throw new BadRequestException("You are not authorized to mark attendance for this class");
        }
        
        // Check if attendance already exists for this date
        Optional<AttendanceSession> existingSession = attendanceSessionRepository
                .findByClassEntityAndAttendanceDate(classEntity, request.getDate());
        
        if (existingSession.isPresent()) {
            throw new BadRequestException("Attendance already marked for this date. Please update instead.");
        }
        
        // Create attendance session
        AttendanceSession session = new AttendanceSession();
        session.setClassEntity(classEntity);
        session.setFaculty(faculty);
        session.setAttendanceDate(request.getDate());
        session = attendanceSessionRepository.save(session);
        
        // Create attendance records
        List<AttendanceRecord> records = new ArrayList<>();
        for (AttendanceRequest.AttendanceRecordDTO recordDTO : request.getRecords()) {
            Student student = studentRepository.findById(recordDTO.getStudentId())
                    .orElseThrow(() -> new ResourceNotFoundException("Student", "id", recordDTO.getStudentId()));
            
            AttendanceRecord record = new AttendanceRecord();
            record.setAttendanceSession(session);
            record.setStudent(student);
            record.setStatus(AttendanceRecord.AttendanceStatus.valueOf(recordDTO.getStatus().toUpperCase()));
            record.setRemarks(recordDTO.getRemarks());
            
            records.add(record);
        }
        
        attendanceRecordRepository.saveAll(records);
        
        return buildAttendanceResponse(session, records);
    }
    
    public List<AttendanceResponse> getAttendanceByDateRange(Long classId, LocalDate from, LocalDate to) {
        ClassEntity classEntity = classRepository.findById(classId)
                .orElseThrow(() -> new ResourceNotFoundException("Class", "id", classId));
        
        List<AttendanceSession> sessions = attendanceSessionRepository
                .findByClassEntityAndAttendanceDateBetween(classEntity, from, to);
        
        return sessions.stream()
                .map(session -> {
                    List<AttendanceRecord> records = attendanceRecordRepository.findByAttendanceSession(session);
                    return buildAttendanceResponse(session, records);
                })
                .collect(Collectors.toList());
    }
    
    public AttendanceReportDTO generateAttendanceReport(Long classId) {
        ClassEntity classEntity = classRepository.findById(classId)
                .orElseThrow(() -> new ResourceNotFoundException("Class", "id", classId));
        
        List<AttendanceSession> sessions = attendanceSessionRepository.findByClassEntity(classEntity);
        List<Student> students = studentRepository.findByClassEntityAndIsActiveTrue(classEntity);
        
        AttendanceReportDTO report = new AttendanceReportDTO();
        report.setClassId(classEntity.getId());
        report.setClassName(classEntity.getClassName());
        report.setTotalClassesConducted(sessions.size());
        
        List<AttendanceReportDTO.StudentAttendanceReport> studentReports = new ArrayList<>();
        
        for (Student student : students) {
            List<AttendanceRecord> records = attendanceRecordRepository.findByStudentAndClassId(student, classId);
            
            long present = records.stream()
                    .filter(r -> r.getStatus() == AttendanceRecord.AttendanceStatus.PRESENT)
                    .count();
            long absent = records.stream()
                    .filter(r -> r.getStatus() == AttendanceRecord.AttendanceStatus.ABSENT)
                    .count();
            long late = records.stream()
                    .filter(r -> r.getStatus() == AttendanceRecord.AttendanceStatus.LATE)
                    .count();
            long excused = records.stream()
                    .filter(r -> r.getStatus() == AttendanceRecord.AttendanceStatus.EXCUSED)
                    .count();
            
            double percentage = sessions.size() > 0 ? 
                    ((double) (present + late) / sessions.size()) * 100 : 0.0;
            
            AttendanceReportDTO.StudentAttendanceReport studentReport = 
                    new AttendanceReportDTO.StudentAttendanceReport();
            studentReport.setStudentId(student.getId());
            studentReport.setRollNumber(student.getRollNumber());
            studentReport.setStudentName(student.getUser().getFullName());
            studentReport.setTotalPresent((int) present);
            studentReport.setTotalAbsent((int) absent);
            studentReport.setTotalLate((int) late);
            studentReport.setTotalExcused((int) excused);
            studentReport.setAttendancePercentage(Math.round(percentage * 100.0) / 100.0);
            
            studentReports.add(studentReport);
        }
        
        report.setStudentReports(studentReports);
        
        return report;
    }
    
    private AttendanceResponse buildAttendanceResponse(AttendanceSession session, List<AttendanceRecord> records) {
        AttendanceResponse response = new AttendanceResponse();
        response.setSessionId(session.getId());
        response.setClassId(session.getClassEntity().getId());
        response.setClassName(session.getClassEntity().getClassName());
        response.setDate(session.getAttendanceDate());
        response.setFacultyName(session.getFaculty().getUser().getFullName());
        
        List<AttendanceResponse.StudentAttendanceDTO> studentDTOs = records.stream()
                .map(record -> new AttendanceResponse.StudentAttendanceDTO(
                    record.getStudent().getId(),
                    record.getStudent().getRollNumber(),
                    record.getStudent().getUser().getFullName(),
                    record.getStatus().name(),
                    record.getRemarks()
                ))
                .collect(Collectors.toList());
        
        response.setStudents(studentDTOs);
        
        return response;
    }
}
