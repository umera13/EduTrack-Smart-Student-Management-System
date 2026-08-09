package com.edutrack.studentmanagement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import com.edutrack.studentmanagement.entity.Student;
import com.edutrack.studentmanagement.service.StudentService;

@RestController
@RequestMapping("/students")
@CrossOrigin("*")
public class StudentController {

    @Autowired
    private StudentService service;

    // ==========================
    // Save Student
    // ==========================
    @PostMapping("/save")
    public ResponseEntity<?> saveStudent(
            @Valid @RequestBody Student student) {

        try {

            Student savedStudent = service.saveStudent(student);

            return ResponseEntity.ok(savedStudent);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(e.getMessage());
        }
    }

    // ==========================
    // Get All Students
    // ==========================
    @GetMapping
    public List<Student> getAllStudents() {
        return service.getAllStudents();
    }

    // ==========================
    // Get Student By ID
    // ==========================
    @GetMapping("/{id}")
    public Student getStudentById(@PathVariable int id) {
        return service.getStudentById(id);
    }

    // ==========================
    // Update Student
    // ==========================
    @PutMapping("/update")
    public ResponseEntity<?> updateStudent(
            @Valid @RequestBody Student student) {

        try {

            Student updatedStudent =
                    service.updateStudent(student);

            return ResponseEntity.ok(updatedStudent);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(e.getMessage());
        }
    }

    // ==========================
    // Delete Student
    // ==========================
    @DeleteMapping("/delete/{id}")
    public String deleteStudent(@PathVariable int id) {

        service.deleteStudent(id);

        return "Student Deleted Successfully";
    }

    // ==========================
    // Student Count
    // ==========================
    @GetMapping("/count")
    public long getStudentCount() {
        return service.getStudentCount();
    }
}