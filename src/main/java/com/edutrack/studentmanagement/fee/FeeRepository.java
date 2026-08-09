package com.edutrack.studentmanagement.fee;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface FeeRepository extends JpaRepository<Fee, Integer> {

    List<Fee> findByStudentId(Integer studentId);

    Optional<Fee> findFirstByStudentId(Integer studentId);

    boolean existsByStudentId(Integer studentId);
}