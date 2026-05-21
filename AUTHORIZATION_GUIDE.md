# 🔐 Authorization & Role-Based Access Control Guide

Complete guide to the role-based authorization system in Club Management System.

---

## 📋 Overview

The app uses **JWT token-based authentication** with **role-based access control (RBAC)** based on club membership roles.

### User Roles & Permissions

| Role | Create Events | Edit Events | Delete Events | Post Announcements | Edit Announcements | Delete Announcements |
|------|---|---|---|---|---|---|
| **President** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Vice-President** | ✅ | ✅ | ❌ | ✅ | ✅ | ✅ |
| **Secretary** | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ |
| **Treasurer** | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| **Member** | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| **Non-Member** | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |

---

## 🔑 Authentication Flow

### 1. Login Process

**Endpoint:** `POST /api/auth/login`

**Request:**
```json
{
  "student_id": "STU001"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "student": {
    "_id": "507f1f77bcf86cd799439011",
    "student_id": "STU001",
    "name": "John Doe",
    "email": "john@college.edu",
    "year": "2nd Year",
    "department": "Computer Science"
  },
  "memberships": [
    {
      "_id": "507f1f77bcf86cd799439020",
      "club_id": "507f1f77bcf86cd799439050",
      "club_name": "Coding Club",
      "role": "President"
    }
  ]
}
```

### 2. Token Storage

The token is automatically stored in:
- **localStorage** - For persistence across page refreshes
- **Axios default headers** - For automatic inclusion in all API requests

### 3. Token Verification

**Endpoint:** `GET /api/auth/me`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "userId": "507f1f77bcf86cd799439011",
  "studentId": "STU001"
}
```

---

## 🛡️ Protected Routes

### Events API

#### CREATE Event - Club Leaders Only
```bash
POST /api/events
Authorization: Bearer <token>
Content-Type: application/json

{
  "event_id": "EVT001",
  "event_name": "Coding Hackathon",
  "venue": "Lab Block",
  "club_id": "507f1f77bcf86cd799439050",
  "status": "Upcoming",
  "date": "2024-02-15",
  "time": "10:00",
  "description": "24-hour coding competition"
}
```

**Authorization:**
- ✅ User must be a member of the specified club
- ✅ User role must be: **President**, **Vice-President**, or **Secretary**

**Error Response (403 Forbidden):**
```json
{
  "message": "Only club leaders (President, Vice-President, Secretary) can create events"
}
```

#### UPDATE Event - Club Leaders Only
```bash
PATCH /api/events/507f1f77bcf86cd799439100
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "Ongoing",
  "description": "Event is now live!"
}
```

**Authorization:**
- ✅ User must be a member of the event's club
- ✅ User role must be: **President** or **Vice-President**

#### DELETE Event - Club Leaders Only (Presidents)
```bash
DELETE /api/events/507f1f77bcf86cd799439100
Authorization: Bearer <token>
```

**Authorization:**
- ✅ User must be a member of the event's club
- ✅ User role must be: **President** or **Vice-President**

---

### Announcements API

#### POST Announcement - Club Members Only
```bash
POST /api/announcements
Authorization: Bearer <token>
Content-Type: application/json

{
  "announcement_id": "ANN001",
  "club_id": "507f1f77bcf86cd799439050",
  "title": "Hackathon Registration Open",
  "content": "Register for our annual 24-hour hackathon!"
}
```

**Authorization:**
- ✅ User must be a **member** of the specified club
- ✅ All roles can post (President, Vice-President, Secretary, Treasurer, Member)

**Error Response (403 Forbidden):**
```json
{
  "message": "Only club members can post announcements"
}
```

#### UPDATE Announcement - Club Leaders Only
```bash
PATCH /api/announcements/507f1f77bcf86cd799439200
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Registration - Final Call!",
  "content": "Last day to register for the hackathon!"
}
```

**Authorization:**
- ✅ User must be a member of the announcement's club
- ✅ User role must be: **President** or **Vice-President**

#### DELETE Announcement - Club Leaders Only
```bash
DELETE /api/announcements/507f1f77bcf86cd799439200
Authorization: Bearer <token>
```

**Authorization:**
- ✅ User must be a member of the announcement's club
- ✅ User role must be: **President** or **Vice-President**

---

## 🚀 Frontend Authorization

### AuthContext Hooks

The frontend uses React Context API with utility functions:

```javascript
import { useAuth } from './context/AuthContext'

function MyComponent() {
  const { 
    user,                    // Student object
    token,                   // JWT token
    memberships,             // Array of club memberships
    isAuthenticated,         // Boolean
    isClubLeader,            // Function(clubId) -> Boolean
    isClubMember,            // Function(clubId) -> Boolean
    login,                   // Function(student_id)
    logout                   // Function()
  } = useAuth()
}
```

### Usage Examples

#### Check if User is Club Leader
```javascript
const { isClubLeader, memberships } = useAuth()

// Check for specific club
if (isClubLeader(clubId)) {
  // Show event creation form
  // Show edit/delete buttons
}
```

#### Check if User is Club Member
```javascript
const { isClubMember } = useAuth()

if (isClubMember(clubId)) {
  // Show announcement creation form
  // Show member-only content
}
```

#### Get User Memberships
```javascript
const { memberships } = useAuth()

memberships.forEach(m => {
  console.log(m.club_id)        // Club ID
  console.log(m.club_name)      // Club name
  console.log(m.role)            // 'President', 'Member', etc.
})
```

---

## 🔒 Middleware Implementation

### Backend Auth Middleware

#### verifyToken
Checks if request has valid JWT token in Authorization header.

```javascript
app.get('/api/protected', verifyToken, (req, res) => {
  console.log(req.userId)   // User ID from token
  console.log(req.userRole) // User role from token
})
```

#### isClubLeader
Checks if user is President or Vice-President of specified club.

```javascript
app.post('/api/events', verifyToken, isClubLeader, (req, res) => {
  // User is club leader
  // Request has club_id in body
})
```

#### isClubMember
Checks if user is member of specified club.

```javascript
app.post('/api/announcements', verifyToken, isClubMember, (req, res) => {
  // User is club member
  // Request has club_id in body
})
```

#### checkRole
Checks if user has specific role(s) in club.

```javascript
app.delete('/api/events/:id', 
  verifyToken, 
  checkRole(['President', 'Vice-President']), 
  (req, res) => {
    // User is President or Vice-President
  }
)
```

---

## ❌ Common Authorization Errors

### 401 Unauthorized - No Token
```json
{
  "message": "No token provided"
}
```
**Fix:** Include `Authorization: Bearer <token>` header

### 403 Forbidden - Invalid Role
```json
{
  "message": "Only club leaders can perform this action"
}
```
**Fix:** User must be President or Vice-President of the club

### 403 Forbidden - Not a Member
```json
{
  "message": "Only club members can post announcements"
}
```
**Fix:** User must join the club first

### 403 Forbidden - Invalid Token
```json
{
  "message": "Invalid token"
}
```
**Fix:** Token expired or tampered. Re-login required

---

## 🔄 Complete Login Flow Example

### Step 1: Frontend - User Logs In
```javascript
const { login } = useAuth()

const handleLogin = async () => {
  const result = await login('STU001')
  if (result.success) {
    // User is authenticated
    // Redirect to dashboard
  }
}
```

### Step 2: Backend - Generate Token
```bash
POST /api/auth/login
{
  "student_id": "STU001"
}
```

Backend returns:
- JWT token (valid for 24 hours)
- Student info
- User's club memberships with roles

### Step 3: Frontend - Store Token
```javascript
localStorage.setItem('token', token)
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
```

### Step 4: Protected Requests
```javascript
// Token automatically included in all requests
await axios.post('/api/events', eventData)
// Sends: Authorization: Bearer <token>
```

### Step 5: Logout
```javascript
const { logout } = useAuth()

const handleLogout = () => {
  logout()  // Clears token, redirects to login
}
```

---

## 🎯 Permission Summary

### President
- ✅ Create events for club
- ✅ Edit events
- ✅ Delete events
- ✅ Post announcements
- ✅ Edit announcements
- ✅ Delete announcements

### Vice-President
- ✅ Create events for club
- ✅ Edit events
- ❌ Cannot delete events
- ✅ Post announcements
- ✅ Edit announcements
- ✅ Delete announcements

### Secretary
- ✅ Create events for club
- ✅ Edit events
- ❌ Cannot delete events
- ✅ Post announcements
- ❌ Cannot edit announcements
- ❌ Cannot delete announcements

### Treasurer / Member
- ❌ Cannot create/edit/delete events
- ✅ Post announcements
- ❌ Cannot edit/delete announcements

### Non-Member (Logged In, Not in Club)
- ❌ No permissions for club content
- ✅ Can view public data (clubs, events, announcements)

---

## 🔐 Security Best Practices

1. **Token Storage**
   - Stored in localStorage (persists across sessions)
   - Included in all authenticated requests

2. **Token Expiration**
   - Tokens expire after 24 hours
   - Users must re-login after expiration

3. **Role-Based Access**
   - Verified on both frontend (UX) and backend (security)
   - Backend is authoritative source

4. **Protected Routes**
   - All state-changing operations (POST, PATCH, DELETE) require auth
   - GET requests can be public or protected

5. **Error Handling**
   - 401: Authentication required
   - 403: User authenticated but not authorized
   - Specific error messages help with debugging

---

## 🧪 Testing Authorization

### Using Postman/cURL

```bash
# 1. Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"student_id":"STU001"}'

# Response includes token
# Copy: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# 2. Use token to create event (as club leader)
curl -X POST http://localhost:5000/api/events \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "event_id":"EVT001",
    "event_name":"Hackathon",
    "club_id":"507f1f77bcf86cd799439050",
    "venue":"Lab Block"
  }'

# 3. Try with non-leader account (should get 403)
# Login as different student with Member role
# Repeat event creation - should fail with 403
```

---

## 📞 Support & Troubleshooting

### "Only club leaders can create events"
- Check: Is user a member of the club?
- Check: Is user's role President, Vice-President, or Secretary?

### "No token provided"
- Check: Is Authorization header present?
- Check: Format is `Authorization: Bearer <token>`

### Token expires after 24 hours
- Solution: Auto-logout user and redirect to login page
- User can login again to get fresh token

### Can't see events/announcements
- Check: Are you a member of the club?
- Check: Event status is not 'Cancelled'

---

Built with ❤️ for secure club management
