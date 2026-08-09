package com.edutrack.studentmanagement.course;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    // ==========================
    // Save Course
    // ==========================

    public Course saveCourse(Course course) {

        course.setCourseName(course.getCourseName().trim());

        if (courseRepository.existsByCourseNameIgnoreCase(course.getCourseName())) {

            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Course already exists"
            );
        }

        try {

            return courseRepository.save(course);

        } catch (DataIntegrityViolationException e) {

            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Course already exists"
            );
        }
    }

    // ==========================
    // Get All Courses
    // ==========================

    public List<Course> getAllCourses() {

        return courseRepository.findAll();
    }

    // ==========================
    // Get Course By ID
    // ==========================

    public Course getCourseById(Integer id) {

        Optional<Course> course =
                courseRepository.findById(id);

        return course.orElse(null);
    }

    // ==========================
    // Update Course
    // ==========================

    public Course updateCourse(Course course) {

        if (course.getId() == null) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Course ID is required for update"
            );
        }

        if (!courseRepository.existsById(course.getId())) {

            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Course not found"
            );
        }

        course.setCourseName(course.getCourseName().trim());

        if (courseRepository.existsByCourseNameIgnoreCaseAndIdNot(
                course.getCourseName(),
                course.getId())) {

            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Course already exists"
            );
        }

        try {

            return courseRepository.save(course);

        } catch (DataIntegrityViolationException e) {

            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Course already exists"
            );
        }
    }

    // ==========================
    // Delete Course
    // ==========================

    public void deleteCourse(Integer id) {

        if (!courseRepository.existsById(id)) {

            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Course not found"
            );
        }

        courseRepository.deleteById(id);
    }

    // ==========================
    // Course Count
    // ==========================

    public long getCourseCount() {

        return courseRepository.count();
    }
}