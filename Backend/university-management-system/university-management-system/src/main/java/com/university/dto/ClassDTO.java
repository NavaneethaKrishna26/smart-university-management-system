package com.university.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClassDTO {
    private Long id;
    private String className;
    private String classCode;
    private String subject;
    private String semester;
    private String department;
    private String facultyName;
    private Integer studentCount;
}
