package com.edutrack.studentmanagement.course;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, Integer> {

    boolean existsByCourseNameIgnoreCase(String courseName);

    boolean existsByCourseNameIgnoreCaseAndIdNot(
            String courseName,
            Integer id
    );
}