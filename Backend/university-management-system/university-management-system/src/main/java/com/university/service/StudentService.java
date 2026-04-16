package com.university.service;

import com.university.dto.StudentDTO;
import com.university.entity.ClassEntity;
import com.university.entity.Student;
import com.university.exception.ResourceNotFoundException;
import com.university.repository.ClassRepository;
import com.university.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class StudentService {
    
    @Autowired
    private StudentRepository studentRepository;
    
    @Autowired
    private ClassRepository classRepository;
    
    public List<StudentDTO> getStudentsByClassId(Long classId) {
        ClassEntity classEntity = classRepository.findById(classId)
                .orElseThrow(() -> new ResourceNotFoundException("Class", "id", classId));
        
        List<Student> students = studentRepository.findByClassEntityAndIsActiveTrue(classEntity);
        
        return students.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    private StudentDTO convertToDTO(Student student) {
        return new StudentDTO(
            student.getId(),
            student.getRollNumber(),
            student.getUser().getFullName(),
            student.getUser().getEmail(),
            student.getDepartment(),
            student.getSemester(),
            student.getPhoneNumber()
        );
    }
}
