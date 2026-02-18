package com.university.service;

import com.university.dto.ClassDTO;
import com.university.entity.ClassEntity;
import com.university.entity.Faculty;
import com.university.entity.User;
import com.university.exception.ResourceNotFoundException;
import com.university.repository.ClassRepository;
import com.university.repository.FacultyRepository;
import com.university.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FacultyService {
    
    @Autowired
    private FacultyRepository facultyRepository;
    
    @Autowired
    private ClassRepository classRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    public List<ClassDTO> getClassesByFacultyUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));
        
        Faculty faculty = facultyRepository.findByUser(user)
                .orElseThrow(() -> new ResourceNotFoundException("Faculty", "user", username));
        
        List<ClassEntity> classes = classRepository.findByFacultyAndIsActiveTrue(faculty);
        
        return classes.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public Faculty getFacultyByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));
        
        return facultyRepository.findByUser(user)
                .orElseThrow(() -> new ResourceNotFoundException("Faculty", "user", username));
    }
    
    private ClassDTO convertToDTO(ClassEntity classEntity) {
        return new ClassDTO(
            classEntity.getId(),
            classEntity.getClassName(),
            classEntity.getClassCode(),
            classEntity.getSubject(),
            classEntity.getSemester(),
            classEntity.getDepartment(),
            classEntity.getFaculty() != null ? classEntity.getFaculty().getUser().getFullName() : null,
            classEntity.getStudents() != null ? classEntity.getStudents().size() : 0
        );
    }
}
