package com.edutrack.studentmanagement.attendance;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AttendanceRepository extends JpaRepository<Attendance, Integer> {

    List<Attendance> findByStudentId(Integer studentId);

    List<Attendance> findByAttendanceDate(LocalDate attendanceDate);

    List<Attendance> findByStudentIdAndAttendanceDate(
            Integer studentId,
            LocalDate attendanceDate
    );

    long countByStatus(String status);

    long countByStatusAndAttendanceDate(
            String status,
            LocalDate attendanceDate
    );

    // Check whether attendance already exists
    boolean existsByStudentIdAndAttendanceDate(
            Integer studentId,
            LocalDate attendanceDate
    );
}