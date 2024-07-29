package com.leandrorar.schoolSystem.service;

import com.leandrorar.schoolSystem.model.Student;

import java.util.List;

public interface StudentService {
    public Student saveStudent(Student student);

    public List<Student> getAllStudents();


}
