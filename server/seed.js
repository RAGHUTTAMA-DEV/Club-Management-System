const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

// Import models
const Student = require('./models/Student')
const Club = require('./models/Club')
const Membership = require('./models/Membership')
const Event = require('./models/Event')
const EventRegistration = require('./models/EventRegistration')
const Announcement = require('./models/Announcement')

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/club-management')
    console.log('✅ Connected to MongoDB')

    // Clear existing data
    await Student.deleteMany({})
    await Club.deleteMany({})
    await Membership.deleteMany({})
    await Event.deleteMany({})
    await EventRegistration.deleteMany({})
    await Announcement.deleteMany({})
    console.log('🧹 Cleared existing data')

    // ==================== STUDENTS ====================
    const students = await Student.insertMany([
      {
        student_id: 'STU001',
        name: 'Rahul Kumar',
        email: 'rahul@college.edu',
        phone: '9876543210',
        year: '2nd Year',
        department: 'Computer Science'
      },
      {
        student_id: 'STU002',
        name: 'Priya Sharma',
        email: 'priya@college.edu',
        phone: '9876543211',
        year: '2nd Year',
        department: 'Computer Science'
      },
      {
        student_id: 'STU003',
        name: 'Arjun Singh',
        email: 'arjun@college.edu',
        phone: '9876543212',
        year: '1st Year',
        department: 'Computer Science'
      },
      {
        student_id: 'STU004',
        name: 'Neha Patel',
        email: 'neha@college.edu',
        phone: '9876543213',
        year: '3rd Year',
        department: 'Electronics'
      },
      {
        student_id: 'STU005',
        name: 'Vikram Reddy',
        email: 'vikram@college.edu',
        phone: '9876543214',
        year: '2nd Year',
        department: 'Mechanical'
      },
      {
        student_id: 'STU006',
        name: 'Anjali Verma',
        email: 'anjali@college.edu',
        phone: '9876543215',
        year: '1st Year',
        department: 'Civil'
      },
      {
        student_id: 'STU007',
        name: 'Rohan Gupta',
        email: 'rohan@college.edu',
        phone: '9876543216',
        year: '3rd Year',
        department: 'Computer Science'
      },
      {
        student_id: 'STU008',
        name: 'Divya Singh',
        email: 'divya@college.edu',
        phone: '9876543217',
        year: '2nd Year',
        department: 'Electronics'
      }
    ])
    console.log(`✅ Created ${students.length} students`)

    // ==================== CLUBS ====================
    const clubs = await Club.insertMany([
      {
        club_id: 'CLUB001',
        club_name: 'Coding Club',
        description: 'For programming enthusiasts. Learn new languages and frameworks.',
        faculty_coordinator: 'Dr. Amit Patel',
        logo: '💻'
      },
      {
        club_id: 'CLUB002',
        club_name: 'Sports Club',
        description: 'Organize sports events and fitness activities.',
        faculty_coordinator: 'Mr. Ramesh Kumar',
        logo: '⚽'
      },
      {
        club_id: 'CLUB003',
        club_name: 'Art & Culture Club',
        description: 'Celebrate arts, culture, and creativity.',
        faculty_coordinator: 'Ms. Priya Nair',
        logo: '🎨'
      }
    ])
    console.log(`✅ Created ${clubs.length} clubs`)

    // ==================== MEMBERSHIPS ====================
    const memberships = await Membership.insertMany([
      // Coding Club
      {
        membership_id: 'MEM001',
        student_id: students[0]._id, // STU001 - Rahul
        club_id: clubs[0]._id,
        role: 'President',
        join_date: '2024-01-15'
      },
      {
        membership_id: 'MEM002',
        student_id: students[1]._id, // STU002 - Priya
        club_id: clubs[0]._id,
        role: 'Vice-President',
        join_date: '2024-01-20'
      },
      {
        membership_id: 'MEM003',
        student_id: students[2]._id, // STU003 - Arjun
        club_id: clubs[0]._id,
        role: 'Secretary',
        join_date: '2024-02-01'
      },
      {
        membership_id: 'MEM004',
        student_id: students[3]._id, // STU004 - Neha
        club_id: clubs[0]._id,
        role: 'Treasurer',
        join_date: '2024-02-10'
      },
      {
        membership_id: 'MEM005',
        student_id: students[6]._id, // STU007 - Rohan
        club_id: clubs[0]._id,
        role: 'Member',
        join_date: '2024-02-15'
      },
      // Sports Club
      {
        membership_id: 'MEM006',
        student_id: students[4]._id, // STU005 - Vikram
        club_id: clubs[1]._id,
        role: 'President',
        join_date: '2024-01-10'
      },
      {
        membership_id: 'MEM007',
        student_id: students[7]._id, // STU008 - Divya
        club_id: clubs[1]._id,
        role: 'Vice-President',
        join_date: '2024-01-25'
      },
      {
        membership_id: 'MEM008',
        student_id: students[0]._id, // STU001 - Rahul
        club_id: clubs[1]._id,
        role: 'Member',
        join_date: '2024-03-01'
      },
      // Art & Culture Club
      {
        membership_id: 'MEM009',
        student_id: students[5]._id, // STU006 - Anjali
        club_id: clubs[2]._id,
        role: 'President',
        join_date: '2024-01-05'
      },
      {
        membership_id: 'MEM010',
        student_id: students[1]._id, // STU002 - Priya
        club_id: clubs[2]._id,
        role: 'Member',
        join_date: '2024-02-20'
      }
    ])
    console.log(`✅ Created ${memberships.length} memberships`)

    // ==================== EVENTS ====================
    const events = await Event.insertMany([
      {
        event_id: 'EVT001',
        event_name: 'Coding Hackathon 2024',
        venue: 'Lab Block, Room 101',
        club_id: clubs[0]._id,
        status: 'Upcoming',
        date: '2026-06-15',
        time: '09:00',
        description: '24-hour coding competition. Bring your laptops and ideas!'
      },
      {
        event_id: 'EVT002',
        event_name: 'Web Development Workshop',
        venue: 'Lab Block, Room 202',
        club_id: clubs[0]._id,
        status: 'Upcoming',
        date: '2026-05-28',
        time: '14:00',
        description: 'Learn React, Node.js, and MongoDB. Beginner friendly.'
      },
      {
        event_id: 'EVT003',
        event_name: 'Football Tournament',
        venue: 'Main Ground',
        club_id: clubs[1]._id,
        status: 'Upcoming',
        date: '2026-06-10',
        time: '15:00',
        description: 'Inter-department football championship. Register your team!'
      },
      {
        event_id: 'EVT004',
        event_name: 'Art Exhibition',
        venue: 'Main Hall',
        club_id: clubs[2]._id,
        status: 'Upcoming',
        date: '2026-05-30',
        time: '10:00',
        description: 'Showcase of student artwork. Photography, paintings, sculptures.'
      },
      {
        event_id: 'EVT005',
        event_name: 'Git & GitHub Basics',
        venue: 'Lab Block, Room 301',
        club_id: clubs[0]._id,
        status: 'Upcoming',
        date: '2026-06-05',
        time: '16:00',
        description: 'Version control essentials for developers.'
      },
      {
        event_id: 'EVT006',
        event_name: 'Badminton Championship',
        venue: 'Sports Complex',
        club_id: clubs[1]._id,
        status: 'Upcoming',
        date: '2026-06-20',
        time: '17:00',
        description: 'Singles and doubles badminton tournament.'
      }
    ])
    console.log(`✅ Created ${events.length} events`)

    // ==================== EVENT REGISTRATIONS ====================
    const registrations = await EventRegistration.insertMany([
      {
        registration_id: 'REG001',
        student_id: students[0]._id, // STU001
        event_id: events[0]._id, // Hackathon
        registration_date: '2026-05-20',
        attendance_status: 'Registered'
      },
      {
        registration_id: 'REG002',
        student_id: students[1]._id, // STU002
        event_id: events[0]._id,
        registration_date: '2026-05-21',
        attendance_status: 'Registered'
      },
      {
        registration_id: 'REG003',
        student_id: students[2]._id, // STU003
        event_id: events[1]._id, // Web Dev Workshop
        registration_date: '2026-05-19',
        attendance_status: 'Registered'
      },
      {
        registration_id: 'REG004',
        student_id: students[3]._id, // STU004
        event_id: events[1]._id,
        registration_date: '2026-05-20',
        attendance_status: 'Registered'
      },
      {
        registration_id: 'REG005',
        student_id: students[4]._id, // STU005
        event_id: events[2]._id, // Football
        registration_date: '2026-05-18',
        attendance_status: 'Registered'
      },
      {
        registration_id: 'REG006',
        student_id: students[5]._id, // STU006
        event_id: events[3]._id, // Art Exhibition
        registration_date: '2026-05-21',
        attendance_status: 'Registered'
      },
      {
        registration_id: 'REG007',
        student_id: students[6]._id, // STU007
        event_id: events[4]._id, // Git Workshop
        registration_date: '2026-05-20',
        attendance_status: 'Registered'
      },
      {
        registration_id: 'REG008',
        student_id: students[7]._id, // STU008
        event_id: events[2]._id, // Football
        registration_date: '2026-05-19',
        attendance_status: 'Registered'
      }
    ])
    console.log(`✅ Created ${registrations.length} event registrations`)

    // ==================== ANNOUNCEMENTS ====================
    const announcements = await Announcement.insertMany([
      {
        announcement_id: 'ANN001',
        club_id: clubs[0]._id,
        title: 'Hackathon Registration Open!',
        content: 'Join us for the biggest coding event of the year. Teams of 3-4 members welcome. Register now!',
        posted_date: '2026-05-20'
      },
      {
        announcement_id: 'ANN002',
        club_id: clubs[0]._id,
        title: 'Workshop Materials Updated',
        content: 'Web development workshop materials are available in our GitHub repo. Check it out!',
        posted_date: '2026-05-19'
      },
      {
        announcement_id: 'ANN003',
        club_id: clubs[1]._id,
        title: 'Tournament Rules & Schedule',
        content: 'Football tournament will be held on June 10. Each team plays 2 matches. Check schedule online.',
        posted_date: '2026-05-18'
      },
      {
        announcement_id: 'ANN004',
        club_id: clubs[2]._id,
        title: 'Art Exhibition - Last Minute Call',
        content: 'Calling all artists! Submit your work by May 28 for the exhibition. All mediums welcome.',
        posted_date: '2026-05-21'
      },
      {
        announcement_id: 'ANN005',
        club_id: clubs[0]._id,
        title: 'General Meeting - June 1st',
        content: 'Monthly club meeting. Discuss upcoming events and member feedback. 5 PM in Lab Block.',
        posted_date: '2026-05-17'
      }
    ])
    console.log(`✅ Created ${announcements.length} announcements`)

    console.log('\n' + '='.repeat(60))
    console.log('📊 DATABASE SEEDED SUCCESSFULLY!')
    console.log('='.repeat(60) + '\n')

  } catch (error) {
    console.error('❌ Seed error:', error)
  } finally {
    await mongoose.connection.close()
    console.log('🔌 Database connection closed')
  }
}

seedDatabase()
