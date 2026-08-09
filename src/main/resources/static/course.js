const COURSE_URL = "http://localhost:8080/courses";

window.onload = function () {

    loadCourses();

};


// ==========================
// Save / Update Course
// ==========================

function saveCourse() {

    const id =
        document.getElementById("courseId").value;

    const courseName =
        document.getElementById("courseName").value.trim();

    const duration =
        document.getElementById("duration").value.trim();

    const fee =
        document.getElementById("fee").value.trim();


    // ==========================
    // Validation
    // ==========================

    if (courseName === "") {

        alert("Course Name Required");

        return;
    }

    if (duration === "") {

        alert("Duration Required");

        return;
    }

    if (fee === "") {

        alert("Fee Required");

        return;
    }

    if (Number(fee) < 0) {

        alert("Fee cannot be negative");

        return;
    }


    // ==========================
    // Create Course Object
    // ==========================

    const course = {

        courseName: courseName,

        duration: duration,

        fee: Number(fee)

    };


    // Add ID only during update

    if (id !== "") {

        course.id = Number(id);

    }


    const url =
        id === ""
            ? "/save"
            : "/update";

    const method =
        id === ""
            ? "POST"
            : "PUT";


    // ==========================
    // Save / Update
    // ==========================

    fetch(COURSE_URL + url, {

        method: method,

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(course)

    })

    .then(async response => {

        if (!response.ok) {

            let message = "Unable to save course";

            try {

                const errorData =
                    await response.json();

                if (errorData.message) {

                    message = errorData.message;

                }

            } catch (error) {

                const text =
                    await response.text();

                if (text) {

                    message = text;

                }

            }

            throw new Error(message);

        }

        return response.json();

    })

    .then(data => {

        if (id === "") {

            alert("Course Saved Successfully");

        } else {

            alert("Course Updated Successfully");

        }

        clearForm();

        loadCourses();

    })

    .catch(error => {

        alert(error.message);

        console.error(error);

    });

}


// ==========================
// Load Courses
// ==========================

function loadCourses() {

    fetch(COURSE_URL)

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    "Unable to load courses"
                );

            }

            return response.json();

        })

        .then(data => {

            let rows = "";

            data.forEach(course => {

                rows += `

                <tr>

                    <td>${course.id}</td>

                    <td>${course.courseName}</td>

                    <td>${course.duration}</td>

                    <td>${course.fee}</td>

                    <td>

                        <button
                            class="edit-btn"
                            onclick="editCourse(${course.id})">
                            Edit
                        </button>

                        <button
                            class="delete-btn"
                            onclick="deleteCourse(${course.id})">
                            Delete
                        </button>

                    </td>

                </tr>

                `;

            });

            document.getElementById(
                "courseTable"
            ).innerHTML = rows;

        })

        .catch(error => {

            console.error(error);

        });

}


// ==========================
// Edit Course
// ==========================

function editCourse(id) {

    fetch(COURSE_URL + "/" + id)

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    "Unable to load course"
                );

            }

            return response.json();

        })

        .then(course => {

            document.getElementById(
                "courseId"
            ).value = course.id;

            document.getElementById(
                "courseName"
            ).value = course.courseName;

            document.getElementById(
                "duration"
            ).value = course.duration;

            document.getElementById(
                "fee"
            ).value = course.fee;

        })

        .catch(error => {

            alert(error.message);

            console.error(error);

        });

}


// ==========================
// Delete Course
// ==========================

function deleteCourse(id) {

    if (!confirm("Delete this course?")) {

        return;

    }


    fetch(
        COURSE_URL + "/delete/" + id,
        {
            method: "DELETE"
        }
    )

    .then(async response => {

        if (!response.ok) {

            let message =
                "Unable to delete course";

            try {

                const errorData =
                    await response.json();

                if (errorData.message) {

                    message =
                        errorData.message;

                }

            } catch (error) {

                // Ignore JSON parsing error

            }

            throw new Error(message);

        }

        return response.text();

    })

    .then(message => {

        alert(message);

        loadCourses();

    })

    .catch(error => {

        alert(error.message);

        console.error(error);

    });

}


// ==========================
// Clear Form
// ==========================

function clearForm() {

    document.getElementById(
        "courseId"
    ).value = "";

    document.getElementById(
        "courseName"
    ).value = "";

    document.getElementById(
        "duration"
    ).value = "";

    document.getElementById(
        "fee"
    ).value = "";

}