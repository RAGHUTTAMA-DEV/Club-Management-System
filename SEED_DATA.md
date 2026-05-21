# 🎓 Seed Data & Login Credentials

Complete test data seeded into the database with login information and role hierarchy.

---

## 🔑 Login Credentials

### Student Accounts (Use `student_id` to login)

#### 📍 Coding Club Leadership
| Student ID | Name | Role in Coding Club | Password | Permission Level |
|---|---|---|---|---|
| **STU001** | Rahul Kumar | President | N/A (use student_id) | ⭐⭐⭐ Full Control |
| **STU002** | Priya Sharma | Vice-President | N/A (use student_id) | ⭐⭐⭐ Full Control (except delete) |
| **STU003** | Arjun Singh | Secretary | N/A (use student_id) | ⭐⭐ Can create events |
| **STU004** | Neha Patel | Treasurer | N/A (use student_id) | ⭐ Can post announcements |
| **STU007** | Rohan Gupta | Member | N/A (use student_id) | ⭐ Can post announcements |

#### ⚽ Sports Club Leadership
| Student ID | Name | Role in Sports Club | Permission Level |
|---|---|---|---|
| **STU005** | Vikram Reddy | President | ⭐⭐⭐ Full Control |
| **STU008** | Divya Singh | Vice-President | ⭐⭐⭐ Full Control (except delete) |
| **STU001** | Rahul Kumar | Member | ⭐ Can post announcements |

#### 🎨 Art & Culture Club Leadership
| Student ID | Name | Role in Club | Permission Level |
|---|---|---|---|
| **STU006** | Anjali Verma | President | ⭐⭐⭐ Full Control |
| **STU002** | Priya Sharma | Member | ⭐ Can post announcements |

#### 🚀 Non-Member Student
| Student ID | Name | Clubs | Permission Level |
|---|---|---|---|
| **STU006** | Anjali Verma | Not in any club | Can only view public data |

---

## 🧪 Test Scenarios

### Scenario 1: Full Leadership Control
**Login:** STU001 (Rahul - Coding Club President)
- ✅ Create events for Coding Club
- ✅ Edit events
- ✅ Delete events
- ✅ Edit/delete announcements
- ✅ Post announcements

```bash
# Login
POST /api/auth/login
{
  "student_id": "STU001"
}
```

### Scenario 2: Limited Leadership (VP)
**Login:** STU002 (Priya - Vice-President of Coding Club)
- ✅ Create events
- ✅ Edit events
- ❌ Cannot delete events (only President can)
- ✅ Edit/delete announcements

### Scenario 3: Event Creator Only (Secretary)
**Login:** STU003 (Arjun - Secretary of Coding Club)
- ✅ Create events
- ✅ Edit events
- ❌ Cannot delete events
- ❌ Cannot edit/delete announcements (only leaders can)

### Scenario 4: Regular Member
**Login:** STU004 (Neha - Treasurer of Coding Club)
- ❌ Cannot create events
- ✅ Can post announcements
- ❌ Cannot edit/delete announcements

### Scenario 5: Multi-Club Member
**Login:** STU001 (Rahul - Member of Sports Club, President of Coding Club)
- Can create events in Coding Club (as President)
- Cannot create events in Sports Club (as Member only)
- Can see both clubs' content

### Scenario 6: Non-Member
**Login:** STU006 (Anjali - Not in Sports Club)
- ❌ Cannot create events in Sports Club
- ❌ Cannot post to Sports Club
- ✅ Can view clubs, events, announcements

---

## 🏫 Students Directory

### All 8 Students Created

```
1. STU001 - Rahul Kumar
   📧 Email: rahul@college.edu
   📞 Phone: 9876543210
   🎓 Year: 2nd Year
   🏢 Department: Computer Science
   🎭 Clubs: Coding Club (President), Sports Club (Member)

2. STU002 - Priya Sharma
   📧 Email: priya@college.edu
   📞 Phone: 9876543211
   🎓 Year: 2nd Year
   🏢 Department: Computer Science
   🎭 Clubs: Coding Club (VP), Art & Culture (Member)

3. STU003 - Arjun Singh
   📧 Email: arjun@college.edu
   📞 Phone: 9876543212
   🎓 Year: 1st Year
   🏢 Department: Computer Science
   🎭 Clubs: Coding Club (Secretary)

4. STU004 - Neha Patel
   📧 Email: neha@college.edu
   📞 Phone: 9876543213
   🎓 Year: 3rd Year
   🏢 Department: Electronics
   🎭 Clubs: Coding Club (Treasurer)

5. STU005 - Vikram Reddy
   📧 Email: vikram@college.edu
   📞 Phone: 9876543214
   🎓 Year: 2nd Year
   🏢 Department: Mechanical
   🎭 Clubs: Sports Club (President)

6. STU006 - Anjali Verma
   📧 Email: anjali@college.edu
   📞 Phone: 9876543215
   🎓 Year: 1st Year
   🏢 Department: Civil
   🎭 Clubs: Art & Culture (President)

7. STU007 - Rohan Gupta
   📧 Email: rohan@college.edu
   📞 Phone: 9876543216
   🎓 Year: 3rd Year
   🏢 Department: Computer Science
   🎭 Clubs: Coding Club (Member)

8. STU008 - Divya Singh
   📧 Email: divya@college.edu
   📞 Phone: 9876543217
   🎓 Year: 2nd Year
   🏢 Department: Electronics
   🎭 Clubs: Sports Club (Vice-President)
```

---

## 🏛️ Clubs Directory

### Coding Club (CLUB001)
- **Coordinator:** Dr. Amit Patel
- **Description:** For programming enthusiasts. Learn new languages and frameworks.
- **Members:** 5
  - Rahul Kumar (President)
  - Priya Sharma (VP)
  - Arjun Singh (Secretary)
  - Neha Patel (Treasurer)
  - Rohan Gupta (Member)

### Sports Club (CLUB002)
- **Coordinator:** Mr. Ramesh Kumar
- **Description:** Organize sports events and fitness activities.
- **Members:** 3
  - Vikram Reddy (President)
  - Divya Singh (Vice-President)
  - Rahul Kumar (Member)

### Art & Culture Club (CLUB003)
- **Coordinator:** Ms. Priya Nair
- **Description:** Celebrate arts, culture, and creativity.
- **Members:** 2
  - Anjali Verma (President)
  - Priya Sharma (Member)

---

## 📅 Events Created

```
1. Coding Hackathon 2024 (EVT001)
   Club: Coding Club
   Date: June 15, 2026 @ 09:00
   Venue: Lab Block, Room 101
   Status: Upcoming
   Description: 24-hour coding competition
   Registrations: 2 (STU001, STU002)

2. Web Development Workshop (EVT002)
   Club: Coding Club
   Date: May 28, 2026 @ 14:00
   Venue: Lab Block, Room 202
   Status: Upcoming
   Description: Learn React, Node.js, MongoDB
   Registrations: 2 (STU003, STU004)

3. Football Tournament (EVT003)
   Club: Sports Club
   Date: June 10, 2026 @ 15:00
   Venue: Main Ground
   Status: Upcoming
   Description: Inter-department championship
   Registrations: 2 (STU005, STU008)

4. Art Exhibition (EVT004)
   Club: Art & Culture Club
   Date: May 30, 2026 @ 10:00
   Venue: Main Hall
   Status: Upcoming
   Description: Photography, paintings, sculptures
   Registrations: 1 (STU006)

5. Git & GitHub Basics (EVT005)
   Club: Coding Club
   Date: June 5, 2026 @ 16:00
   Venue: Lab Block, Room 301
   Status: Upcoming
   Description: Version control essentials
   Registrations: 1 (STU007)

6. Badminton Championship (EVT006)
   Club: Sports Club
   Date: June 20, 2026 @ 17:00
   Venue: Sports Complex
   Status: Upcoming
   Description: Singles and doubles tournament
   Registrations: 0
```

---

## 📢 Announcements Created

```
1. Hackathon Registration Open!
   Club: Coding Club
   Posted: May 20, 2026
   Content: Join us for the biggest coding event. Teams of 3-4 members.

2. Workshop Materials Updated
   Club: Coding Club
   Posted: May 19, 2026
   Content: Web dev materials available in our GitHub repo.

3. Tournament Rules & Schedule
   Club: Sports Club
   Posted: May 18, 2026
   Content: Football tournament on June 10. Each team plays 2 matches.

4. Art Exhibition - Last Minute Call
   Club: Art & Culture
   Posted: May 21, 2026
   Content: Submit artwork by May 28. All mediums welcome.

5. General Meeting - June 1st
   Club: Coding Club
   Posted: May 17, 2026
   Content: Monthly meeting at 5 PM in Lab Block.
```

---

## 🔐 Permission Quick Reference

### Who Can Create Events?
✅ **President, Vice-President, Secretary** of a club

### Who Can Edit Events?
✅ **President, Vice-President, Secretary** of a club

### Who Can Delete Events?
✅ **President, Vice-President** of a club only

### Who Can Post Announcements?
✅ **Any club member** (President through regular Member)

### Who Can Edit Announcements?
✅ **President, Vice-President** of the club only

### Who Can Delete Announcements?
✅ **President, Vice-President** of the club only

---

## 🚀 Quick Start Testing

### Test 1: Leader Creates Event
```bash
# Login as STU001 (President)
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"student_id":"STU001"}'

# Use returned token to create event
curl -X POST http://localhost:5000/api/events \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "event_id":"EVT999",
    "event_name":"New Event",
    "club_id":"<CLUB001_ID>",
    "venue":"Somewhere"
  }'
# Result: ✅ 201 Created
```

### Test 2: Non-Leader Tries to Create Event
```bash
# Login as STU004 (Treasurer - not a leader)
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"student_id":"STU004"}'

# Try to create event with same token
curl -X POST http://localhost:5000/api/events \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{...}'
# Result: ❌ 403 Forbidden
```

### Test 3: Member Posts Announcement
```bash
# Login as STU003 (Secretary - can post announcements)
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"student_id":"STU003"}'

# Post announcement
curl -X POST http://localhost:5000/api/announcements \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "announcement_id":"ANN999",
    "club_id":"<CLUB001_ID>",
    "title":"New Announcement",
    "content":"Some content"
  }'
# Result: ✅ 201 Created
```

---

## 🛠️ Running the Seed

```bash
# From server directory
npm run seed

# Output:
# ✅ Connected to MongoDB
# 🧹 Cleared existing data
# ✅ Created 8 students
# ✅ Created 3 clubs
# ✅ Created 10 memberships
# ✅ Created 6 events
# ✅ Created 8 event registrations
# ✅ Created 5 announcements
# 
# 📊 DATABASE SEEDED SUCCESSFULLY!
```

---

**Notes:**
- No password is required. Login uses only `student_id`
- JWT tokens expire after 24 hours
- All dates in seed data are set to May-June 2026
- Some students are members of multiple clubs (e.g., Rahul is in 2 clubs)
- This provides comprehensive test coverage for all authorization scenarios

Happy Testing! 🎉
