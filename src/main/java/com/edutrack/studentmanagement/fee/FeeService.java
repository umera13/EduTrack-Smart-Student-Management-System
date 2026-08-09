package com.edutrack.studentmanagement.fee;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FeeService {

    @Autowired
    private FeeRepository repository;

    // ==============================
    // SAVE FEE
    // ==============================

    public Fee saveFee(Fee fee) {

        // Prevent duplicate fee record
        if (repository.existsByStudentId(fee.getStudentId())) {
            throw new RuntimeException(
                "Fee record already exists for this student."
            );
        }

        calculateFeeDetails(fee);

        return repository.save(fee);
    }

    // ==============================
    // CALCULATE FEE
    // ==============================

    private void calculateFeeDetails(Fee fee) {

        double total = fee.getTotalFee() == null
                ? 0
                : fee.getTotalFee();

        double paid = fee.getPaidAmount() == null
                ? 0
                : fee.getPaidAmount();

        if (paid > total) {
            throw new RuntimeException(
                "Paid amount cannot be greater than total fee."
            );
        }

        double remaining = total - paid;

        fee.setRemainingAmount(remaining);

        if (remaining == 0) {

            fee.setPaymentStatus("Paid");

        } else if (paid == 0) {

            fee.setPaymentStatus("Pending");

        } else {

            fee.setPaymentStatus("Partial");
        }
    }

    // ==============================
    // GET ALL
    // ==============================

    public List<Fee> getAllFees() {

        return repository.findAll();
    }

    // ==============================
    // GET BY ID
    // ==============================

    public Fee getFeeById(Integer id) {

        return repository.findById(id).orElse(null);
    }

    // ==============================
    // UPDATE
    // ==============================

    public Fee updateFee(Fee fee) {

        if (fee.getId() == null) {

            throw new RuntimeException(
                "Fee ID is required for update."
            );
        }

        if (!repository.existsById(fee.getId())) {

            throw new RuntimeException(
                "Fee record not found."
            );
        }

        calculateFeeDetails(fee);

        return repository.save(fee);
    }

    // ==============================
    // DELETE
    // ==============================

    public void deleteFee(Integer id) {

        if (!repository.existsById(id)) {

            throw new RuntimeException(
                "Fee record not found."
            );
        }

        repository.deleteById(id);
    }

    // ==============================
    // GET BY STUDENT
    // ==============================

    public List<Fee> getFeeByStudent(Integer studentId) {

        return repository.findByStudentId(studentId);
    }
}