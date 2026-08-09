package com.edutrack.studentmanagement.studentauth;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.edutrack.studentmanagement.entity.Student;
import com.edutrack.studentmanagement.service.StudentService;

@RestController
@RequestMapping("/student")
@CrossOrigin("*")
public class StudentLoginController {

    @Autowired
    private StudentService studentService;

    @PostMapping("/login")
    public Map<String,Object> login(@RequestBody StudentLoginRequest request){

        Map<String,Object> response = new HashMap<>();

        Student loggedStudent =
                studentService.login(
                        request.getEmail(),
                        request.getPassword());

        if(loggedStudent != null){

            response.put("success", true);
            response.put("message", "Login Successful");

            response.put("id", loggedStudent.getId());
            response.put("name", loggedStudent.getName());
            response.put("email", loggedStudent.getEmail());
            response.put("course", loggedStudent.getCourse());

        }
        else{

            response.put("success", false);
            response.put("message", "Invalid Email or Password");

        }

        return response;

    }

}