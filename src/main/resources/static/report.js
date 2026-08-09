const REPORT_URL = "http://localhost:8080/reports";
const STUDENT_URL = "http://localhost:8080/students";
const COURSE_URL = "http://localhost:8080/courses";
const ATTENDANCE_URL = "http://localhost:8080/attendance";
const FEE_URL = "http://localhost:8080/fees";

window.onload = function () {

    loadReports();

};

// =============================
// Main
// =============================

function loadReports(){

    loadSummary();

    loadStudents();

    loadCourses();

    loadAttendance();

    loadFees();

}

// =============================
// Summary Cards
// =============================

function loadSummary(){

    fetch(REPORT_URL + "/summary")

    .then(res=>res.json())

    .then(data=>{

        document.getElementById("totalStudents").innerHTML=data.students;

        document.getElementById("totalCourses").innerHTML=data.courses;

        document.getElementById("presentStudents").innerHTML=data.present;

        document.getElementById("absentStudents").innerHTML=data.absent;

        let collected=0;

        let pending=0;

        data.fees.forEach(fee=>{

            collected+=fee.paidAmount;

            pending+=fee.remainingAmount;

        });

        document.getElementById("feeCollected").innerHTML="₹"+collected;

        document.getElementById("pendingFee").innerHTML="₹"+pending;

    });

}

// =============================
// Student Report
// =============================

function loadStudents(){

fetch(STUDENT_URL)

.then(res=>res.json())

.then(data=>{

let rows="";

let options="<option value=''>All Students</option>";

data.forEach(student=>{

options+=`

<option value="${student.id}">

${student.name}

</option>

`;

rows+=`

<tr>

<td>${student.id}</td>

<td>${student.name}</td>

<td>${student.email}</td>

<td>${student.course}</td>

<td>₹${student.fee}</td>

</tr>

`;

});

document.getElementById("searchStudent").innerHTML=options;

document.getElementById("studentReportTable").innerHTML=rows;

});

}

// =============================
// Course Dropdown
// =============================

function loadCourses(){

fetch(COURSE_URL)

.then(res=>res.json())

.then(data=>{

let options="<option value=''>All Courses</option>";

data.forEach(course=>{

options+=`

<option value="${course.courseName}">

${course.courseName}

</option>

`;

});

document.getElementById("searchCourse").innerHTML=options;

});

}

// =============================
// Attendance Report
// =============================

function loadAttendance(){

fetch(ATTENDANCE_URL)

.then(res=>res.json())

.then(data=>{

let rows="";

data.forEach(att=>{

rows+=`

<tr>

<td>${att.studentId}</td>

<td>${att.attendanceDate}</td>

<td>${att.status}</td>

</tr>

`;

});

document.getElementById("attendanceReportTable").innerHTML=rows;

});

}

// =============================
// Fee Report
// =============================

function loadFees(){

fetch(FEE_URL)

.then(res=>res.json())

.then(data=>{

let rows="";

data.forEach(fee=>{

rows+=`

<tr>

<td>${fee.studentName}</td>

<td>${fee.course}</td>

<td>₹${fee.totalFee}</td>

<td>₹${fee.paidAmount}</td>

<td>₹${fee.remainingAmount}</td>

<td>${fee.paymentStatus}</td>

</tr>

`;

});

document.getElementById("feeReportTable").innerHTML=rows;

});

}

// =============================
// Search
// =============================

function searchReports() {

    const student = document.getElementById("searchStudent").value;
    const course = document.getElementById("searchCourse").value;
    const date = document.getElementById("searchDate").value;
    const status = document.getElementById("searchStatus").value;

    // ---------------- Student Report ----------------

    fetch(STUDENT_URL)
        .then(res => res.json())
        .then(data => {

            let rows = "";

            data.filter(s => {

                if(student && s.id != student)
                    return false;

                if(course && s.course != course)
                    return false;

                return true;

            }).forEach(student => {

                rows += `
                <tr>
                    <td>${student.id}</td>
                    <td>${student.name}</td>
                    <td>${student.email}</td>
                    <td>${student.course}</td>
                    <td>₹${student.fee}</td>
                </tr>
                `;

            });

            document.getElementById("studentReportTable").innerHTML = rows;

        });

    // ---------------- Attendance Report ----------------

    fetch(ATTENDANCE_URL)
        .then(res => res.json())
        .then(data => {

            let rows = "";

            data.filter(att => {

                if(student && att.studentId != student)
                    return false;

                if(date && att.attendanceDate != date)
                    return false;

                if(status && att.status != status)
                    return false;

                return true;

            }).forEach(att => {

                rows += `
                <tr>
                    <td>${att.studentId}</td>
                    <td>${att.attendanceDate}</td>
                    <td>${att.status}</td>
                </tr>
                `;

            });

            document.getElementById("attendanceReportTable").innerHTML = rows;

        });

    // ---------------- Fee Report ----------------

    fetch(FEE_URL)
        .then(res => res.json())
        .then(data => {

            let rows = "";

            data.filter(fee => {

                if(course && fee.course != course)
                    return false;

                if(student && fee.studentId != student)
                    return false;

                return true;

            }).forEach(fee => {

                rows += `
                <tr>
                    <td>${fee.studentName}</td>
                    <td>${fee.course}</td>
                    <td>₹${fee.totalFee}</td>
                    <td>₹${fee.paidAmount}</td>
                    <td>₹${fee.remainingAmount}</td>
                    <td>${fee.paymentStatus}</td>
                </tr>
                `;

            });

            document.getElementById("feeReportTable").innerHTML = rows;

        });

}
// =============================
// Reset
// =============================

function resetReports(){

document.getElementById("searchStudent").value="";

document.getElementById("searchCourse").value="";

document.getElementById("searchDate").value="";

document.getElementById("searchStatus").value="";

loadReports();

}

// =============================
// Export
// =============================

function exportPDF() {

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("EduTrack Student Management Report", 14, 18);

    doc.setFontSize(11);
    doc.text("Generated : " + new Date().toLocaleString(), 14, 26);

    //----------------------------
    // Student Report
    //----------------------------

    let studentRows = [];

    document.querySelectorAll("#studentReportTable tr").forEach(row => {

        let data = [];

        row.querySelectorAll("td").forEach(td => {

            data.push(td.innerText);

        });

        if(data.length>0)
            studentRows.push(data);

    });

    doc.autoTable({

        startY:35,

        head:[["ID","Name","Email","Course","Fee"]],

        body:studentRows

    });

    //----------------------------
    // Attendance
    //----------------------------

    let attendanceRows=[];

    document.querySelectorAll("#attendanceReportTable tr").forEach(row=>{

        let data=[];

        row.querySelectorAll("td").forEach(td=>{

            data.push(td.innerText);

        });

        if(data.length>0)
            attendanceRows.push(data);

    });

    doc.autoTable({

        startY:doc.lastAutoTable.finalY+15,

        head:[["Student","Date","Status"]],

        body:attendanceRows

    });

    //----------------------------
    // Fee Report
    //----------------------------

    let feeRows=[];

    document.querySelectorAll("#feeReportTable tr").forEach(row=>{

        let data=[];

        row.querySelectorAll("td").forEach(td=>{

            data.push(td.innerText);

        });

        if(data.length>0)
            feeRows.push(data);

    });

    doc.autoTable({

        startY:doc.lastAutoTable.finalY+15,

        head:[["Student","Course","Total","Paid","Remaining","Status"]],

        body:feeRows

    });

    doc.save("EduTrack_Report.pdf");

}

function exportExcel() {

    const workbook = XLSX.utils.book_new();

    // Student Report
    const studentSheet = XLSX.utils.table_to_sheet(
        document.querySelector("#studentReportTable").parentElement
    );

    XLSX.utils.book_append_sheet(workbook, studentSheet, "Students");

    // Attendance Report
    const attendanceSheet = XLSX.utils.table_to_sheet(
        document.querySelector("#attendanceReportTable").parentElement
    );

    XLSX.utils.book_append_sheet(workbook, attendanceSheet, "Attendance");

    // Fee Report
    const feeSheet = XLSX.utils.table_to_sheet(
        document.querySelector("#feeReportTable").parentElement
    );

    XLSX.utils.book_append_sheet(workbook, feeSheet, "Fees");

    XLSX.writeFile(workbook, "EduTrack_Report.xlsx");

}