package com.university.config;


import com.university.entity.*;
import com.university.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.*;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired private RoleRepository roleRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private FacultyRepository facultyRepository;
    @Autowired private StudentRepository studentRepository;
    @Autowired private ClassRepository classRepository;
    @Autowired private EventRepository eventRepository;
    @Autowired private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {

        Role adminRole = createRoleIfNotExists("ADMIN", "Administrator role");
        Role facultyRole = createRoleIfNotExists("FACULTY", "Faculty role");
        Role studentRole = createRoleIfNotExists("STUDENT", "Student role");

        createAdmin(adminRole);

        List<Faculty> facultyList = createFaculties(facultyRole);
        List<ClassEntity> classList = createClasses(facultyList);

        createStudents(studentRole, classList);
        createEvents();

        System.out.println("Data initialization completed successfully!");
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

    private void createAdmin(Role adminRole) {
        if (!userRepository.existsByUsername("admin")) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setEmail("admin@university.edu");
            admin.setFullName("System Administrator");
            admin.setRole(adminRole);
            admin.setIsActive(true);
            userRepository.save(admin);
        }
    }

    private List<Faculty> createFaculties(Role facultyRole) {

        String[] names = {
                "Dr. John Smith",
                "Dr. Alice Brown",
                "Dr. Michael Lee",
                "Dr. Sarah Wilson",
                "Dr. David Clark"
        };

        String[] departments = {
                "Computer Science",
                "IT",
                "ECE",
                "Mechanical",
                "Civil"
        };

        List<Faculty> facultyList = new ArrayList<>();

        for (int i = 0; i < names.length; i++) {

            String username = "faculty" + (i + 1);
            String empId = "FAC00" + (i + 1);

            int finalI = i;
            User facultyUser = userRepository.findByUsername(username)
                    .orElseGet(() -> {
                        User u = new User();
                        u.setUsername(username);
                        u.setPassword(passwordEncoder.encode("faculty123"));
                        u.setEmail(username + "@university.edu");
                        u.setFullName(names[finalI]);
                        u.setRole(facultyRole);
                        u.setIsActive(true);
                        return userRepository.save(u);
                    });

            int finalI1 = i;
            Faculty faculty = facultyRepository.findByEmployeeId(empId)
                    .orElseGet(() -> {
                        Faculty f = new Faculty();
                        f.setUser(facultyUser);
                        f.setEmployeeId(empId);
                        f.setDepartment(departments[finalI1]);
                        f.setDesignation("Professor");
                        f.setPhoneNumber("900000000" + finalI1);
                        f.setIsActive(true);
                        return facultyRepository.save(f);
                    });

            facultyList.add(faculty);
        }

        return facultyList;
    }

    private List<ClassEntity> createClasses(List<Faculty> facultyList) {

        String[] codes = {
                "CS101", "CS102", "IT201", "ECE301",
                "ME101", "CE202", "CS202", "IT302"
        };

        String[] names = {
                "Data Structures",
                "Algorithms",
                "Database Systems",
                "Digital Electronics",
                "Thermodynamics",
                "Structural Engineering",
                "Operating Systems",
                "Cloud Computing"
        };

        String[] semesters = {"Spring 2026", "Fall 2026", "Winter 2026"};

        List<ClassEntity> classList = new ArrayList<>();

        for (int i = 0; i < codes.length; i++) {

            final int index = i;

            ClassEntity classEntity = classRepository.findByClassCode(codes[index])
                    .orElseGet(() -> {
                        ClassEntity c = new ClassEntity();
                        c.setClassCode(codes[index]);
                        c.setClassName(names[index]);
                        c.setSubject(names[index]);
                        c.setSemester(semesters[index % semesters.length]);
                        c.setDepartment(facultyList.get(index % facultyList.size()).getDepartment());
                        c.setFaculty(facultyList.get(index % facultyList.size()));
                        c.setIsActive(true);
                        return classRepository.save(c);
                    });

            classList.add(classEntity);
        }

        return classList;
    }

    private void createStudents(Role studentRole, List<ClassEntity> classList) {

        long existingStudents = studentRepository.count();
        int target = 100;

        String[] departments = {"Computer Science", "IT", "ECE", "Mechanical", "Civil"};
        String[] semesters = {"Spring 2026", "Fall 2026", "Winter 2026"};

        Random random = new Random();

        for (int i = (int) existingStudents + 1; i <= target; i++) {

            String username = "student" + i;

            if (!userRepository.existsByUsername(username)) {

                User studentUser = new User();
                studentUser.setUsername(username);
                studentUser.setPassword(passwordEncoder.encode("student123"));
                studentUser.setEmail(username + "@university.edu");
                studentUser.setFullName("Student " + i);
                studentUser.setRole(studentRole);
                studentUser.setIsActive(i % 10 != 0);
                studentUser = userRepository.save(studentUser);

                Student student = new Student();
                student.setUser(studentUser);
                student.setRollNumber("STU" + String.format("%03d", i));
                student.setClassEntity(classList.get(random.nextInt(classList.size())));
                student.setDepartment(departments[i % departments.length]);
                student.setSemester(semesters[i % semesters.length]);
                student.setPhoneNumber("98765" + String.format("%05d", i));
                student.setDateOfBirth("2000-01-" + String.format("%02d", (i % 28) + 1));
                student.setAddress("Address " + i);
                student.setIsActive(i % 10 != 0);

                studentRepository.save(student);
            }
        }
    }

    private void createEvents() {

        long existing = eventRepository.count();
        int target = 15;

        for (int i = (int) existing + 1; i <= target; i++) {

            Event event = new Event();
            event.setTitle("Event " + i);
            event.setDescription("Description for event " + i);

            if (i % 3 == 0) {
                event.setEventDate(LocalDate.now().minusDays(i));
            } else {
                event.setEventDate(LocalDate.now().plusDays(i));
            }

            event.setLocation("Location " + i);
            event.setIsActive(i % 5 != 0);

            eventRepository.save(event);
        }
    }
}
