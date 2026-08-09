const BASE_URL = "http://localhost:8080/students";
const COURSE_URL = "http://localhost:8080/courses";


// ==========================
// PAGE LOAD
// ==========================

window.onload = function () {

    loadStudents();

    loadCourses();

};


// ==========================
// SAVE / UPDATE STUDENT
// ==========================

function saveStudent() {

    const id =
        document.getElementById("studentId").value;

    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value.trim();

    const course =
        document.getElementById("course").value;

    const fee =
        document.getElementById("fee").value.trim();


    // --------------------------
    // Validation
    // --------------------------

    if (name === "") {

        alert("Student Name is required");

        return;
    }

    if (email === "") {

        alert("Email is required");

        return;
    }

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {

        alert("Enter a valid Email Address");

        return;
    }

    if (course === "") {

        alert("Course is required");

        return;
    }

    if (fee === "") {

        alert("Fee is required");

        return;
    }

    if (Number(fee) < 0) {

        alert("Fee cannot be negative");

        return;
    }


    // Password is mandatory only for NEW student
    if (id === "" && password === "") {

        alert("Student Password is required");

        return;
    }


    // --------------------------
    // Student Object
    // --------------------------

    const student = {

        name: name,

        email: email,

        course: course,

        fee: Number(fee)

    };


    /*
       Password:
       - New student -> send password
       - Existing student -> send only if admin entered a new password
    */

    if (password !== "") {

        student.password = password;

    }


    // Add ID during update

    if (id !== "") {

        student.id = Number(id);

    }


    const url =
        id === "" ? "/save" : "/update";

    const method =
        id === "" ? "POST" : "PUT";


    fetch(BASE_URL + url, {

        method: method,

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(student)

    })

    .then(response => {

        if (!response.ok) {

            return response.text()
                .then(errorMessage => {

                    throw new Error(errorMessage);

                });

        }

        return response.json();

    })

    .then(data => {

        if (id === "") {

            alert("Student Saved Successfully");

        } else {

            alert("Student Updated Successfully");

        }

        clearForm();

        loadStudents();

    })

    .catch(error => {

        console.error(error);

        alert("Error: " + error.message);

    });

}


// ==========================
// LOAD STUDENTS
// ==========================

function loadStudents() {

    fetch(BASE_URL)

        .then(response => response.json())

        .then(data => {

            let rows = "";

            data.forEach(student => {

                rows += `

                <tr>

                    <td>${student.id}</td>

                    <td>${student.name}</td>

                    <td>${student.email}</td>

                    <td>${student.course}</td>

                    <td>₹ ${student.fee}</td>

                    <td>

                        <button
                            class="edit-btn"
                            onclick="editStudent(${student.id})">

                            Edit

                        </button>

                        <button
                            class="delete-btn"
                            onclick="deleteStudent(${student.id})">

                            Delete

                        </button>

                    </td>

                </tr>

                `;

            });


            document.getElementById(
                "studentTable"
            ).innerHTML = rows;

        })

        .catch(error => {

            console.error(error);

        });

}


// ==========================
// LOAD COURSES
// ==========================

function loadCourses() {

    fetch(COURSE_URL)

        .then(response => response.json())

        .then(data => {

            let options =
                '<option value="">Select Course</option>';


            data.forEach(course => {

                options += `

                    <option
                        value="${course.courseName}"
                        data-fee="${course.fee}">

                        ${course.courseName}

                    </option>

                `;

            });


            document.getElementById(
                "course"
            ).innerHTML = options;

        })

        .catch(error => {

            console.error(error);

        });

}


// ==========================
// COURSE CHANGE
// ==========================

document.getElementById("course")
    .addEventListener("change", function () {

        const selectedCourse =
            this.options[this.selectedIndex];

        const fee =
            selectedCourse.getAttribute("data-fee");


        document.getElementById("fee").value =
            fee ? fee : "";

    });


// ==========================
// EDIT STUDENT
// ==========================

function editStudent(id) {

    fetch(BASE_URL + "/" + id)

        .then(response => response.json())

        .then(student => {

            document.getElementById(
                "studentId"
            ).value = student.id;


            document.getElementById(
                "name"
            ).value = student.name;


            document.getElementById(
                "email"
            ).value = student.email;


            document.getElementById(
                "course"
            ).value = student.course;


            document.getElementById(
                "fee"
            ).value = student.fee;


            /*
             * Do NOT display the existing password.
             *
             * Admin can enter a new password
             * if the password needs to be changed.
             */

            document.getElementById(
                "password"
            ).value = "";

        })

        .catch(error => {

            console.error(error);

        });

}


// ==========================
// DELETE STUDENT
// ==========================

function deleteStudent(id) {

    if (!confirm(
        "Are you sure you want to delete this student?"
    )) {

        return;

    }


    fetch(
        BASE_URL + "/delete/" + id,
        {
            method: "DELETE"
        }
    )

    .then(response => response.text())

    .then(message => {

        alert(message);

        loadStudents();

    })

    .catch(error => {

        console.error(error);

        alert("Unable to delete student.");

    });

}


// ==========================
// SEARCH
// ==========================

function searchStudent() {

    const search =
        document.getElementById(
            "searchStudent"
        ).value
        .toLowerCase()
        .trim();


    const rows =
        document.querySelectorAll(
            "#studentTable tr"
        );


    rows.forEach(row => {

        if (!row.cells.length) {

            return;

        }


        const name =
            row.cells[1]
                .innerText
                .toLowerCase();


        const email =
            row.cells[2]
                .innerText
                .toLowerCase();


        if (
            name.includes(search) ||
            email.includes(search)
        ) {

            row.style.display = "";

        } else {

            row.style.display = "none";

        }

    });

}


// ==========================
// REFRESH
// ==========================

function refreshPage() {

    clearForm();

    document.getElementById(
        "searchStudent"
    ).value = "";

    loadStudents();

    loadCourses();

}


// ==========================
// CLEAR FORM
// ==========================

function clearForm() {

    document.getElementById(
        "studentId"
    ).value = "";


    document.getElementById(
        "name"
    ).value = "";


    document.getElementById(
        "email"
    ).value = "";


    document.getElementById(
        "password"
    ).value = "";


    document.getElementById(
        "course"
    ).value = "";


    document.getElementById(
        "fee"
    ).value = "";

}