const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const Club = require('../models/Club');
const Event = require('../models/Event');
const Membership = require('../models/Membership');
const EventRegistration = require('../models/EventRegistration');
const Announcement = require('../models/Announcement');

// Export database as JSON
router.get('/database', async (req, res) => {
  try {
    // Fetch all data from the database
    const [students, clubs, events, memberships, eventRegistrations, announcements] = await Promise.all([
      Student.find(),
      Club.find(),
      Event.find(),
      Membership.find(),
      EventRegistration.find(),
      Announcement.find()
    ]);

    const databaseExport = {
      exportDate: new Date().toISOString(),
      summary: {
        totalStudents: students.length,
        totalClubs: clubs.length,
        totalEvents: events.length,
        totalMemberships: memberships.length,
        totalEventRegistrations: eventRegistrations.length,
        totalAnnouncements: announcements.length
      },
      data: {
        students,
        clubs,
        events,
        memberships,
        eventRegistrations,
        announcements
      }
    };

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', 'attachment; filename="club-management-db.json"');
    res.json(databaseExport);
  } catch (error) {
    console.error('Error exporting database:', error);
    res.status(500).json({ error: 'Failed to export database' });
  }
});

module.exports = router;
