package com.edutrack.studentmanagement.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edutrack.studentmanagement.entity.Student;
import com.edutrack.studentmanagement.repository.StudentRepository;

@Service
public class StudentService {

    @Autowired
    private StudentRepository repository;

    // ==========================
    // Save Student
    // ==========================
    public Student saveStudent(Student student) {

        if (repository.existsByEmail(student.getEmail())) {
            throw new RuntimeException("Student with this email already exists");
        }

        return repository.save(student);
    }

    // ==========================
    // Get All Students
    // ==========================
    public List<Student> getAllStudents() {
        return repository.findAll();
    }

    // ==========================
    // Get Student By ID
    // ==========================
    public Student getStudentById(int id) {
        return repository.findById(id).orElse(null);
    }

    // ==========================
    // Update Student
    // ==========================
    public Student updateStudent(Student student) {

        if (student.getId() == null) {
            throw new RuntimeException("Student ID is required for update");
        }

        if (repository.existsByEmailAndIdNot(
                student.getEmail(),
                student.getId())) {

            throw new RuntimeException(
                    "Another student is already using this email");
        }

        return repository.save(student);
    }

    // ==========================
    // Delete Student
    // ==========================
    public void deleteStudent(int id) {
        repository.deleteById(id);
    }

    // ==========================
    // Student Count
    // ==========================
    public long getStudentCount() {
        return repository.count();
    }

    // ==========================
    // Student Login
    // ==========================
    public Student login(String email, String password) {

        Optional<Student> student =
                repository.findByEmail(email);

        if (student.isPresent()) {

            Student s = student.get();

            if (s.getPassword() != null &&
                s.getPassword().equals(password)) {

                return s;
            }
        }

        return null;
    }
}