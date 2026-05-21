# 🎓 College Club Management System

A full-stack MERN (MongoDB, Express, React, Node.js) application for managing college clubs, students, events, memberships, and announcements.

## 🚀 Features

### Core CRUD Operations
- **Students Management** - Add, edit, delete, and view student profiles
- **Clubs Management** - Create and manage clubs with descriptions and coordinators
- **Events Management** - Schedule events with attendance tracking
- **Memberships** - Manage student club memberships and roles
- **Event Registration** - Register students for events and track attendance
- **Announcements** - Post and manage club announcements

### Dashboard Features
- Real-time statistics (students, clubs, events, memberships, etc.)
- Recent events feed
- Recent announcements feed
- Quick overview of system activity

### Search & Filter
- Search students by name or ID
- Filter memberships by club and role
- Filter announcements by club and date
- Search events by name

## 📋 Tech Stack

### Backend
- **Node.js** - Server runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM

### Frontend
- **React 18** - UI library
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB running locally or connection string for cloud MongoDB
- npm or yarn

### Step 1: Install Root Dependencies
```bash
cd club-management-system
npm install
```

### Step 2: Install Backend Dependencies
Already handled by root package.json

### Step 3: Install Frontend Dependencies
```bash
cd client
npm install
```

### Step 4: Setup MongoDB
If you don't have MongoDB installed:
- Download from https://www.mongodb.com/try/download/community
- Or use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas

### Step 5: Configure Environment Variables

Create `.env` file in the `server/` directory:
```env
MONGO_URI=mongodb://localhost:27017/club-management
PORT=5000
NODE_ENV=development
```

For MongoDB Atlas:
```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/club-management
PORT=5000
NODE_ENV=development
```

## 🚀 Running the Application

### Option 1: Run Both Server & Client Together (Recommended)
```bash
npm run dev
```
This will start:
- Backend server on `http://localhost:5000`
- Frontend on `http://localhost:5173`

### Option 2: Run Separately

Terminal 1 - Start Backend:
```bash
npm run server
```

Terminal 2 - Start Frontend:
```bash
npm run client
```

## 📖 API Endpoints

### Students
- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get student with memberships
- `POST /api/students` - Create student
- `PATCH /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student

### Clubs
- `GET /api/clubs` - Get all clubs
- `GET /api/clubs/:id` - Get club details
- `POST /api/clubs` - Create club
- `PATCH /api/clubs/:id` - Update club
- `DELETE /api/clubs/:id` - Delete club

### Memberships
- `GET /api/memberships` - Get all memberships
- `GET /api/memberships/club/:clubId` - Get club members
- `POST /api/memberships` - Create membership
- `PATCH /api/memberships/:id` - Update membership
- `DELETE /api/memberships/:id` - Delete membership

### Events
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get event details
- `POST /api/events` - Create event
- `PATCH /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event

### Event Registrations
- `GET /api/event-registrations` - Get all registrations
- `GET /api/event-registrations/event/:eventId` - Get registrations by event
- `GET /api/event-registrations/student/:studentId` - Get registrations by student
- `POST /api/event-registrations` - Create registration
- `PATCH /api/event-registrations/:id` - Update registration
- `DELETE /api/event-registrations/:id` - Delete registration

### Announcements
- `GET /api/announcements` - Get all announcements
- `GET /api/announcements/club/:clubId` - Get club announcements
- `POST /api/announcements` - Create announcement
- `PATCH /api/announcements/:id` - Update announcement
- `DELETE /api/announcements/:id` - Delete announcement

## 📁 Project Structure

```
club-management-system/
├── server/
│   ├── models/
│   │   ├── Student.js
│   │   ├── Club.js
│   │   ├── Membership.js
│   │   ├── Event.js
│   │   ├── EventRegistration.js
│   │   └── Announcement.js
│   ├── routes/
│   │   ├── studentRoutes.js
│   │   ├── clubRoutes.js
│   │   ├── membershipRoutes.js
│   │   ├── eventRoutes.js
│   │   ├── eventRegistrationRoutes.js
│   │   └── announcementRoutes.js
│   ├── .env
│   └── index.js
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── StudentPage.jsx
│   │   │   ├── ClubPage.jsx
│   │   │   ├── EventPage.jsx
│   │   │   ├── MembershipPage.jsx
│   │   │   └── AnnouncementPage.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
└── package.json
```

## 🎨 UI Features

- **Responsive Design** - Works on desktop, tablet, and mobile
- **Color-coded Status Badges** - Visual indicators for event and registration status
- **Interactive Cards** - Hover effects and smooth transitions
- **Form Validation** - Required field validation
- **Real-time Search & Filter** - Instant results as you type
- **Dark Shadows & Gradients** - Modern UI with Tailwind CSS

## 🔐 Data Models

### Student
- student_id (unique)
- name
- email
- phone
- year (1st-4th)
- department
- createdAt

### Club
- club_id (unique)
- club_name
- description
- faculty_coordinator
- logo
- createdAt

### Membership
- membership_id (unique)
- student_id (ref to Student)
- club_id (ref to Club)
- role (President, Vice-President, Secretary, Treasurer, Member)
- join_date

### Event
- event_id (unique)
- event_name
- venue
- club_id (ref to Club)
- status (Upcoming, Ongoing, Completed, Cancelled)
- date
- time
- description

### EventRegistration
- registration_id (unique)
- student_id (ref to Student)
- event_id (ref to Event)
- registration_date
- attendance_status (Registered, Attended, Absent, Cancelled)

### Announcement
- announcement_id (unique)
- club_id (ref to Club)
- title
- content
- posted_date

## 🚀 Future Enhancements

- User authentication & authorization
- File upload for club logos
- Email notifications
- Event attendance QR codes
- Analytics dashboard
- Member achievements/badges
- Discussion forums per club

## 📝 License

MIT License

## 👥 Support

For issues or questions, please create an issue in the repository.

---

**Built with ❤️ for college club management**
