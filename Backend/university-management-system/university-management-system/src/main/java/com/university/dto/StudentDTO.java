package com.university.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentDTO {
    private Long id;
    private String rollNumber;
    private String fullName;
    private String email;
    private String department;
    private String semester;
    private String phoneNumber;
}
