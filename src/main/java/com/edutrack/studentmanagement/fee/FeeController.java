package com.edutrack.studentmanagement.fee;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/fees")
@CrossOrigin("*")
public class FeeController {

    @Autowired
    private FeeService service;

    // ==============================
    // SAVE
    // ==============================

    @PostMapping("/save")
    public Fee saveFee(@Valid @RequestBody Fee fee) {

        return service.saveFee(fee);
    }

    // ==============================
    // GET ALL
    // ==============================

    @GetMapping
    public List<Fee> getAllFees() {

        return service.getAllFees();
    }

    // ==============================
    // GET BY ID
    // ==============================

    @GetMapping("/{id}")
    public Fee getFee(@PathVariable Integer id) {

        return service.getFeeById(id);
    }

    // ==============================
    // UPDATE
    // ==============================

    @PutMapping("/update")
    public Fee updateFee(@Valid @RequestBody Fee fee) {

        return service.updateFee(fee);
    }

    // ==============================
    // DELETE
    // ==============================

    @DeleteMapping("/delete/{id}")
    public String deleteFee(@PathVariable Integer id) {

        service.deleteFee(id);

        return "Fee Deleted Successfully";
    }

    // ==============================
    // GET BY STUDENT
    // ==============================

    @GetMapping("/student/{studentId}")
    public List<Fee> getFeeByStudent(
            @PathVariable Integer studentId) {

        return service.getFeeByStudent(studentId);
    }
}