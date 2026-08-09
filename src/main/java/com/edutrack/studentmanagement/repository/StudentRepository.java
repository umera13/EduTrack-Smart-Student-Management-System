package com.edutrack.studentmanagement.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.edutrack.studentmanagement.entity.Student;

public interface StudentRepository extends JpaRepository<Student, Integer> {

    Optional<Student> findByEmail(String email);

    Student findByEmailAndPassword(String email, String password);

    boolean existsByEmail(String email);

    boolean existsByEmailAndIdNot(String email, Integer id);
}