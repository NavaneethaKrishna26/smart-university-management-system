package com.university.repository;

import com.university.entity.ClassEntity;
import com.university.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    List<Student> findByClassEntityAndIsActiveTrue(ClassEntity classEntity);
    Optional<Student> findByRollNumber(String rollNumber);
}
