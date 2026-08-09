const ATTENDANCE_URL = "http://localhost:8080/attendance";
const STUDENT_URL = "http://localhost:8080/students";

let studentMap = {};

window.onload = function () {

    loadStudents();

    document.getElementById("attendanceDate").valueAsDate = new Date();

};


// ================================
// Load Students
// ================================

function loadStudents() {

    fetch(STUDENT_URL)

        .then(response => {

            if (!response.ok) {
                throw new Error("Unable to load students");
            }

            return response.json();

        })

        .then(data => {

            let options =
                "<option value=''>Select Student</option>";

            let searchOptions =
                "<option value=''>All Students</option>";


            data.forEach(student => {

                studentMap[student.id] = student.name;


                options += `
                    <option value="${student.id}">
                        ${student.name}
                    </option>
                `;


                searchOptions += `
                    <option value="${student.id}">
                        ${student.name}
                    </option>
                `;

            });


            document.getElementById("studentId").innerHTML =
                options;

            document.getElementById("searchStudent").innerHTML =
                searchOptions;


            loadAttendance();

        })

        .catch(error => {

            console.error(error);

            alert("Unable to load students.");

        });

}


// ================================
// Save / Update Attendance
// ================================

function saveAttendance() {

    const id =
        document.getElementById("attendanceId").value;

    const studentId =
        document.getElementById("studentId").value;

    const attendanceDate =
        document.getElementById("attendanceDate").value;

    const status =
        document.getElementById("status").value;


    // ============================
    // Validation
    // ============================

    if (studentId === "") {

        alert("Please select a student.");

        return;

    }


    if (attendanceDate === "") {

        alert("Please select attendance date.");

        return;

    }


    if (status === "") {

        alert("Please select attendance status.");

        return;

    }


    const attendance = {

        id: id === "" ? null : Number(id),

        studentId: Number(studentId),

        attendanceDate: attendanceDate,

        status: status

    };


    // ============================
    // NEW ATTENDANCE
    // ============================

    if (id === "") {

        checkDuplicateAttendance(attendance);

    }

    // ============================
    // UPDATE ATTENDANCE
    // ============================

    else {

        updateAttendance(attendance);

    }

}


// ================================
// Check Duplicate Attendance
// ================================

function checkDuplicateAttendance(attendance) {

    fetch(
        ATTENDANCE_URL +
        "/student/" +
        attendance.studentId +
        "/date/" +
        attendance.attendanceDate
    )

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    "Unable to check attendance"
                );

            }

            return response.json();

        })

        .then(existingRecords => {

            if (existingRecords.length > 0) {

                const studentName =
                    studentMap[attendance.studentId];


                alert(
                    "Attendance already exists for " +
                    studentName +
                    " on " +
                    attendance.attendanceDate
                );

                return;

            }


            // No duplicate found
            createAttendance(attendance);

        })

        .catch(error => {

            console.error(error);

            alert(
                "Unable to check existing attendance."
            );

        });

}


// ================================
// Create Attendance
// ================================

function createAttendance(attendance) {

    fetch(ATTENDANCE_URL + "/save", {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(attendance)

    })

        .then(async response => {

            const data = await response.json();


            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Unable to save attendance."
                );

            }


            return data;

        })

        .then(data => {

            alert(
                "Attendance saved successfully."
            );

            clearAttendanceForm();

            loadAttendance();

        })

        .catch(error => {

            console.error(error);

            alert(error.message);

        });

}


// ================================
// Update Attendance
// ================================

function updateAttendance(attendance) {

    fetch(ATTENDANCE_URL + "/update", {

        method: "PUT",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(attendance)

    })

        .then(async response => {

            const data = await response.json();


            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Unable to update attendance."
                );

            }


            return data;

        })

        .then(data => {

            alert(
                "Attendance updated successfully."
            );

            clearAttendanceForm();

            loadAttendance();

        })

        .catch(error => {

            console.error(error);

            alert(error.message);

        });

}


// ================================
// Load Attendance
// ================================

function loadAttendance() {

    fetch(ATTENDANCE_URL)

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    "Unable to load attendance"
                );

            }

            return response.json();

        })

        .then(data => {

            // Sort newest date first
            data.sort(
                (a, b) =>
                    new Date(b.attendanceDate) -
                    new Date(a.attendanceDate)
            );


            displayAttendance(data);

        })

        .catch(error => {

            console.error(error);

            document.getElementById(
                "attendanceTable"
            ).innerHTML = `
                <tr>
                    <td colspan="6">
                        Unable to load attendance.
                    </td>
                </tr>
            `;

        });

}


// ================================
// Edit Attendance
// ================================

function editAttendance(id) {

    fetch(ATTENDANCE_URL + "/" + id)

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    "Unable to load attendance"
                );

            }

            return response.json();

        })

        .then(a => {

            document.getElementById(
                "attendanceId"
            ).value = a.id;


            document.getElementById(
                "studentId"
            ).value = a.studentId;


            document.getElementById(
                "attendanceDate"
            ).value = a.attendanceDate;


            document.getElementById(
                "status"
            ).value = a.status;

        })

        .catch(error => {

            console.error(error);

            alert(
                "Unable to load attendance details."
            );

        });

}


// ================================
// Delete Attendance
// ================================

function deleteAttendance(id) {

    if (!confirm("Delete Attendance?")) {

        return;

    }


    fetch(
        ATTENDANCE_URL +
        "/delete/" +
        id,
        {
            method: "DELETE"
        }
    )

        .then(async response => {

            const message =
                await response.text();


            if (!response.ok) {

                throw new Error(
                    message ||
                    "Unable to delete attendance."
                );

            }


            return message;

        })

        .then(message => {

            alert(message);

            loadAttendance();

        })

        .catch(error => {

            console.error(error);

            alert(error.message);

        });

}


// ================================
// Search Reset
// ================================

function resetSearch() {

    document.getElementById(
        "searchStudent"
    ).value = "";


    document.getElementById(
        "searchDate"
    ).value = "";


    loadAttendance();

}


// ================================
// Refresh
// ================================

function refreshAttendance() {

    clearAttendanceForm();

    document.getElementById(
        "searchStudent"
    ).value = "";


    document.getElementById(
        "searchDate"
    ).value = "";


    loadStudents();

    loadAttendance();

}


// ================================
// Search Attendance
// ================================

function searchAttendance() {

    const studentId =
        document.getElementById(
            "searchStudent"
        ).value;


    const date =
        document.getElementById(
            "searchDate"
        ).value;


    fetch(ATTENDANCE_URL)

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    "Unable to search attendance"
                );

            }

            return response.json();

        })

        .then(data => {

            if (studentId !== "") {

                data =
                    data.filter(
                        a =>
                            a.studentId ==
                            studentId
                    );

            }


            if (date !== "") {

                data =
                    data.filter(
                        a =>
                            a.attendanceDate ==
                            date
                    );

            }


            // Newest date first
            data.sort(
                (a, b) =>
                    new Date(b.attendanceDate) -
                    new Date(a.attendanceDate)
            );


            displayAttendance(data);

        })

        .catch(error => {

            console.error(error);

            alert(
                "Unable to search attendance."
            );

        });

}


// ================================
// Display Attendance
// ================================

function displayAttendance(data) {

    let rows = "";


    if (data.length === 0) {

        rows = `
            <tr>
                <td colspan="6"
                    style="text-align:center;">
                    No attendance records found.
                </td>
            </tr>
        `;

    }


    data.forEach((a, index) => {

        const studentName =
            studentMap[a.studentId] ||
            "Unknown Student";


        const statusClass =
            a.status.toLowerCase() === "present"
                ? "status-present"
                : "status-absent";


        const formattedDate =
            new Date(
                a.attendanceDate
            ).toLocaleDateString(
                "en-IN",
                {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                }
            );


        const day =
            new Date(
                a.attendanceDate
            ).toLocaleDateString(
                "en-IN",
                {
                    weekday: "long"
                }
            );


        rows += `

            <tr>

                <td>
                    ${index + 1}
                </td>

                <td>
                    ${studentName}
                </td>

                <td>
                    ${formattedDate}
                </td>

                <td>
                    ${day}
                </td>

                <td>

                    <span class="${statusClass}">
                        ${a.status}
                    </span>

                </td>

                <td>

                    <button
                        class="edit-btn"
                        onclick="editAttendance(${a.id})">

                        Edit

                    </button>


                    <button
                        class="delete-btn"
                        onclick="deleteAttendance(${a.id})">

                        Delete

                    </button>

                </td>

            </tr>

        `;

    });


    document.getElementById(
        "attendanceTable"
    ).innerHTML = rows;

}


// ================================
// Clear Form
// ================================

function clearAttendanceForm() {

    document.getElementById(
        "attendanceId"
    ).value = "";


    document.getElementById(
        "studentId"
    ).value = "";


    document.getElementById(
        "attendanceDate"
    ).value = "";


    document.getElementById(
        "status"
    ).value = "";

}