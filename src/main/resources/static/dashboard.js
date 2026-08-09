const REPORT_URL = "http://localhost:8080/reports";
const STUDENT_URL = "http://localhost:8080/students";
const ATTENDANCE_URL = "http://localhost:8080/attendance";
const FEE_URL = "http://localhost:8080/fees";


/* =========================================
   CHECK ADMIN LOGIN
========================================= */

if (localStorage.getItem("adminLoggedIn") !== "true") {

    window.location.href = "admin-login.html";

}


/* =========================================
   LOAD DASHBOARD
========================================= */

window.onload = function () {

    loadAdminDetails();

    loadDashboard();

    const currentDate =
        document.getElementById("currentDate");

    if (currentDate) {

        currentDate.innerHTML =
            new Date().toDateString();

    }

};


/* =========================================
   ADMIN DETAILS
========================================= */

function loadAdminDetails() {

    const adminName =
        localStorage.getItem("adminName");

    const nameElement =
        document.getElementById("adminName");

    const welcomeElement =
        document.getElementById("welcomeAdminName");


    if (
        !adminName ||
        adminName === "null" ||
        adminName === "undefined"
    ) {

        if (nameElement) {
            nameElement.innerHTML = "Admin";
        }

        if (welcomeElement) {
            welcomeElement.innerHTML = "Admin";
        }

        return;

    }


    if (nameElement) {

        nameElement.innerHTML = adminName;

    }


    if (welcomeElement) {

        welcomeElement.innerHTML = adminName;

    }

}


/* =========================================
   LOGOUT
========================================= */

function logout() {

    localStorage.removeItem("adminLoggedIn");

    localStorage.removeItem("adminName");

    localStorage.removeItem("adminEmail");

    window.location.href = "admin-login.html";

}


/* =========================================
   DASHBOARD
========================================= */

function loadDashboard() {

    loadSummary();

    loadRecentStudents();

    loadRecentAttendance();

    loadRecentFees();

}


/* =========================================
   SUMMARY
========================================= */

function loadSummary() {

    fetch(REPORT_URL + "/summary")

        .then(res => {

            if (!res.ok) {
                throw new Error("Unable to load summary");
            }

            return res.json();

        })

        .then(data => {

            const totalStudents =
                document.getElementById("totalStudents");

            const totalCourses =
                document.getElementById("totalCourses");

            const presentStudents =
                document.getElementById("presentStudents");

            const absentStudents =
                document.getElementById("absentStudents");


            if (totalStudents) {

                totalStudents.innerHTML =
                    data.students;

            }


            if (totalCourses) {

                totalCourses.innerHTML =
                    data.courses;

            }


            if (presentStudents) {

                presentStudents.innerHTML =
                    data.present;

            }


            if (absentStudents) {

                absentStudents.innerHTML =
                    data.absent;

            }


            drawAttendanceChart(
                data.present,
                data.absent
            );

        })

        .catch(error => {

            console.log(
                "Unable to load dashboard summary:",
                error
            );

        });

}


/* =========================================
   ATTENDANCE CHART
========================================= */

let attendanceChart;


function drawAttendanceChart(present, absent) {

    const ctx =
        document.getElementById("attendanceChart");

    if (!ctx) {

        return;

    }


    if (attendanceChart) {

        attendanceChart.destroy();

    }


    attendanceChart = new Chart(ctx, {

        type: "pie",

        data: {

            labels: [
                "Present",
                "Absent"
            ],

            datasets: [{

                data: [
                    present,
                    absent
                ],

                backgroundColor: [
                    "#22c55e",
                    "#ef4444"
                ]

            }]

        },

        options: {

            responsive: true,

            plugins: {

                legend: {

                    position: "bottom"

                }

            }

        }

    });

}


/* =========================================
   RECENT STUDENTS
========================================= */

function loadRecentStudents() {

    fetch(STUDENT_URL)

        .then(res => {

            if (!res.ok) {
                throw new Error("Unable to load students");
            }

            return res.json();

        })

        .then(data => {

            let rows = "";

            data
                .slice(-5)
                .reverse()
                .forEach(student => {

                    rows += `

                    <tr>

                        <td>${student.name}</td>

                        <td>${student.course}</td>

                        <td>₹ ${student.fee}</td>

                    </tr>

                    `;

                });


            const table =
                document.getElementById(
                    "recentStudentsTable"
                );

            if (table) {

                table.innerHTML = rows;

            }

        })

        .catch(error => {

            console.log(
                "Unable to load students:",
                error
            );

        });

}


/* =========================================
   RECENT ATTENDANCE
========================================= */

function loadRecentAttendance() {

    /*
     * Attendance contains studentId,
     * not studentName.
     *
     * So we load students first and
     * create an ID -> Name map.
     */

    Promise.all([

        fetch(STUDENT_URL)
            .then(res => res.json()),

        fetch(ATTENDANCE_URL)
            .then(res => res.json())

    ])

        .then(([students, attendance]) => {

            /*
             * Create student map
             *
             * Example:
             * 5 -> "Priya"
             * 6 -> "Ayesha"
             */

            const studentMap = {};

            students.forEach(student => {

                studentMap[student.id] =
                    student.name;

            });


            let rows = "";


            attendance
                .slice(-5)
                .reverse()
                .forEach(att => {

                    const studentName =
                        studentMap[att.studentId] ||
                        "Unknown Student";


                    const attendanceDate =
                        att.attendanceDate ||
                        "";


                    const statusClass =
                        att.status === "Present"
                            ? "status-present"
                            : "status-absent";


                    rows += `

                    <tr>

                        <td>${studentName}</td>

                        <td>${attendanceDate}</td>

                        <td>

                            <span class="${statusClass}">

                                ${att.status}

                            </span>

                        </td>

                    </tr>

                    `;

                });


            const table =
                document.getElementById(
                    "recentAttendanceTable"
                );


            if (table) {

                table.innerHTML = rows;

            }

        })

        .catch(error => {

            console.log(
                "Unable to load attendance:",
                error
            );

        });

}


/* =========================================
   RECENT FEES
========================================= */

function loadRecentFees() {

    fetch(FEE_URL)

        .then(res => {

            if (!res.ok) {
                throw new Error("Unable to load fees");
            }

            return res.json();

        })

        .then(data => {

            let rows = "";


            data
                .slice(-5)
                .reverse()
                .forEach(fee => {

                    let css =
                        "status-pending";


                    if (
                        fee.paymentStatus === "Paid"
                    ) {

                        css = "status-paid";

                    }

                    else if (
                        fee.paymentStatus === "Partial"
                    ) {

                        css = "status-partial";

                    }


                    /*
                     * Dashboard has:
                     *
                     * Student
                     * Paid
                     * Remaining
                     * Status
                     *
                     * Therefore DO NOT display totalFee here.
                     */

                    rows += `

                    <tr>

                        <td>${fee.studentName}</td>

                        <td>₹ ${fee.paidAmount}</td>

                        <td>₹ ${fee.remainingAmount}</td>

                        <td>

                            <span class="${css}">

                                ${fee.paymentStatus}

                            </span>

                        </td>

                    </tr>

                    `;

                });


            const table =
                document.getElementById(
                    "recentFeeTable"
                );


            if (table) {

                table.innerHTML = rows;

            }

        })

        .catch(error => {

            console.log(
                "Unable to load fees:",
                error
            );

        });

}