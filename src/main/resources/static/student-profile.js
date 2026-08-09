document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // Check Student Login
    // ==========================================

    const student = JSON.parse(
        localStorage.getItem("student")
    );

    const studentId =
        localStorage.getItem("studentId") ||
        (student ? student.id : null);


    if (!studentId) {

        window.location.href = "student-login.html";

        return;
    }


    // ==========================================
    // API
    // ==========================================

    const API_URL =
        `http://localhost:8080/students/${studentId}`;


    // ==========================================
    // Load Student Profile
    // ==========================================

    fetch(API_URL)

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    "Unable to fetch student details"
                );

            }

            return response.json();

        })

        .then(data => {

            console.log("Student Profile:", data);


            // ----------------------------------
            // Profile Hero
            // ----------------------------------

            document.getElementById("studentName").innerText =
                data.name || "--";

            document.getElementById("studentCourse").innerText =
                data.course || "--";


            // ----------------------------------
            // Top Profile
            // ----------------------------------

            document.getElementById("topStudentName").innerText =
                data.name || "Student";

            document.getElementById("topStudentCourse").innerText =
                data.course || "Course";


            // ----------------------------------
            // Personal Information
            // ----------------------------------

            document.getElementById("studentId").innerText =
                data.id ?? "--";

            document.getElementById("studentFullName").innerText =
                data.name || "--";

            document.getElementById("studentEmail").innerText =
                data.email || "--";


            // ----------------------------------
            // Academic Information
            // ----------------------------------

            document.getElementById("studentCourseDetail").innerText =
                data.course || "--";


            // ----------------------------------
            // Account Summary
            // ----------------------------------

            document.getElementById("summaryStudentId").innerText =
                data.id ?? "--";

            document.getElementById("summaryCourse").innerText =
                data.course || "--";

            document.getElementById("summaryEmail").innerText =
                data.email || "--";

        })

        .catch(error => {

            console.error(
                "Profile loading error:",
                error
            );

        });


    // ==========================================
    // Logout
    // ==========================================

    const logoutBtn =
        document.getElementById("logoutBtn");


    logoutBtn.addEventListener("click", () => {

        const confirmLogout =
            confirm("Do you want to logout?");


        if (!confirmLogout) {
            return;
        }


        // Clear student session

        localStorage.removeItem("student");

        localStorage.removeItem("studentLoggedIn");

        localStorage.removeItem("studentId");

        localStorage.removeItem("studentName");

        localStorage.removeItem("studentEmail");

        localStorage.removeItem("studentCourse");


        // Redirect

        window.location.href =
            "student-login.html";

    });

});