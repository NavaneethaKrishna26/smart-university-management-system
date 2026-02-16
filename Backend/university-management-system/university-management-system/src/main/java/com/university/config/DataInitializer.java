package com.university.config;

import com.university.entity.*;
import com.university.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import java.time.LocalDate;
import java.util.Optional;

@Component
public class DataInitializer implements CommandLineRunner {
    
    @Autowired
    private RoleRepository roleRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private FacultyRepository facultyRepository;
    
    @Autowired
    private StudentRepository studentRepository;
    
    @Autowired
    private ClassRepository classRepository;
    
    @Autowired
    private EventRepository eventRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Override
    public void run(String... args) throws Exception {
        // Create Roles
        Role adminRole = createRoleIfNotExists("ADMIN", "Administrator role");
        Role facultyRole = createRoleIfNotExists("FACULTY", "Faculty role");
        Role studentRole = createRoleIfNotExists("STUDENT", "Student role");
        
        // Create Admin User
        if (!userRepository.existsByUsername("admin")) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setEmail("admin@university.edu");
            admin.setFullName("System Administrator");
            admin.setRole(adminRole);
            admin.setIsActive(true);
            userRepository.save(admin);
            System.out.println("Admin user created: username=admin, password=admin123");
        }
        
        // Create Faculty User
        User facultyUser = null;
        if (!userRepository.existsByUsername("faculty1")) {
            facultyUser = new User();
            facultyUser.setUsername("faculty1");
            facultyUser.setPassword(passwordEncoder.encode("faculty123"));
            facultyUser.setEmail("faculty1@university.edu");
            facultyUser.setFullName("Dr. John Smith");
            facultyUser.setRole(facultyRole);
            facultyUser.setIsActive(true);
            facultyUser = userRepository.save(facultyUser);
            System.out.println("Faculty user created: username=faculty1, password=faculty123");
        } else {
            facultyUser = userRepository.findByUsername("faculty1").get();
        }
        
        // Create Faculty Profile
        Faculty faculty = null;
        Optional<Faculty> existingFaculty = facultyRepository.findByEmployeeId("FAC001");
        if (!existingFaculty.isPresent()) {
            faculty = new Faculty();
            faculty.setUser(facultyUser);
            faculty.setEmployeeId("FAC001");
            faculty.setDepartment("Computer Science");
            faculty.setDesignation("Professor");
            faculty.setPhoneNumber("1234567890");
            faculty.setIsActive(true);
            faculty = facultyRepository.save(faculty);
        } else {
            faculty = existingFaculty.get();
        }
        
        // Create Class
        ClassEntity classEntity = null;
        Optional<ClassEntity> existingClass = classRepository.findByClassCode("CS101");
        if (!existingClass.isPresent()) {
            classEntity = new ClassEntity();
            classEntity.setClassName("Data Structures");
            classEntity.setClassCode("CS101");
            classEntity.setSubject("Computer Science");
            classEntity.setSemester("Spring 2026");
            classEntity.setDepartment("Computer Science");
            classEntity.setFaculty(faculty);
            classEntity.setIsActive(true);
            classEntity = classRepository.save(classEntity);
        } else {
            classEntity = existingClass.get();
        }
        
        // Create Student Users and Profiles
        for (int i = 1; i <= 5; i++) {
            String username = "student" + i;
            if (!userRepository.existsByUsername(username)) {
                User studentUser = new User();
                studentUser.setUsername(username);
                studentUser.setPassword(passwordEncoder.encode("student123"));
                studentUser.setEmail(username + "@university.edu");
                studentUser.setFullName("Student " + i);
                studentUser.setRole(studentRole);
                studentUser.setIsActive(true);
                studentUser = userRepository.save(studentUser);
                
                Student student = new Student();
                student.setUser(studentUser);
                student.setRollNumber("STU00" + i);
                student.setClassEntity(classEntity);
                student.setDepartment("Computer Science");
                student.setSemester("Spring 2026");
                student.setPhoneNumber("987654321" + i);
                student.setDateOfBirth("2000-01-0" + i);
                student.setAddress("Address " + i);
                student.setIsActive(true);
                studentRepository.save(student);
                
                System.out.println("Student user created: username=" + username + ", password=student123");
            }
        }
        
        // Create Events
        if (eventRepository.count() == 0) {
            Event event1 = new Event();
            event1.setTitle("Tech Symposium 2026");
            event1.setDescription("Annual technical fest showcasing student projects and innovations");
            event1.setEventDate(LocalDate.of(2026, 3, 10));
            event1.setLocation("Main Auditorium");
            event1.setIsActive(true);
            eventRepository.save(event1);
            
            Event event2 = new Event();
            event2.setTitle("Career Fair 2026");
            event2.setDescription("Meet top recruiters and explore career opportunities");
            event2.setEventDate(LocalDate.of(2026, 3, 25));
            event2.setLocation("University Grounds");
            event2.setIsActive(true);
            eventRepository.save(event2);
            
            Event event3 = new Event();
            event3.setTitle("Sports Day");
            event3.setDescription("Annual inter-department sports competition");
            event3.setEventDate(LocalDate.of(2026, 4, 5));
            event3.setLocation("Sports Complex");
            event3.setIsActive(true);
            eventRepository.save(event3);
            
            System.out.println("Sample events created");
        }
        
        System.out.println("Data initialization completed!");
    }
    
    private Role createRoleIfNotExists(String name, String description) {
        return roleRepository.findByName(name)
                .orElseGet(() -> {
                    Role role = new Role();
                    role.setName(name);
                    role.setDescription(description);
                    return roleRepository.save(role);
                });
    }
}
