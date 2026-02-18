package com.university.repository;

import com.university.entity.AttendanceRecord;
import com.university.entity.AttendanceSession;
import com.university.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AttendanceRecordRepository extends JpaRepository<AttendanceRecord, Long> {
    List<AttendanceRecord> findByAttendanceSession(AttendanceSession session);
    List<AttendanceRecord> findByStudent(Student student);
    
    @Query("SELECT ar FROM AttendanceRecord ar WHERE ar.student = :student AND ar.attendanceSession.classEntity.id = :classId")
    List<AttendanceRecord> findByStudentAndClassId(@Param("student") Student student, @Param("classId") Long classId);
}
