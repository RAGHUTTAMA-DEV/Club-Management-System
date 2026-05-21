const express = require('express');
const router = express.Router();
const Club = require('../models/Club');
const Membership = require('../models/Membership');
const Event = require('../models/Event');
const Announcement = require('../models/Announcement');

// GET all clubs
router.get('/', async (req, res) => {
  try {
    const clubs = await Club.find();
    res.json(clubs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single club with details
router.get('/:id', async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);
    if (!club) return res.status(404).json({ message: 'Club not found' });
    
    const members = await Membership.find({ club_id: req.params.id }).populate('student_id');
    const events = await Event.find({ club_id: req.params.id });
    const announcements = await Announcement.find({ club_id: req.params.id });
    
    res.json({ club, members, events, announcements });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE new club
router.post('/', async (req, res) => {
  const body = { ...req.body };
  if (!body.club_id) {
    body.club_id = `CLUB${Date.now()}`;
  }
  const club = new Club(body);
  try {
    const newClub = await club.save();
    res.status(201).json(newClub);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE club
router.patch('/:id', async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);
    if (!club) return res.status(404).json({ message: 'Club not found' });
    
    Object.assign(club, req.body);
    const updatedClub = await club.save();
    res.json(updatedClub);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE club
router.delete('/:id', async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);
    if (!club) return res.status(404).json({ message: 'Club not found' });
    
    // Delete related data
    await Membership.deleteMany({ club_id: req.params.id });
    await Event.deleteMany({ club_id: req.params.id });
    await Announcement.deleteMany({ club_id: req.params.id });
    await Club.deleteOne({ _id: req.params.id });
    
    res.json({ message: 'Club deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
