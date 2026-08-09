package com.edutrack.studentmanagement.course;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/courses")
@CrossOrigin("*")
public class CourseController {

    @Autowired
    private CourseService courseService;

    // ==========================
    // Save Course
    // ==========================

    @PostMapping("/save")
    public Course saveCourse(
            @Valid @RequestBody Course course) {

        return courseService.saveCourse(course);
    }

    // ==========================
    // Get All Courses
    // ==========================

    @GetMapping
    public List<Course> getAllCourses() {

        return courseService.getAllCourses();
    }

    // ==========================
    // Get Course By ID
    // ==========================

    @GetMapping("/{id}")
    public Course getCourseById(
            @PathVariable Integer id) {

        return courseService.getCourseById(id);
    }

    // ==========================
    // Update Course
    // ==========================

    @PutMapping("/update")
    public Course updateCourse(
            @Valid @RequestBody Course course) {

        return courseService.updateCourse(course);
    }

    // ==========================
    // Delete Course
    // ==========================

    @DeleteMapping("/delete/{id}")
    public String deleteCourse(
            @PathVariable Integer id) {

        courseService.deleteCourse(id);

        return "Course Deleted Successfully";
    }

    // ==========================
    // Course Count
    // ==========================

    @GetMapping("/count")
    public long getCourseCount() {

        return courseService.getCourseCount();
    }
}