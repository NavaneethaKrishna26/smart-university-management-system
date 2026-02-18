package com.university.repository;

import com.university.entity.ClassEntity;
import com.university.entity.Faculty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ClassRepository extends JpaRepository<ClassEntity, Long> {
    List<ClassEntity> findByFacultyAndIsActiveTrue(Faculty faculty);
    Optional<ClassEntity> findByClassCode(String classCode);
}
