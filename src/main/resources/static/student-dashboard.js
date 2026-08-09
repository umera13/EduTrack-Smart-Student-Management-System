document.addEventListener("DOMContentLoaded", () => {

    const student = JSON.parse(localStorage.getItem("student"));

    if (!student) {

        window.location.href = "student-login.html";

        return;
    }


    const STUDENT_API =
        `http://localhost:8080/students/${student.id}`;

    const ATTENDANCE_API =
        `http://localhost:8080/attendance/student/${student.id}`;

    const FEE_API =
        `http://localhost:8080/fees/student/${student.id}`;


    // ==========================
    // Student Information
    // ==========================

    fetch(STUDENT_API)

        .then(res => {

            if (!res.ok) {
                throw new Error("Unable to load student information");
            }

            return res.json();

        })

        .then(data => {

            document.getElementById("studentName").innerText =
                data.name;

            document.getElementById("profileName").innerText =
                data.name;

            document.getElementById("profileCourse").innerText =
                data.course;

            document.getElementById("studentFullName").innerText =
                data.name;

            document.getElementById("studentEmail").innerText =
                data.email;

            document.getElementById("studentCourse").innerText =
                data.course;

        })

        .catch(error => {

            console.error("Student Error:", error);

        });


    // ==========================
    // Current Date
    // ==========================

    const options = {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric"
    };

    const today = new Date();

    document.getElementById("currentDate").innerText =
        today.toLocaleDateString("en-IN", options);


    // ==========================
    // Today's Attendance
    // ==========================

    function getTodayDate() {

        const year = today.getFullYear();

        const month =
            String(today.getMonth() + 1).padStart(2, "0");

        const day =
            String(today.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    }


    function formatTodayDate() {

        return today.toLocaleDateString(
            "en-IN",
            {
                weekday: "long",
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );

    }


    fetch(ATTENDANCE_API)

        .then(res => {

            if (!res.ok) {
                throw new Error("Unable to load attendance");
            }

            return res.json();

        })

        .then(data => {

            const todayDate = getTodayDate();

            const todayAttendance = data.find(a =>
                a.attendanceDate === todayDate
            );


            const statusElement =
                document.getElementById("attendanceStatus");

            const statusIcon =
                document.getElementById("attendanceStatusIcon");

            const statusTop =
                document.getElementById("attendancePercent");

            const dateText =
                document.getElementById("attendanceDateText");


            // ==========================
            // NOT MARKED
            // ==========================

            if (!todayAttendance) {

                statusElement.innerText =
                    "NOT MARKED";

                statusTop.innerText =
                    "NOT MARKED";

                statusIcon.className =
                    "attendance-status-icon not-marked";

                statusIcon.innerHTML =
                    '<i class="fa-solid fa-calendar-check"></i>';

                dateText.innerText =
                    "Attendance has not been marked for today.";

                return;
            }


            // ==========================
            // Status
            // ==========================

            const status =
                todayAttendance.status
                    .trim()
                    .toUpperCase();


            // ==========================
            // PRESENT
            // ==========================

            if (status === "PRESENT") {

                statusElement.innerText =
                    "PRESENT";

                statusTop.innerText =
                    "PRESENT";

                statusIcon.className =
                    "attendance-status-icon present";

                statusIcon.innerHTML =
                    '<i class="fa-solid fa-check"></i>';

                dateText.innerText =
                    formatTodayDate();

            }


            // ==========================
            // ABSENT
            // ==========================

            else if (status === "ABSENT") {

                statusElement.innerText =
                    "ABSENT";

                statusTop.innerText =
                    "ABSENT";

                statusIcon.className =
                    "attendance-status-icon absent";

                statusIcon.innerHTML =
                    '<i class="fa-solid fa-xmark"></i>';

                dateText.innerText =
                    formatTodayDate();

            }


            // ==========================
            // Other Status
            // ==========================

            else {

                statusElement.innerText =
                    status;

                statusTop.innerText =
                    status;

                statusIcon.className =
                    "attendance-status-icon not-marked";

                dateText.innerText =
                    formatTodayDate();

            }

        })

        .catch(error => {

            console.error("Attendance Error:", error);

        });


    // ==========================
    // Fee Details
    // ==========================

    fetch(FEE_API)

        .then(res => {

            if (!res.ok) {
                throw new Error("Unable to load fee details");
            }

            return res.json();

        })

        .then(data => {

            if (data.length > 0) {

                const fee = data[0];

                document.getElementById("feePaid").innerText =
                    "₹" + fee.paidAmount;

                document.getElementById("pendingFee").innerText =
                    "₹" + fee.remainingAmount;

                document.getElementById("totalFee").innerText =
                    "₹" + fee.totalFee;

                document.getElementById("paidFee").innerText =
                    "₹" + fee.paidAmount;

                document.getElementById("remainingFee").innerText =
                    "₹" + fee.remainingAmount;

            }

            document.getElementById("courseCount").innerText =
                "1";

        })

        .catch(error => {

            console.error("Fee Error:", error);

        });


    // ==========================
    // Logout
    // ==========================

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