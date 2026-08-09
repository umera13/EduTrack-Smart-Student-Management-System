package com.edutrack.studentmanagement.attendance;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/attendance")
public class AttendanceController {

    @Autowired
    private AttendanceService attendanceService;


    @PostMapping("/save")
    public Attendance saveAttendance(
            @Valid @RequestBody Attendance attendance) {

        return attendanceService.saveAttendance(attendance);
    }


    @GetMapping("/present/count")
    public long getPresentCount() {

        return attendanceService.getPresentCount();
    }


    @GetMapping("/absent/count")
    public long getAbsentCount() {

        return attendanceService.getAbsentCount();
    }


    @GetMapping
    public List<Attendance> getAllAttendance() {

        return attendanceService.getAllAttendance();
    }


    @GetMapping("/{id}")
    public Attendance getAttendanceById(
            @PathVariable Integer id) {

        return attendanceService.getAttendanceById(id);
    }


    @PutMapping("/update")
    public Attendance updateAttendance(
            @Valid @RequestBody Attendance attendance) {

        return attendanceService.updateAttendance(attendance);
    }


    @DeleteMapping("/delete/{id}")
    public String deleteAttendance(
            @PathVariable Integer id) {

        attendanceService.deleteAttendance(id);

        return "Attendance deleted successfully";
    }


    @GetMapping("/student/{studentId}")
    public List<Attendance> getAttendanceByStudentId(
            @PathVariable Integer studentId) {

        return attendanceService.getAttendanceByStudentId(studentId);
    }


    @GetMapping("/date/{date}")
    public List<Attendance> getAttendanceByDate(
            @PathVariable
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate date) {

        return attendanceService.getAttendanceByDate(date);
    }


    @GetMapping("/student/{studentId}/date/{date}")
    public List<Attendance> getAttendanceByStudentAndDate(
            @PathVariable Integer studentId,
            @PathVariable
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate date) {

        return attendanceService
                .getAttendanceByStudentAndDate(
                        studentId,
                        date
                );
    }
}