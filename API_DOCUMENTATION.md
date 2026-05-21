# 📚 API Documentation - Club Management System

Complete guide to all API endpoints, request/response formats, and usage examples.

---

## 🔗 Base URL

```
http://localhost:5000/api
```

All endpoints use JSON for request and response bodies.

---

## 📊 API Endpoints Overview

| Entity | GET | POST | PATCH | DELETE |
|--------|-----|------|-------|--------|
| Students | ✅ | ✅ | ✅ | ✅ |
| Clubs | ✅ | ✅ | ✅ | ✅ |
| Memberships | ✅ | ✅ | ✅ | ✅ |
| Events | ✅ | ✅ | ✅ | ✅ |
| Event Registrations | ✅ | ✅ | ✅ | ✅ |
| Announcements | ✅ | ✅ | ✅ | ✅ |

---

## 👨‍🎓 Students API

### GET /students
Get all students in the system.

**Request:**
```bash
GET http://localhost:5000/api/students
```

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "student_id": "STU001",
    "name": "John Doe",
    "email": "john@college.edu",
    "phone": "9876543210",
    "year": "2nd Year",
    "department": "Computer Science",
    "createdAt": "2024-01-15T10:30:00Z"
  },
  {
    "_id": "507f1f77bcf86cd799439012",
    "student_id": "STU002",
    "name": "Jane Smith",
    "email": "jane@college.edu",
    "phone": "9876543211",
    "year": "1st Year",
    "department": "Electronics",
    "createdAt": "2024-01-16T10:30:00Z"
  }
]
```

---

### GET /students/:id
Get a specific student with their club memberships.

**Request:**
```bash
GET http://localhost:5000/api/students/507f1f77bcf86cd799439011
```

**Response:**
```json
{
  "student": {
    "_id": "507f1f77bcf86cd799439011",
    "student_id": "STU001",
    "name": "John Doe",
    "email": "john@college.edu",
    "phone": "9876543210",
    "year": "2nd Year",
    "department": "Computer Science",
    "createdAt": "2024-01-15T10:30:00Z"
  },
  "memberships": [
    {
      "_id": "507f1f77bcf86cd799439020",
      "student_id": "507f1f77bcf86cd799439011",
      "club_id": "507f1f77bcf86cd799439050",
      "role": "President",
      "join_date": "2024-01-20T00:00:00Z"
    }
  ]
}
```

---

### POST /students
Create a new student.

**Request:**
```bash
POST http://localhost:5000/api/students
Content-Type: application/json

{
  "student_id": "STU003",
  "name": "Alex Johnson",
  "email": "alex@college.edu",
  "phone": "9876543212",
  "year": "3rd Year",
  "department": "Mechanical Engineering"
}
```

**Response (201 Created):**
```json
{
  "_id": "507f1f77bcf86cd799439013",
  "student_id": "STU003",
  "name": "Alex Johnson",
  "email": "alex@college.edu",
  "phone": "9876543212",
  "year": "3rd Year",
  "department": "Mechanical Engineering",
  "createdAt": "2024-01-17T10:30:00Z"
}
```

---

### PATCH /students/:id
Update an existing student.

**Request:**
```bash
PATCH http://localhost:5000/api/students/507f1f77bcf86cd799439011
Content-Type: application/json

{
  "phone": "9999999999",
  "year": "3rd Year"
}
```

**Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "student_id": "STU001",
  "name": "John Doe",
  "email": "john@college.edu",
  "phone": "9999999999",
  "year": "3rd Year",
  "department": "Computer Science",
  "createdAt": "2024-01-15T10:30:00Z"
}
```

---

### DELETE /students/:id
Delete a student (also deletes their memberships).

**Request:**
```bash
DELETE http://localhost:5000/api/students/507f1f77bcf86cd799439011
```

**Response (200 OK):**
```json
{
  "message": "Student deleted successfully"
}
```

---

## 🎭 Clubs API

### GET /clubs
Get all clubs.

**Request:**
```bash
GET http://localhost:5000/api/clubs
```

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439050",
    "club_id": "CLUB001",
    "club_name": "Coding Club",
    "description": "Learn programming and build projects",
    "faculty_coordinator": "Dr. Smith",
    "logo": "https://example.com/logo.png",
    "createdAt": "2024-01-10T10:30:00Z"
  }
]
```

---

### GET /clubs/:id
Get club details with members, events, and announcements.

**Request:**
```bash
GET http://localhost:5000/api/clubs/507f1f77bcf86cd799439050
```

**Response:**
```json
{
  "club": {
    "_id": "507f1f77bcf86cd799439050",
    "club_id": "CLUB001",
    "club_name": "Coding Club",
    "description": "Learn programming and build projects",
    "faculty_coordinator": "Dr. Smith",
    "logo": "https://example.com/logo.png",
    "createdAt": "2024-01-10T10:30:00Z"
  },
  "members": [
    {
      "_id": "507f1f77bcf86cd799439020",
      "student_id": {
        "_id": "507f1f77bcf86cd799439011",
        "name": "John Doe",
        "student_id": "STU001"
      },
      "club_id": "507f1f77bcf86cd799439050",
      "role": "President",
      "join_date": "2024-01-20T00:00:00Z"
    }
  ],
  "events": [],
  "announcements": []
}
```

---

### POST /clubs
Create a new club.

**Request:**
```bash
POST http://localhost:5000/api/clubs
Content-Type: application/json

{
  "club_id": "CLUB002",
  "club_name": "Photography Club",
  "description": "Capture moments through photography",
  "faculty_coordinator": "Ms. Johnson",
  "logo": "https://example.com/photo-logo.png"
}
```

**Response (201 Created):**
```json
{
  "_id": "507f1f77bcf86cd799439051",
  "club_id": "CLUB002",
  "club_name": "Photography Club",
  "description": "Capture moments through photography",
  "faculty_coordinator": "Ms. Johnson",
  "logo": "https://example.com/photo-logo.png",
  "createdAt": "2024-01-18T10:30:00Z"
}
```

---

### PATCH /clubs/:id
Update club details.

**Request:**
```bash
PATCH http://localhost:5000/api/clubs/507f1f77bcf86cd799439050
Content-Type: application/json

{
  "description": "Learn programming, web dev, and competitive coding",
  "faculty_coordinator": "Dr. Brown"
}
```

**Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439050",
  "club_id": "CLUB001",
  "club_name": "Coding Club",
  "description": "Learn programming, web dev, and competitive coding",
  "faculty_coordinator": "Dr. Brown",
  "logo": "https://example.com/logo.png",
  "createdAt": "2024-01-10T10:30:00Z"
}
```

---

### DELETE /clubs/:id
Delete a club (cascades to memberships, events, announcements).

**Request:**
```bash
DELETE http://localhost:5000/api/clubs/507f1f77bcf86cd799439050
```

**Response (200 OK):**
```json
{
  "message": "Club deleted successfully"
}
```

---

## 👥 Memberships API

### GET /memberships
Get all memberships with populated student and club info.

**Request:**
```bash
GET http://localhost:5000/api/memberships
```

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439020",
    "membership_id": "MEM001",
    "student_id": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@college.edu"
    },
    "club_id": {
      "_id": "507f1f77bcf86cd799439050",
      "club_name": "Coding Club"
    },
    "role": "President",
    "join_date": "2024-01-20T00:00:00Z"
  }
]
```

---

### GET /memberships/club/:clubId
Get all members of a specific club.

**Request:**
```bash
GET http://localhost:5000/api/memberships/club/507f1f77bcf86cd799439050
```

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439020",
    "membership_id": "MEM001",
    "student_id": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@college.edu",
      "phone": "9876543210"
    },
    "club_id": "507f1f77bcf86cd799439050",
    "role": "President",
    "join_date": "2024-01-20T00:00:00Z"
  }
]
```

---

### POST /memberships
Create a new membership (add student to club).

**Request:**
```bash
POST http://localhost:5000/api/memberships
Content-Type: application/json

{
  "membership_id": "MEM002",
  "student_id": "507f1f77bcf86cd799439012",
  "club_id": "507f1f77bcf86cd799439050",
  "role": "Vice-President"
}
```

**Response (201 Created):**
```json
{
  "_id": "507f1f77bcf86cd799439021",
  "membership_id": "MEM002",
  "student_id": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Jane Smith"
  },
  "club_id": {
    "_id": "507f1f77bcf86cd799439050",
    "club_name": "Coding Club"
  },
  "role": "Vice-President",
  "join_date": "2024-01-21T10:30:00Z"
}
```

---

### PATCH /memberships/:id
Update membership role.

**Request:**
```bash
PATCH http://localhost:5000/api/memberships/507f1f77bcf86cd799439021
Content-Type: application/json

{
  "role": "Secretary"
}
```

**Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439021",
  "membership_id": "MEM002",
  "student_id": "507f1f77bcf86cd799439012",
  "club_id": "507f1f77bcf86cd799439050",
  "role": "Secretary",
  "join_date": "2024-01-21T10:30:00Z"
}
```

---

### DELETE /memberships/:id
Remove student from club.

**Request:**
```bash
DELETE http://localhost:5000/api/memberships/507f1f77bcf86cd799439021
```

**Response (200 OK):**
```json
{
  "message": "Membership deleted successfully"
}
```

---

## 📅 Events API

### GET /events
Get all events (sorted by date, newest first).

**Request:**
```bash
GET http://localhost:5000/api/events
```

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439100",
    "event_id": "EVT001",
    "event_name": "Coding Hackathon",
    "venue": "Lab Block",
    "club_id": {
      "_id": "507f1f77bcf86cd799439050",
      "club_name": "Coding Club"
    },
    "status": "Upcoming",
    "date": "2024-02-15T00:00:00Z",
    "time": "10:00",
    "description": "24-hour coding competition",
    "createdAt": "2024-01-22T10:30:00Z"
  }
]
```

---

### GET /events/:id
Get event details with all registrations.

**Request:**
```bash
GET http://localhost:5000/api/events/507f1f77bcf86cd799439100
```

**Response:**
```json
{
  "event": {
    "_id": "507f1f77bcf86cd799439100",
    "event_id": "EVT001",
    "event_name": "Coding Hackathon",
    "venue": "Lab Block",
    "club_id": {
      "_id": "507f1f77bcf86cd799439050",
      "club_name": "Coding Club"
    },
    "status": "Upcoming",
    "date": "2024-02-15T00:00:00Z",
    "time": "10:00",
    "description": "24-hour coding competition",
    "createdAt": "2024-01-22T10:30:00Z"
  },
  "registrations": [
    {
      "_id": "507f1f77bcf86cd799439110",
      "registration_id": "REG001",
      "student_id": {
        "_id": "507f1f77bcf86cd799439011",
        "name": "John Doe"
      },
      "event_id": "507f1f77bcf86cd799439100",
      "registration_date": "2024-01-25T10:30:00Z",
      "attendance_status": "Registered"
    }
  ]
}
```

---

### POST /events
Create a new event.

**Request:**
```bash
POST http://localhost:5000/api/events
Content-Type: application/json

{
  "event_id": "EVT002",
  "event_name": "Photography Walk",
  "venue": "Campus Garden",
  "club_id": "507f1f77bcf86cd799439051",
  "status": "Upcoming",
  "date": "2024-02-20",
  "time": "14:00",
  "description": "Capture campus beauty through lens"
}
```

**Response (201 Created):**
```json
{
  "_id": "507f1f77bcf86cd799439101",
  "event_id": "EVT002",
  "event_name": "Photography Walk",
  "venue": "Campus Garden",
  "club_id": "507f1f77bcf86cd799439051",
  "status": "Upcoming",
  "date": "2024-02-20T00:00:00Z",
  "time": "14:00",
  "description": "Capture campus beauty through lens",
  "createdAt": "2024-01-23T10:30:00Z"
}
```

---

### PATCH /events/:id
Update event details or status.

**Request:**
```bash
PATCH http://localhost:5000/api/events/507f1f77bcf86cd799439100
Content-Type: application/json

{
  "status": "Ongoing",
  "description": "24-hour coding competition - Live now!"
}
```

**Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439100",
  "event_id": "EVT001",
  "event_name": "Coding Hackathon",
  "venue": "Lab Block",
  "club_id": "507f1f77bcf86cd799439050",
  "status": "Ongoing",
  "date": "2024-02-15T00:00:00Z",
  "time": "10:00",
  "description": "24-hour coding competition - Live now!",
  "createdAt": "2024-01-22T10:30:00Z"
}
```

---

### DELETE /events/:id
Delete an event (cascades to registrations).

**Request:**
```bash
DELETE http://localhost:5000/api/events/507f1f77bcf86cd799439100
```

**Response (200 OK):**
```json
{
  "message": "Event deleted successfully"
}
```

---

## ✅ Event Registrations API

### GET /event-registrations
Get all registrations.

**Request:**
```bash
GET http://localhost:5000/api/event-registrations
```

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439110",
    "registration_id": "REG001",
    "student_id": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@college.edu"
    },
    "event_id": {
      "_id": "507f1f77bcf86cd799439100",
      "event_name": "Coding Hackathon",
      "date": "2024-02-15T00:00:00Z"
    },
    "registration_date": "2024-01-25T10:30:00Z",
    "attendance_status": "Registered"
  }
]
```

---

### GET /event-registrations/event/:eventId
Get all registrations for a specific event.

**Request:**
```bash
GET http://localhost:5000/api/event-registrations/event/507f1f77bcf86cd799439100
```

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439110",
    "registration_id": "REG001",
    "student_id": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@college.edu"
    },
    "event_id": "507f1f77bcf86cd799439100",
    "registration_date": "2024-01-25T10:30:00Z",
    "attendance_status": "Registered"
  }
]
```

---

### GET /event-registrations/student/:studentId
Get all registrations for a specific student.

**Request:**
```bash
GET http://localhost:5000/api/event-registrations/student/507f1f77bcf86cd799439011
```

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439110",
    "registration_id": "REG001",
    "student_id": "507f1f77bcf86cd799439011",
    "event_id": {
      "_id": "507f1f77bcf86cd799439100",
      "event_name": "Coding Hackathon",
      "date": "2024-02-15T00:00:00Z"
    },
    "registration_date": "2024-01-25T10:30:00Z",
    "attendance_status": "Registered"
  }
]
```

---

### POST /event-registrations
Register a student for an event.

**Request:**
```bash
POST http://localhost:5000/api/event-registrations
Content-Type: application/json

{
  "registration_id": "REG002",
  "student_id": "507f1f77bcf86cd799439012",
  "event_id": "507f1f77bcf86cd799439100",
  "attendance_status": "Registered"
}
```

**Response (201 Created):**
```json
{
  "_id": "507f1f77bcf86cd799439111",
  "registration_id": "REG002",
  "student_id": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Jane Smith"
  },
  "event_id": {
    "_id": "507f1f77bcf86cd799439100",
    "event_name": "Coding Hackathon"
  },
  "registration_date": "2024-01-26T10:30:00Z",
  "attendance_status": "Registered"
}
```

---

### PATCH /event-registrations/:id
Update attendance status.

**Request:**
```bash
PATCH http://localhost:5000/api/event-registrations/507f1f77bcf86cd799439110
Content-Type: application/json

{
  "attendance_status": "Attended"
}
```

**Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439110",
  "registration_id": "REG001",
  "student_id": "507f1f77bcf86cd799439011",
  "event_id": "507f1f77bcf86cd799439100",
  "registration_date": "2024-01-25T10:30:00Z",
  "attendance_status": "Attended"
}
```

---

### DELETE /event-registrations/:id
Cancel registration.

**Request:**
```bash
DELETE http://localhost:5000/api/event-registrations/507f1f77bcf86cd799439110
```

**Response (200 OK):**
```json
{
  "message": "Registration deleted successfully"
}
```

---

## 📢 Announcements API

### GET /announcements
Get all announcements (sorted by date, newest first).

**Request:**
```bash
GET http://localhost:5000/api/announcements
```

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439200",
    "announcement_id": "ANN001",
    "club_id": {
      "_id": "507f1f77bcf86cd799439050",
      "club_name": "Coding Club"
    },
    "title": "Hackathon Registration Open",
    "content": "Register for our annual 24-hour hackathon! Limited spots available.",
    "posted_date": "2024-01-25T10:30:00Z"
  }
]
```

---

### GET /announcements/club/:clubId
Get all announcements from a specific club.

**Request:**
```bash
GET http://localhost:5000/api/announcements/club/507f1f77bcf86cd799439050
```

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439200",
    "announcement_id": "ANN001",
    "club_id": "507f1f77bcf86cd799439050",
    "title": "Hackathon Registration Open",
    "content": "Register for our annual 24-hour hackathon! Limited spots available.",
    "posted_date": "2024-01-25T10:30:00Z"
  }
]
```

---

### POST /announcements
Create a new announcement.

**Request:**
```bash
POST http://localhost:5000/api/announcements
Content-Type: application/json

{
  "announcement_id": "ANN002",
  "club_id": "507f1f77bcf86cd799439051",
  "title": "Photography Exhibition Coming Soon",
  "content": "Showcase your best photos! Submission deadline: Feb 10"
}
```

**Response (201 Created):**
```json
{
  "_id": "507f1f77bcf86cd799439201",
  "announcement_id": "ANN002",
  "club_id": "507f1f77bcf86cd799439051",
  "title": "Photography Exhibition Coming Soon",
  "content": "Showcase your best photos! Submission deadline: Feb 10",
  "posted_date": "2024-01-27T10:30:00Z"
}
```

---

### PATCH /announcements/:id
Update announcement content.

**Request:**
```bash
PATCH http://localhost:5000/api/announcements/507f1f77bcf86cd799439200
Content-Type: application/json

{
  "title": "Hackathon Registration - Final Call!",
  "content": "Last day to register! Event starts Feb 15."
}
```

**Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439200",
  "announcement_id": "ANN001",
  "club_id": "507f1f77bcf86cd799439050",
  "title": "Hackathon Registration - Final Call!",
  "content": "Last day to register! Event starts Feb 15.",
  "posted_date": "2024-01-25T10:30:00Z"
}
```

---

### DELETE /announcements/:id
Delete an announcement.

**Request:**
```bash
DELETE http://localhost:5000/api/announcements/507f1f77bcf86cd799439200
```

**Response (200 OK):**
```json
{
  "message": "Announcement deleted successfully"
}
```

---

## ⚠️ Error Handling

### Common Error Responses

**404 Not Found:**
```json
{
  "message": "Student not found"
}
```

**400 Bad Request:**
```json
{
  "message": "Validation error or duplicate entry"
}
```

**500 Server Error:**
```json
{
  "message": "Internal server error"
}
```

---

## 🛠️ Quick Reference

### Status Codes
- `200 OK` - Successful GET, PATCH, or DELETE
- `201 Created` - Successful POST
- `400 Bad Request` - Invalid request data
- `404 Not Found` - Resource doesn't exist
- `500 Server Error` - Server issue

### Roles Available
- President
- Vice-President
- Secretary
- Treasurer
- Member

### Event Statuses
- Upcoming
- Ongoing
- Completed
- Cancelled

### Attendance Statuses
- Registered
- Attended
- Absent
- Cancelled

### Student Years
- 1st Year
- 2nd Year
- 3rd Year
- 4th Year

---

## 💡 Usage Tips

1. **Always include required fields** when creating records
2. **Use populated endpoints** for getting related data (e.g., `/clubs/:id` returns members)
3. **Cascade deletes** occur when deleting clubs or events
4. **Sort results** are automatically applied (newest first for events/announcements)
5. **Use MongoDB ObjectIds** for referencing other documents
6. **Dates are in ISO 8601 format** (YYYY-MM-DD or full timestamp)

---

## 🔄 Common Workflows

### Add Student to Club
1. Create student: `POST /students`
2. Create membership: `POST /memberships` (with student_id and club_id)

### Create Event with Registration
1. Create event: `POST /events`
2. Register students: `POST /event-registrations`
3. Track attendance: `PATCH /event-registrations/:id`

### Post Club Announcement
1. Create announcement: `POST /announcements`
2. Students can view: `GET /announcements/club/:clubId`

---

Built with ❤️ for College Club Management System
