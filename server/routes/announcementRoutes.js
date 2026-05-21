const express = require('express');
const router = express.Router();
const Announcement = require('../models/Announcement');
const { verifyToken } = require('../middleware/auth');
const Membership = require('../models/Membership');

// GET all announcements
router.get('/', async (req, res) => {
  try {
    const announcements = await Announcement.find().populate('club_id').sort({ posted_date: -1 });
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET announcements by club
router.get('/club/:clubId', async (req, res) => {
  try {
    const announcements = await Announcement.find({ club_id: req.params.clubId }).sort({ posted_date: -1 });
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE announcement - CLUB MEMBERS ONLY
router.post('/', verifyToken, async (req, res) => {
  try {
    const { club_id } = req.body;
    
    // Check if user is member of this club
    const membership = await Membership.findOne({
      student_id: req.userId,
      club_id: club_id
    });

    if (!membership) {
      return res.status(403).json({ 
        message: 'Only club members can post announcements' 
      });
    }

    const body = { ...req.body };
    if (!body.announcement_id) {
      body.announcement_id = `ANN${Date.now()}`;
    }
    const announcement = new Announcement(body);
    const newAnnouncement = await announcement.save();
    await newAnnouncement.populate('club_id');
    res.status(201).json(newAnnouncement);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE announcement - LEADERS OR AUTHOR ONLY
router.patch('/:id', verifyToken, async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) return res.status(404).json({ message: 'Announcement not found' });
    
    // Check if user is club leader of this announcement's club
    const membership = await Membership.findOne({
      student_id: req.userId,
      club_id: announcement.club_id,
      role: { $in: ['President', 'Vice-President'] }
    });

    if (!membership) {
      return res.status(403).json({ 
        message: 'Only club leaders can edit announcements' 
      });
    }
    
    Object.assign(announcement, req.body);
    const updatedAnnouncement = await announcement.save();
    await updatedAnnouncement.populate('club_id');
    res.json(updatedAnnouncement);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE announcement - LEADERS ONLY
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) return res.status(404).json({ message: 'Announcement not found' });
    
    // Check if user is club leader of this announcement's club
    const membership = await Membership.findOne({
      student_id: req.userId,
      club_id: announcement.club_id,
      role: { $in: ['President', 'Vice-President'] }
    });

    if (!membership) {
      return res.status(403).json({ 
        message: 'Only club leaders can delete announcements' 
      });
    }
    
    await Announcement.deleteOne({ _id: req.params.id });
    res.json({ message: 'Announcement deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
