package com.edutrack.studentmanagement.authentication;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    @Autowired
    private AdminRepository repository;

    public Admin login(String email,String password) {

        Optional<Admin> admin = repository.findByEmail(email);

        if(admin.isPresent()) {

            Admin a = admin.get();

            if(a.getPassword().equals(password)) {

                return a;

            }

        }

        return null;

    }

}