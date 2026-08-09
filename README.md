# 🎓 EduTrack - Student Management System

A full-stack **Student Management System** built using **Spring Boot, Spring Data JPA, Hibernate, MySQL, HTML, CSS and JavaScript**.

EduTrack provides separate **Admin and Student portals** to manage students, courses, attendance and fee details through a clean and responsive web interface.

---

## 📌 About The Project

**EduTrack** is a beginner-friendly full-stack Java project designed to demonstrate how a real-world Student Management System can be developed using **Spring Boot REST APIs** and a **frontend built with HTML, CSS and JavaScript**.

The system provides role-based access for:

- 👨‍💼 **Admin**
- 🎓 **Student**

The Admin can manage student information, courses, attendance and fees, while students can log in to their own portal and view their personal information, attendance and fee details.

---

## ✨ Features

### 👨‍💼 Admin Portal

- 🔐 Admin Login
- 👤 Dynamic Admin Name
- 📊 Admin Dashboard
- 🎓 Student Management
- ➕ Add Student
- ✏️ Update Student
- 🗑️ Delete Student
- 🔎 Search Students
- 📚 Course Management
- ➕ Add Course
- ✏️ Update Course
- 🗑️ Delete Course
- 📅 Attendance Management
- ✅ Mark Student Attendance
- ✏️ Update Attendance
- 🗑️ Delete Attendance
- 🔍 Search Attendance
- 📆 Date-wise Attendance
- 🚫 Duplicate Attendance Prevention
- 💰 Fee Management
- ➕ Add Fee Record
- ✏️ Update Fee Record
- 🗑️ Delete Fee Record
- 🔎 Search Fee Details
- 💵 Automatic Remaining Fee Calculation
- 📈 Payment Status Tracking
- 🔄 Refresh Functionality
- 🚪 Admin Logout

---

### 🎓 Student Portal

- 🔐 Student Login
- 👤 Dynamic Student Information
- 🏠 Student Dashboard
- 📋 My Profile
- 📅 Attendance Details
- 📊 Attendance Percentage
- ✅ Present Days
- ❌ Absent Days
- 📆 Attendance History
- 💰 Fee Details
- 💵 Paid Fee
- 🧾 Remaining Fee
- 📚 Course Information
- 🚪 Student Logout
- 🔄 Dynamic data based on logged-in student

---

## 🛠️ Technologies Used

### Backend

- ☕ Java
- 🌱 Spring Boot
- 🌱 Spring Data JPA
- 🔄 Hibernate ORM
- 🌐 REST APIs
- ✅ Jakarta Validation
- 🗄️ MySQL
- 📦 Maven

### Frontend

- 🌐 HTML5
- 🎨 CSS3
- ⚡ JavaScript
- 🎯 Font Awesome
- 📊 Chart.js
- 🔤 Google Fonts

### Development Tools

- 💻 Eclipse IDE
- 🗄️ MySQL Workbench
- 🧪 Postman
- 🔧 Git
- 🐙 GitHub

---

## 🏗️ Project Architecture

The project follows a layered architecture:

```text
Frontend
   │
   │ HTTP Requests
   ▼
Spring Boot REST Controllers
   │
   ▼
Service Layer
   │
   ▼
Repository Layer
   │
   ▼
Hibernate / JPA
   │
   ▼
MySQL Database


📂 Project Structure
EduTrack-Student-Management-System/
│
├── backend/
│   │
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/
│   │   │   │       └── edutrack/
│   │   │   │           └── studentmanagement/
│   │   │   │
│   │   │   │               ├── authentication/
│   │   │   │               │   ├── Admin.java
│   │   │   │               │   ├── AdminController.java
│   │   │   │               │   ├── AdminRepository.java
│   │   │   │               │   ├── AdminService.java
│   │   │   │               │
│   │   │   │               ├── attendance/
│   │   │   │               │   ├── Attendance.java
│   │   │   │               │   ├── AttendanceController.java
│   │   │   │               │   ├── AttendanceRepository.java
│   │   │   │               │   └── AttendanceService.java
│   │   │   │               │
│   │   │   │               ├── controller/
│   │   │   │               │   └── StudentController.java
│   │   │   │               │
│   │   │   │               ├── entity/
│   │   │   │               │   └── Student.java
│   │   │   │               │
│   │   │   │               ├── fee/
│   │   │   │               │   ├── Fee.java
│   │   │   │               │   ├── FeeController.java
│   │   │   │               │   ├── FeeRepository.java
│   │   │   │               │   └── FeeService.java
│   │   │   │               │
│   │   │   │               ├── repository/
│   │   │   │               │   └── StudentRepository.java
│   │   │   │               │
│   │   │   │               ├── service/
│   │   │   │               │   └── StudentService.java
│   │   │   │               │
│   │   │   │               └── studentauth/
│   │   │   │                   ├── StudentLoginController.java
│   │   │   │                   └── StudentLoginRequest.java
│   │   │   │
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   │
│   │   └── test/
│   │
│   └── pom.xml
│
├── frontend/
│   │
│   ├── admin-login.html
│   ├── admin-login.css
│   ├── admin-login.js
│   │
│   ├── dashboard.html
│   ├── dashboard.css
│   ├── dashboard.js
│   │
│   ├── student.html
│   ├── student.css
│   ├── student.js
│   │
│   ├── course.html
│   ├── course.css
│   ├── course.js
│   │
│   ├── attendance.html
│   ├── attendance.css
│   ├── attendance.js
│   │
│   ├── fee.html
│   ├── fee.css
│   ├── fee.js
│   │
│   ├── student-login.html
│   ├── student-login.css
│   ├── student-login.js
│   │
│   ├── student-dashboard.html
│   ├── student-dashboard.css
│   ├── student-dashboard.js
│   │
│   ├── student-profile.html
│   ├── student-profile.css
│   ├── student-profile.js
│   │
│   ├── student-attendance.html
│   ├── student-attendance.css
│   ├── student-attendance.js
│   │
│   ├── student-fee.html
│   ├── student-fee.css
│   └── student-fee.js
│
└── README.md

The exact folder names may vary depending on the final project organization.

🗄️ Database

The application uses MySQL as the relational database.

Main Tables
admin
student
course
attendance
fees
Student Table

Stores:

Student ID
Name
Email
Course
Fee
Password
Course Table

Stores:

Course ID
Course Name
Course Fee
Attendance Table

Stores:

Attendance ID
Student ID
Attendance Date
Attendance Status
Fee Table

Stores:

Fee ID
Student ID
Student Name
Course
Total Fee
Paid Amount
Remaining Amount
Payment Status
Admin Table

Stores:

Admin ID
Admin Name
Email
Password
🔐 Authentication

EduTrack provides separate login systems.

Admin Login
Admin
  ↓
Admin Login
  ↓
Spring Boot REST API
  ↓
Database Verification
  ↓
Admin Dashboard
Student Login
Student
  ↓
Student Login
  ↓
Spring Boot REST API
  ↓
Database Verification
  ↓
Student Dashboard

After successful login, the logged-in user's information is stored on the frontend and used to display dynamic data.

📊 Admin Dashboard

The Admin Dashboard displays dynamically generated information such as:

👥 Total Students
📚 Total Courses
✅ Present Students
❌ Absent Students
📈 Attendance Chart
🧑‍🎓 Recent Students
📅 Recent Attendance
💰 Recent Fee Records

The dashboard retrieves information from the Spring Boot REST APIs instead of using static data.

📅 Attendance Management

The attendance module allows the Admin to:

Mark attendance
Update attendance
Delete attendance
Search by student
Search by date
View attendance history
Duplicate Prevention

The system prevents multiple attendance records for the same:

Student + Date

For example:

Student ID: 6
Date: 2026-08-08

Only one attendance record should exist for this combination.

This prevents accidental duplicate attendance entries.

💰 Fee Management

The fee module automatically calculates:

Remaining Fee = Total Fee - Paid Amount

The payment status is determined automatically:

Paid
Pending
Partial

Example:

Total Fee     = ₹50,000
Paid Amount   = ₹45,000
Remaining Fee = ₹5,000
Status        = Partial
🎨 User Interface

The application uses a clean and modern interface with:

Responsive layouts
Sidebar navigation
Dashboard cards
Tables
Forms
Search functionality
Status badges
Action buttons
Font Awesome icons
Google Fonts
Charts

The Admin and Student dashboards use separate interfaces based on their respective roles.

🔗 REST API Endpoints
Student APIs
GET     /students
GET     /students/{id}
POST    /students/save
PUT     /students/update
DELETE  /students/delete/{id}
GET     /students/count
Student Authentication
POST    /student/login
Attendance APIs
GET     /attendance
GET     /attendance/{id}
POST    /attendance/save
PUT     /attendance/update
DELETE  /attendance/delete/{id}

GET     /attendance/student/{studentId}
GET     /attendance/date/{date}
GET     /attendance/student/{studentId}/date/{date}

GET     /attendance/present/count
GET     /attendance/absent/count
Fee APIs
GET     /fees
GET     /fees/{id}
POST    /fees/save
PUT     /fees/update
DELETE  /fees/delete/{id}

GET     /fees/student/{studentId}
Admin Authentication
POST    /admin/login
⚙️ Setup & Installation
1️⃣ Clone the Repository
git clone https://github.com/your-username/EduTrack-Student-Management-System.git

Move into the project:

cd EduTrack-Student-Management-System
2️⃣ Configure MySQL

Create a database in MySQL:

CREATE DATABASE edutrack;

Update your Spring Boot configuration in:

application.properties

Example:

spring.datasource.url=jdbc:mysql://localhost:3306/edutrack
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

Replace:

YOUR_PASSWORD

with your MySQL password.

3️⃣ Run the Spring Boot Application

Open the backend project in:

Eclipse
IntelliJ IDEA
Spring Tool Suite

Run the main Spring Boot application.

The backend should start at:

http://localhost:8080
4️⃣ Run the Frontend

Open the frontend files using a local development server.

For example, using VS Code Live Server:

Right Click → Open with Live Server

Then open:

admin-login.html

or

student-login.html
🔑 Login Flow
Admin
Admin Login
     ↓
Admin Authentication
     ↓
Admin Dashboard
     ↓
Student / Course / Attendance / Fee Management
Student
Student Login
     ↓
Student Authentication
     ↓
Student Dashboard
     ↓
Profile / Attendance / Fee Details
🧪 Testing

The REST APIs can be tested using tools such as:

Postman
Browser
Frontend application

Example:

GET http://localhost:8080/students

Example response:

[
    {
        "id": 1,
        "name": "Rahul",
        "email": "rahul@gmail.com",
        "course": "Java Full Stack",
        "fee": 50000
    }
]
🚀 Future Improvements

The current project can be extended with:

🔐 Spring Security
🔑 Password encryption using BCrypt
🎫 JWT Authentication
👥 Role-based authorization
📧 Email notifications
📱 Better mobile responsiveness
📄 PDF report generation
📊 Advanced analytics
🔎 Advanced search and filtering
📈 Student performance reports
🗓️ Timetable management
📢 Student notifications
☁️ Cloud deployment
🐳 Docker support
🎯 Learning Outcomes

Through this project, the following concepts were practiced:

Java
Spring Boot
REST API development
Spring Data JPA
Hibernate
CRUD operations
MySQL database integration
Entity mapping
Repository pattern
Service layer
Controller layer
API integration
JavaScript Fetch API
Dynamic frontend rendering
Form validation
Authentication
Local Storage
MVC architecture
Git and GitHub
