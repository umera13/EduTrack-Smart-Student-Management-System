document.addEventListener("DOMContentLoaded", () => {


    // ==============================
    // Get Logged-in Student
    // ==============================

    const student = JSON.parse(
        localStorage.getItem("student")
    );


    // ==============================
    // Check Login
    // ==============================

    if (!student) {

        window.location.href = "student-login.html";

        return;

    }


    // ==============================
    // Student Information
    // ==============================

    document.getElementById("topStudentName").innerText =
        student.name || "Student";

    document.getElementById("topStudentCourse").innerText =
        student.course || "Course";

    document.getElementById("studentName").innerText =
        student.name || "Student";

    document.getElementById("studentId").innerText =
        student.id || "--";

    document.getElementById("studentFullName").innerText =
        student.name || "--";

    document.getElementById("studentEmail").innerText =
        student.email || "--";

    document.getElementById("studentCourse").innerText =
        student.course || "--";


    // ==============================
    // Load Fee Details
    // ==============================

    loadFeeDetails(student.id);


    // ==============================
    // Logout
    // ==============================

    document.getElementById("logoutBtn")
        .addEventListener("click", () => {


            if (confirm("Do you want to logout?")) {

                localStorage.removeItem("student");

                localStorage.removeItem("studentLoggedIn");

                localStorage.removeItem("studentId");

                localStorage.removeItem("studentName");

                localStorage.removeItem("studentEmail");

                localStorage.removeItem("studentCourse");


                window.location.href =
                    "student-login.html";

            }

        });

});


// ==========================================
// Load Fee Details
// ==========================================

function loadFeeDetails(studentId) {


    if (!studentId) {

        console.error("Student ID not found.");

        showError();

        return;

    }


    const API_URL =
        `http://localhost:8080/fees/student/${studentId}`;


    fetch(API_URL)


        .then(response => {


            if (!response.ok) {

                throw new Error(
                    "Failed to fetch fee details"
                );

            }


            return response.json();

        })


        .then(data => {


            console.log("Fee data:", data);


            // ==================================
            // No Fee Record
            // ==================================

            if (!data || data.length === 0) {

                showNoFeeData();

                return;

            }


            // ==================================
            // Get Fee Record
            // ==================================

            const fee = data[0];


            // ==================================
            // Values
            // ==================================

            const totalFee =
                Number(fee.totalFee) || 0;


            const paidFee =
                Number(fee.paidAmount) || 0;


            let remainingFee =
                Number(fee.remainingAmount);


            // If backend does not provide
            // remaining amount, calculate it.

            if (isNaN(remainingFee)) {

                remainingFee =
                    totalFee - paidFee;

            }


            // Prevent negative value

            if (remainingFee < 0) {

                remainingFee = 0;

            }


            // ==================================
            // Payment Status
            // ==================================

            let paymentStatus =
                fee.paymentStatus;


            if (!paymentStatus) {

                if (remainingFee === 0) {

                    paymentStatus = "PAID";

                } else if (paidFee > 0) {

                    paymentStatus = "PARTIALLY PAID";

                } else {

                    paymentStatus = "PENDING";

                }

            }


            // ==================================
            // Display Fee Summary
            // ==================================

            document.getElementById("totalFee").innerText =
                formatCurrency(totalFee);


            document.getElementById("paidFee").innerText =
                formatCurrency(paidFee);


            document.getElementById("remainingFee").innerText =
                formatCurrency(remainingFee);


            // ==================================
            // Payment Status
            // ==================================

            document.getElementById("paymentStatus")
                .innerText =
                paymentStatus;


            // ==================================
            // Status Message
            // ==================================

            const statusMessage =
                document.getElementById("statusMessage");


            if (
                paymentStatus.toUpperCase()
                    === "PAID"
            ) {

                statusMessage.innerText =
                    "Your fees are completely paid. No pending amount.";

            }

            else if (
                paymentStatus.toUpperCase()
                    .includes("PARTIAL")
            ) {

                statusMessage.innerText =
                    `You have ${formatCurrency(remainingFee)} remaining to be paid.`;

            }

            else {

                statusMessage.innerText =
                    `Your fee payment is pending. Remaining amount: ${formatCurrency(remainingFee)}.`;

            }


            // ==================================
            // Breakdown
            // ==================================

            document.getElementById("breakdownTotal")
                .innerText =
                formatCurrency(totalFee);


            document.getElementById("breakdownPaid")
                .innerText =
                formatCurrency(paidFee);


            document.getElementById("breakdownRemaining")
                .innerText =
                formatCurrency(remainingFee);


        })


        .catch(error => {

            console.error(
                "Error loading fee details:",
                error
            );

            showError();

        });

}


// ==========================================
// Currency Format
// ==========================================

function formatCurrency(amount) {

    return "₹" +
        Number(amount).toLocaleString("en-IN");

}


// ==========================================
// No Fee Data
// ==========================================

function showNoFeeData() {


    document.getElementById("paymentStatus")
        .innerText =
        "No Fee Record";


    document.getElementById("statusMessage")
        .innerText =
        "No fee information is available for your account.";


}


// ==========================================
// Error
// ==========================================

function showError() {


    document.getElementById("paymentStatus")
        .innerText =
        "Unable to Load";


    document.getElementById("statusMessage")
        .innerText =
        "Unable to retrieve your fee details. Please try again.";

}