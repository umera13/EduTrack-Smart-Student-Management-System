package com.edutrack.studentmanagement.attendance;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceRepository attendanceRepository;


    // SAVE ATTENDANCE
    public Attendance saveAttendance(Attendance attendance) {

        boolean alreadyExists =
                attendanceRepository.existsByStudentIdAndAttendanceDate(
                        attendance.getStudentId(),
                        attendance.getAttendanceDate()
                );

        if (alreadyExists) {

            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Attendance already exists for this student on this date"
            );
        }

        return attendanceRepository.save(attendance);
    }


    // PRESENT STUDENTS TODAY
    public long getPresentCount() {

        return attendanceRepository.countByStatusAndAttendanceDate(
                "Present",
                LocalDate.now()
        );
    }


    // ABSENT STUDENTS TODAY
    public long getAbsentCount() {

        return attendanceRepository.countByStatusAndAttendanceDate(
                "Absent",
                LocalDate.now()
        );
    }


    // GET ALL ATTENDANCE
    public List<Attendance> getAllAttendance() {

        return attendanceRepository.findAll();
    }


    // GET ATTENDANCE BY ID
    public Attendance getAttendanceById(Integer id) {

        Optional<Attendance> attendance =
                attendanceRepository.findById(id);

        return attendance.orElse(null);
    }


    // UPDATE ATTENDANCE
    public Attendance updateAttendance(Attendance attendance) {

        if (attendance.getId() == null) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Attendance ID is required for update"
            );
        }

        Optional<Attendance> existing =
                attendanceRepository.findById(attendance.getId());

        if (existing.isEmpty()) {

            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Attendance record not found"
            );
        }

        return attendanceRepository.save(attendance);
    }


    // DELETE ATTENDANCE
    public void deleteAttendance(Integer id) {

        if (!attendanceRepository.existsById(id)) {

            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Attendance record not found"
            );
        }

        attendanceRepository.deleteById(id);
    }


    // GET ATTENDANCE BY STUDENT
    public List<Attendance> getAttendanceByStudentId(
            Integer studentId) {

        return attendanceRepository.findByStudentId(studentId);
    }


    // GET ATTENDANCE BY DATE
    public List<Attendance> getAttendanceByDate(
            LocalDate date) {

        return attendanceRepository.findByAttendanceDate(date);
    }


    // GET ATTENDANCE BY STUDENT + DATE
    public List<Attendance> getAttendanceByStudentAndDate(
            Integer studentId,
            LocalDate date) {

        return attendanceRepository
                .findByStudentIdAndAttendanceDate(
                        studentId,
                        date
                );
    }
}