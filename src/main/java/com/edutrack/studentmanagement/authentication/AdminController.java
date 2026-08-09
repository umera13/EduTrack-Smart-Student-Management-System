package com.edutrack.studentmanagement.authentication;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
@CrossOrigin("*")
public class AdminController {

    @Autowired
    private AdminService service;

    @PostMapping("/login")
    public Map<String,Object> login(@RequestBody Admin admin){

        System.out.println("Email : " + admin.getEmail());
        System.out.println("Password : " + admin.getPassword());

        Map<String,Object> response = new HashMap<>();

        Admin loggedAdmin =
                service.login(admin.getEmail(), admin.getPassword());

        System.out.println("Result : " + loggedAdmin);

        if(loggedAdmin != null){

            response.put("success", true);
            response.put("message", "Login Successful");
            response.put("name", loggedAdmin.getName());
            response.put("email", loggedAdmin.getEmail());

        }else{

            response.put("success", false);
            response.put("message", "Invalid Email or Password");

        }

        return response;
    }

}