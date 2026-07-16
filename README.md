# Freelancer CRM System

## 📌 Project Overview

Freelancer CRM System is a web-based application developed to help freelancers efficiently manage their clients, projects, time logs, milestones, invoices, and overall project progress. The system provides a simple and user-friendly interface for organizing freelance work from a single dashboard.

---

## 🎯 Objectives

- Manage freelance projects efficiently.
- Track working hours using time logs.
- Manage project milestones.
- Generate invoices based on hourly work.
- Display analytics through a dashboard.
- Provide secure user authentication.

---

## ✨ Features

- User Registration
- User Login & Logout
- Dashboard with statistics
- Project Management (Create, Read, Update, Delete)
- Time Log Management
- Milestone Management
- Invoice Generation
- Analytics Dashboard
- Dark / Light Mode

---

## 🛠 Technology Stack

### Frontend
- React.js
- React Router DOM
- Axios
- CSS

### Backend
- Python
- Flask
- Flask SQLAlchemy
- Flask CORS

### Database
- SQLite

### Development Tools
- VS Code
- Git
- GitHub


## 📂 Project Structure

```
FreelancerCRM/
│
├── Backend/
│   ├── app.py
│   ├── models.py
│   ├── database.db
│   └── requirements.txt
│
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

---
## Database design
1. Users Table
CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(100)
);

This table stores user account details such as name, email, and password.

2. Projects Table
CREATE TABLE projects (
    id INTEGER PRIMARY KEY,
    title VARCHAR(200),
    description TEXT,
    status VARCHAR(50)
);

This table stores project details including project title, description, and current status.

3. Milestones Table
CREATE TABLE milestones (
    id INTEGER PRIMARY KEY,
    project_id INTEGER,
    title VARCHAR(200),
    status VARCHAR(50),
    FOREIGN KEY (project_id) REFERENCES projects(id)
);

This table stores milestone details and connects each milestone with its related project.

4. Time Logs Table
CREATE TABLE time_logs (
    id INTEGER PRIMARY KEY,
    project_id INTEGER,
    hours FLOAT,
    work_description TEXT,
    FOREIGN KEY (project_id) REFERENCES projects(id)
);

This table stores the working hours and work details recorded for each project.

5. Invoices Table
CREATE TABLE invoices (
    id INTEGER PRIMARY KEY,
    project_id INTEGER,
    total_hours FLOAT,
    hourly_rate FLOAT,
    total_amount FLOAT,
    FOREIGN KEY (project_id) REFERENCES projects(id)
);

This table stores invoice details such as total hours, hourly rate, and calculated invoice amount.

## ⚙ Installation

### Backend

```bash
cd Backend
pip install -r requirements.txt
python app.py
```

### Frontend

```bash
cd Frontend
npm install
npm run dev
```

---

## 📊 Modules

- Authentication Module
- Dashboard Module
- Project Module
- Time Log Module
- Milestone Module
- Invoice Module
- Analytics Module

---

## 🗄 Database

Tables used:

- Users
- Projects
- Time Logs
- Milestones
- Invoices

---

## 🚀 Future Scope

- Email Notifications
- PDF Invoice Download
- Cloud Database
- Client Portal
- Role Based Authentication
- Deployment on Cloud

---

## 👩‍💻 Developed By

**Laxmi Parshuram Narvekar**

---

## 📄 License

This project is developed for academic purposes.
