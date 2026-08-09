package com.edutrack.studentmanagement.authentication;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin, Integer>{

    Optional<Admin> findByEmail(String email);

}