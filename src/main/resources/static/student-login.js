const API_URL = "http://localhost:8080/student/login";

const form = document.getElementById("studentLoginForm");

const error = document.getElementById("errorMessage");

const togglePassword = document.getElementById("togglePassword");

const passwordField = document.getElementById("password");


// ==============================
// Password Show / Hide
// ==============================

togglePassword.addEventListener("click", function () {

    if (passwordField.type === "password") {

        passwordField.type = "text";

        togglePassword.classList.remove("fa-eye");

        togglePassword.classList.add("fa-eye-slash");

    } else {

        passwordField.type = "password";

        togglePassword.classList.remove("fa-eye-slash");

        togglePassword.classList.add("fa-eye");

    }

});


// ==============================
// Login Form
// ==============================

form.addEventListener("submit", function (e) {

    e.preventDefault();

    loginStudent();

});


// ==============================
// Student Login
// ==============================


document.getElementById("email").addEventListener("input", () => {
    error.innerHTML = "";
});

document.getElementById("password").addEventListener("input", () => {
    error.innerHTML = "";
});

function loginStudent() {

    error.innerHTML = "";

    const email = document.getElementById("email").value.trim();

    const password = passwordField.value.trim();

    fetch(API_URL, {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify({

            email: email,

            password: password

        })

    })

    .then(response => response.json())

    .then(data => {

        console.log(data);

        if (data.success) {

            // Store student details

            localStorage.setItem("studentLoggedIn", "true");

            localStorage.setItem("studentId", data.id);

            localStorage.setItem("studentName", data.name);

            localStorage.setItem("studentEmail", data.email);

            localStorage.setItem("studentCourse", data.course);

            // Redirect

			localStorage.setItem("student", JSON.stringify(data));

			window.location.href = "student-dashboard.html";
        } else {

            error.innerHTML = data.message;

        }

    })

    .catch(errorObj => {

        console.error(errorObj);

        error.innerHTML = "Unable to connect to server.";

    });

}