
#  HealthyMe+

A **Full Stack Medical Appointment System** with:

-  **User Portal**
-  **Doctor Portal**
-  **Admin Panel**
-  **AI-based Chat Assistant**

Built using **React.js (Frontend)** and **Node.js, Express, MongoDB (Backend)**. Supports authentication, appointment booking, doctor profile management, real-time chatbot, and payment integration.

---

##  Features

###  User
- Register / Login
- View & Update Profile
- Book Appointments
- Cancel Appointments
- Online Payment Integration
- Chat with AI Assistant

###  Doctor
- Login & Access Dashboard
- View Appointments
- Complete / Cancel Appointments
- Update Profile

###  Admin
- Login to Admin Panel
- Add Doctors with Image Upload
- View / Edit Doctor Availability
- View All Appointments
- Cancel Any Appointment
- Dashboard Overview

---

##  Frontend Repositories

- **User Frontend**: `React.js`  
- **Admin Panel**: `React.js`

> Make sure to clone and run both frontend apps separately.

---

##  Backend Setup

###  Clone Repository
```bash
git clone https://github.com/jaideepbose51/Minnor_Project.git 
```

## Run Each App in Separate Terminals
### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Admin
```bash
cd admin
npm install
npm run dev
```

## Environment Variables for Backend (.env)
```bash
PORT=3000

MONGODB_URL=your_mongodb_connection_string
OPENAI_API_KEY=your_openai_api_key
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret

ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
```
## Hosted Links
-   User Portal:  [https://minnor-project-frontend.onrender.com/](https://minnor-project-frontend.onrender.com/)
    
-   Admin Panel:  [https://minnor-project-admin.onrender.com/](https://minnor-project-admin.onrender.com/)

## Doctor Demo Credentials
**Demo Login (Doctor):**
```bash
Username: recruiter
Email:    recruiter@recruiter.com
Password: @healthyme+
```
