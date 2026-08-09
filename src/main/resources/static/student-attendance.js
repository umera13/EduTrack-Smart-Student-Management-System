document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // Get Logged-in Student
    // ==========================================

    const student = JSON.parse(
        localStorage.getItem("student")
    );

    if (!student) {

        window.location.href =
            "student-login.html";

        return;
    }

    const studentId = student.id;


    // ==========================================
    // Student Information
    // ==========================================

    document.getElementById("topStudentName").innerText =
        student.name || "Student";

    document.getElementById("topStudentCourse").innerText =
        student.course || "Course";

    document.getElementById("studentName").innerText =
        student.name || "Student";


    // ==========================================
    // Logout
    // ==========================================

    const logoutBtn =
        document.getElementById("logoutBtn");

    if (logoutBtn) {

        logoutBtn.addEventListener("click", () => {

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

    }


    // ==========================================
    // Load Attendance
    // ==========================================

    loadAttendance(studentId);

});


// ==========================================
// Load Student Attendance
// ==========================================

function loadAttendance(studentId) {

    const tableBody =
        document.getElementById("attendanceTableBody");


    fetch(
        `http://localhost:8080/attendance/student/${studentId}`
    )

    .then(response => {

        if (!response.ok) {

            throw new Error(
                "Failed to fetch attendance"
            );

        }

        return response.json();

    })

    .then(attendanceList => {

        console.log(
            "Student Attendance:",
            attendanceList
        );


        // ======================================
        // No Attendance Records
        // ======================================

        if (
            !attendanceList ||
            attendanceList.length === 0
        ) {

            document.getElementById(
                "presentCount"
            ).innerText = "0";

            document.getElementById(
                "absentCount"
            ).innerText = "0";

            document.getElementById(
                "totalCount"
            ).innerText = "0";


            setTodayStatus(
                "NOT MARKED",
                "Today's attendance has not been marked yet."
            );


            tableBody.innerHTML = `
                <tr>

                    <td colspan="4"
                        class="loading">

                        No attendance records found.

                    </td>

                </tr>
            `;

            return;
        }


        // ======================================
        // Calculate Present / Absent
        // ======================================

        let presentCount = 0;

        let absentCount = 0;


        attendanceList.forEach(record => {

            const status =
                (record.status || "")
                    .trim()
                    .toUpperCase();


            if (status === "PRESENT") {

                presentCount++;

            }

            else if (status === "ABSENT") {

                absentCount++;

            }

        });


        const totalCount =
            presentCount + absentCount;


        // ======================================
        // Display Statistics
        // ======================================

        document.getElementById(
            "presentCount"
        ).innerText = presentCount;


        document.getElementById(
            "absentCount"
        ).innerText = absentCount;


        document.getElementById(
            "totalCount"
        ).innerText = totalCount;


        // ======================================
        // Check Today's Attendance
        // ======================================

        const todayRecord =
            findTodayAttendance(attendanceList);


        if (!todayRecord) {

            setTodayStatus(
                "NOT MARKED",
                "Today's attendance has not been marked yet."
            );

        }

        else {

            const todayStatus =
                (todayRecord.status || "")
                    .trim()
                    .toUpperCase();


            if (todayStatus === "PRESENT") {

                setTodayStatus(
                    "PRESENT",
                    "You are marked present for today's class."
                );

            }

            else if (todayStatus === "ABSENT") {

                setTodayStatus(
                    "ABSENT",
                    "You are marked absent for today's class."
                );

            }

            else {

                setTodayStatus(
                    "NOT MARKED",
                    "Today's attendance status is not available."
                );

            }

        }


        // ======================================
        // Generate Attendance History
        // ======================================

        tableBody.innerHTML = "";


        attendanceList.forEach(
            (record, index) => {

                const date =
                    parseAttendanceDate(
                        record.attendanceDate
                    );


                let formattedDate = "-";

                let day = "-";


                if (date) {

                    formattedDate =
                        date.toLocaleDateString(
                            "en-IN",
                            {
                                day: "2-digit",
                                month: "short",
                                year: "numeric"
                            }
                        );


                    day =
                        date.toLocaleDateString(
                            "en-IN",
                            {
                                weekday: "long"
                            }
                        );

                }


                const status =
                    record.status || "Unknown";


                // ----------------------------------
                // Status Class
                // ----------------------------------

                let statusClass = "";

                let statusIcon = "";


                if (
                    status
                        .trim()
                        .toLowerCase() === "present"
                ) {

                    statusClass =
                        "present-status";

                    statusIcon =
                        '<i class="fa-solid fa-circle-check"></i>';

                }

                else if (
                    status
                        .trim()
                        .toLowerCase() === "absent"
                ) {

                    statusClass =
                        "absent-status";

                    statusIcon =
                        '<i class="fa-solid fa-circle-xmark"></i>';

                }


                // ----------------------------------
                // Create Row
                // ----------------------------------

                const row =
                    document.createElement("tr");


                row.innerHTML = `

                    <td>
                        ${index + 1}
                    </td>

                    <td>
                        ${formattedDate}
                    </td>

                    <td>
                        ${day}
                    </td>

                    <td>

                        <span class="status-badge ${statusClass}">

                            ${statusIcon}

                            ${status}

                        </span>

                    </td>

                `;


                tableBody.appendChild(row);

            }
        );

    })

    .catch(error => {

        console.error(
            "Attendance loading error:",
            error
        );


        setTodayStatus(
            "ERROR",
            "Unable to load today's attendance."
        );


        tableBody.innerHTML = `
            <tr>

                <td colspan="4"
                    class="loading">

                    Unable to load attendance records.

                </td>

            </tr>
        `;

    });

}


// ==========================================
// Find Today's Attendance
// ==========================================

function findTodayAttendance(attendanceList) {

    const today =
        new Date();


    const todayYear =
        today.getFullYear();

    const todayMonth =
        today.getMonth();

    const todayDate =
        today.getDate();


    return attendanceList.find(record => {

        const attendanceDate =
            parseAttendanceDate(
                record.attendanceDate
            );


        if (!attendanceDate) {
            return false;
        }


        return (

            attendanceDate.getFullYear()
            === todayYear

            &&

            attendanceDate.getMonth()
            === todayMonth

            &&

            attendanceDate.getDate()
            === todayDate

        );

    });

}


// ==========================================
// Parse Attendance Date
// ==========================================

function parseAttendanceDate(value) {

    if (!value) {
        return null;
    }


    // Handles:
    // 2026-08-08
    // 2026-08-08T00:00:00
    // 2026-08-08T00:00:00.000Z

    const date =
        new Date(value);


    if (isNaN(date.getTime())) {

        return null;

    }


    return date;

}


// ==========================================
// Set Today's Attendance Status
// ==========================================

function setTodayStatus(
    status,
    message
) {

    const statusElement =
        document.getElementById(
            "todayAttendanceStatus"
        );


    const messageElement =
        document.getElementById(
            "todayAttendanceMessage"
        );


    const iconElement =
        document.getElementById(
            "todayAttendanceIcon"
        );


    statusElement.innerText =
        status;


    messageElement.innerText =
        message;


    // ======================================
    // Present
    // ======================================

    if (status === "PRESENT") {

        iconElement.innerHTML =
            '<i class="fa-solid fa-circle-check"></i>';

        iconElement.className =
            "today-icon today-present";

    }


    // ======================================
    // Absent
    // ======================================

    else if (status === "ABSENT") {

        iconElement.innerHTML =
            '<i class="fa-solid fa-circle-xmark"></i>';

        iconElement.className =
            "today-icon today-absent";

    }


    // ======================================
    // Not Marked
    // ======================================

    else {

        iconElement.innerHTML =
            '<i class="fa-solid fa-calendar-day"></i>';

        iconElement.className =
            "today-icon today-pending";

    }

}