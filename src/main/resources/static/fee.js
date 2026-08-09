const STUDENT_URL = "http://localhost:8080/students";
const FEE_URL = "http://localhost:8080/fees";

let students = [];

window.onload = function () {
    loadStudents();
    loadFees();
};

// ---------------------
// Load Students
// ---------------------

function loadStudents() {

    fetch(STUDENT_URL)
        .then(res => res.json())
        .then(data => {

            students = data;

            let options = "<option value=''>Select Student</option>";
            let search = "<option value=''>All Students</option>";

            data.forEach(student => {

                options += `<option value="${student.id}">${student.name}</option>`;
                search += `<option value="${student.id}">${student.name}</option>`;

            });

            document.getElementById("studentId").innerHTML = options;
            document.getElementById("searchStudent").innerHTML = search;

        });

}

// ---------------------
// Student Selected
// ---------------------

document.addEventListener("change", function (e) {

    if (e.target.id === "studentId") {

        let id = Number(e.target.value);

        let student = students.find(s => s.id === id);

        if (student) {

            document.getElementById("studentName").value = student.name;
            document.getElementById("course").value = student.course;
            document.getElementById("totalFee").value = student.fee;

            calculateRemaining();
        }

    }

});

// ---------------------
// Remaining Fee
// ---------------------

function calculateRemaining() {

    let total = Number(document.getElementById("totalFee").value) || 0;
    let paid = Number(document.getElementById("paidAmount").value) || 0;

    let remaining = total - paid;

    if (remaining < 0)
        remaining = 0;

    document.getElementById("remainingAmount").value = remaining;

    document.getElementById("paymentStatus").value =
        remaining == 0 ? "Paid" : "Pending";

}

// ---------------------
// Save Fee
// ---------------------

function saveFee() {

    const id = document.getElementById("feeId").value;

    const studentId =
        document.getElementById("studentId").value;

    const totalFee =
        Number(document.getElementById("totalFee").value);

    const paidAmount =
        Number(document.getElementById("paidAmount").value);

    // =========================
    // Basic Validation
    // =========================

    if (studentId === "") {

        alert("Please select a student.");
        return;
    }

    if (totalFee <= 0) {

        alert("Total fee must be greater than 0.");
        return;
    }

    if (paidAmount < 0) {

        alert("Paid amount cannot be negative.");
        return;
    }

    if (paidAmount > totalFee) {

        alert("Paid amount cannot be greater than total fee.");
        return;
    }

    const fee = {

        id: id === "" ? null : Number(id),

        studentId: Number(studentId),

        studentName:
            document.getElementById("studentName").value,

        course:
            document.getElementById("course").value,

        totalFee: totalFee,

        paidAmount: paidAmount,

        remainingAmount:
            totalFee - paidAmount,

        paymentStatus:
            paidAmount === totalFee
                ? "Paid"
                : paidAmount === 0
                    ? "Pending"
                    : "Partial"
    };

    const url = id === ""
        ? "/save"
        : "/update";

    const method = id === ""
        ? "POST"
        : "PUT";


    fetch(FEE_URL + url, {

        method: method,

        headers: {

            "Content-Type": "application/json"
        },

        body: JSON.stringify(fee)

    })

    .then(async response => {

        const text = await response.text();

        let data;

        try {

            data = JSON.parse(text);

        } catch {

            data = null;
        }

        if (!response.ok) {

            throw new Error(
                data?.message ||
                text ||
                "Unable to save fee record."
            );
        }

        return data;
    })

    .then(data => {

        alert(
            id === ""
                ? "Fee Saved Successfully"
                : "Fee Updated Successfully"
        );

        clearFeeForm();

        loadFees();

    })

    .catch(error => {

        console.error("Fee Error:", error);

        alert(error.message);
    });
}
// ---------------------
// Load Fee Records
// ---------------------

function loadFees() {

    fetch(FEE_URL)

    .then(res => res.json())

    .then(data => {

        let rows = "";

        data.forEach(fee => {

            rows += `

            <tr>

            <td>${fee.id}</td>

            <td>${fee.studentName}</td>

            <td>${fee.course}</td>

            <td>₹${fee.totalFee}</td>

            <td>₹${fee.paidAmount}</td>

            <td>₹${fee.remainingAmount}</td>

            <td>${fee.paymentStatus}</td>

            <td>

            <button onclick="editFee(${fee.id})">Edit</button>

            <button onclick="deleteFee(${fee.id})">Delete</button>

            </td>

            </tr>

            `;

        });

        document.getElementById("feeTable").innerHTML = rows;

    });

}

// ---------------------
// Edit
// ---------------------

function editFee(id) {

    fetch(FEE_URL + "/" + id)

    .then(res => res.json())

    .then(fee => {

        document.getElementById("feeId").value = fee.id;
        document.getElementById("studentId").value = fee.studentId;

        document.getElementById("studentName").value = fee.studentName;
        document.getElementById("course").value = fee.course;
        document.getElementById("totalFee").value = fee.totalFee;
        document.getElementById("paidAmount").value = fee.paidAmount;
        document.getElementById("remainingAmount").value = fee.remainingAmount;
        document.getElementById("paymentStatus").value = fee.paymentStatus;

    });

}

// ---------------------
// Delete
// ---------------------

function deleteFee(id) {

    if (!confirm("Delete Fee Record?"))
        return;

    fetch(FEE_URL + "/delete/" + id, {

        method: "DELETE"

    })

    .then(res => res.text())

    .then(msg => {

        alert(msg);

        loadFees();

    });

}

// ---------------------
// Search
// ---------------------

function searchFee() {

    let id = document.getElementById("searchStudent").value;

    if (id == "") {

        loadFees();

        return;

    }

    fetch(FEE_URL + "/student/" + id)

    .then(res => res.json())

    .then(data => {

        let rows = "";

        data.forEach(fee => {

            rows += `

            <tr>

            <td>${fee.id}</td>

            <td>${fee.studentName}</td>

            <td>${fee.course}</td>

            <td>₹${fee.totalFee}</td>

            <td>₹${fee.paidAmount}</td>

            <td>₹${fee.remainingAmount}</td>

            <td>${fee.paymentStatus}</td>

            <td>

            <button onclick="editFee(${fee.id})">Edit</button>

            <button onclick="deleteFee(${fee.id})">Delete</button>

            </td>

            </tr>

            `;

        });

        document.getElementById("feeTable").innerHTML = rows;

    });

}

// ---------------------

function resetSearch() {

    document.getElementById("searchStudent").value = "";

    loadFees();

}

function refreshFee() {

    clearFeeForm();

    resetSearch();

}

function clearFeeForm() {

    document.getElementById("feeId").value = "";
    document.getElementById("studentId").value = "";
    document.getElementById("studentName").value = "";
    document.getElementById("course").value = "";
    document.getElementById("totalFee").value = "";
    document.getElementById("paidAmount").value = "";
    document.getElementById("remainingAmount").value = "";
    document.getElementById("paymentStatus").value = "";

}