package com.edutrack.studentmanagement.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(
    name = "student",
    uniqueConstraints = {
        @UniqueConstraint(
            name = "uk_student_email",
            columnNames = "email"
        )
    }
)
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank(message = "Name cannot be empty")
    private String name;

    @Email(message = "Enter a valid email")
    @NotBlank(message = "Email cannot be empty")
    @Column(nullable = false, unique = true)
    private String email;

    @NotBlank(message = "Course cannot be empty")
    private String course;

    @Min(value = 0, message = "Fee cannot be negative")
    private double fee;

    @NotBlank(message = "Password cannot be empty")
    private String password;

    public Student() {
    }

    public Student(Integer id,
                   String name,
                   String email,
                   String course,
                   double fee,
                   String password) {

        this.id = id;
        this.name = name;
        this.email = email;
        this.course = course;
        this.fee = fee;
        this.password = password;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCourse() {
        return course;
    }

    public void setCourse(String course) {
        this.course = course;
    }

    public double getFee() {
        return fee;
    }

    public void setFee(double fee) {
        this.fee = fee;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}