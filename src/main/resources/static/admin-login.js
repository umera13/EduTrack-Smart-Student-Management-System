const API_URL = "http://localhost:8080/admin/login";

const form = document.getElementById("loginForm");
const error = document.getElementById("errorMessage");

form.addEventListener("submit", function (e) {

    e.preventDefault();

    login();

});


function login() {

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (email === "" || password === "") {

        error.innerHTML = "Please enter email and password.";
        return;

    }

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

        console.log("Login Response:", data);

        if (data.success) {

            /*
             * Store login information
             */
            localStorage.setItem("adminLoggedIn", "true");

            localStorage.setItem("adminName", data.name);

            localStorage.setItem("adminEmail", data.email);

            console.log("Admin Name:", data.name);

            window.location.href = "dashboard.html";

        } else {

            error.innerHTML = data.message;

        }

    })

    .catch(err => {

        console.log(err);

        error.innerHTML = "Unable to connect to server.";

    });

}


/* ===============================
   PASSWORD SHOW / HIDE
================================ */

const toggle = document.getElementById("togglePassword");
const password = document.getElementById("password");

toggle.onclick = function () {

    if (password.type === "password") {

        password.type = "text";

        toggle.classList.remove("fa-eye");
        toggle.classList.add("fa-eye-slash");

    } else {

        password.type = "password";

        toggle.classList.remove("fa-eye-slash");
        toggle.classList.add("fa-eye");

    }

};