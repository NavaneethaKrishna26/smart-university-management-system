package com.university.repository;

import com.university.entity.AttendanceSession;
import com.university.entity.ClassEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface AttendanceSessionRepository extends JpaRepository<AttendanceSession, Long> {
    Optional<AttendanceSession> findByClassEntityAndAttendanceDate(ClassEntity classEntity, LocalDate date);
    List<AttendanceSession> findByClassEntityAndAttendanceDateBetween(ClassEntity classEntity, LocalDate startDate, LocalDate endDate);
    List<AttendanceSession> findByClassEntity(ClassEntity classEntity);
}
