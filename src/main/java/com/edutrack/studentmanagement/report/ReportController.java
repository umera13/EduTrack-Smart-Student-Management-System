package com.edutrack.studentmanagement.report;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.edutrack.studentmanagement.attendance.AttendanceService;
import com.edutrack.studentmanagement.course.CourseService;
import com.edutrack.studentmanagement.fee.FeeService;
import com.edutrack.studentmanagement.service.StudentService;

@RestController
@RequestMapping("/reports")
@CrossOrigin("*")
public class ReportController {

    @Autowired
    private StudentService studentService;

    @Autowired
    private CourseService courseService;

    @Autowired
    private AttendanceService attendanceService;

    @Autowired
    private FeeService feeService;

    @GetMapping("/summary")
    public Map<String, Object> getSummary() {

        Map<String, Object> report = new HashMap<>();

        report.put("students", studentService.getAllStudents().size());

        report.put("courses", courseService.getAllCourses().size());

        report.put("present", attendanceService.getPresentCount());

        report.put("absent", attendanceService.getAbsentCount());

        report.put("fees", feeService.getAllFees());

        return report;
    }

}