const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const EventRegistration = require('../models/EventRegistration');
const { verifyToken, isClubLeader, checkRole } = require('../middleware/auth');
const Membership = require('../models/Membership');

// GET all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().populate('club_id').sort({ date: -1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single event with registrations
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('club_id');
    if (!event) return res.status(404).json({ message: 'Event not found' });
    
    const registrations = await EventRegistration.find({ event_id: req.params.id }).populate('student_id');
    res.json({ event, registrations });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE event - ONLY CLUB LEADERS
router.post('/', verifyToken, async (req, res) => {
  try {
    const { club_id } = req.body;
    
    // Check if user is club leader (President or Vice-President)
    const membership = await Membership.findOne({
      student_id: req.userId,
      club_id: club_id,
      role: { $in: ['President', 'Vice-President', 'Secretary'] }
    });

    if (!membership) {
      return res.status(403).json({ 
        message: 'Only club leaders (President, Vice-President, Secretary) can create events' 
      });
    }

    const body = { ...req.body };
    if (!body.event_id) {
      body.event_id = `EVNT${Date.now()}`;
    }
    const event = new Event(body);
    const newEvent = await event.save();
    await newEvent.populate('club_id');
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE event - ONLY CLUB LEADERS
router.patch('/:id', verifyToken, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    
    // Check if user is club leader of this event's club
    const membership = await Membership.findOne({
      student_id: req.userId,
      club_id: event.club_id,
      role: { $in: ['President', 'Vice-President', 'Secretary'] }
    });

    if (!membership) {
      return res.status(403).json({ 
        message: 'Only club leaders can update events' 
      });
    }
    
    Object.assign(event, req.body);
    const updatedEvent = await event.save();
    await updatedEvent.populate('club_id');
    res.json(updatedEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE event - ONLY CLUB LEADERS
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    
    // Check if user is club leader of this event's club
    const membership = await Membership.findOne({
      student_id: req.userId,
      club_id: event.club_id,
      role: { $in: ['President', 'Vice-President'] }
    });

    if (!membership) {
      return res.status(403).json({ 
        message: 'Only club leaders (President, Vice-President) can delete events' 
      });
    }
    
    await EventRegistration.deleteMany({ event_id: req.params.id });
    await Event.deleteOne({ _id: req.params.id });
    
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
