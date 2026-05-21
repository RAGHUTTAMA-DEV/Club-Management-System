const express = require('express');
const router = express.Router();
const EventRegistration = require('../models/EventRegistration');

// GET all registrations
router.get('/', async (req, res) => {
  try {
    const registrations = await EventRegistration.find().populate('student_id').populate('event_id');
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET registrations by event
router.get('/event/:eventId', async (req, res) => {
  try {
    const registrations = await EventRegistration.find({ event_id: req.params.eventId }).populate('student_id');
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET registrations by student
router.get('/student/:studentId', async (req, res) => {
  try {
    const registrations = await EventRegistration.find({ student_id: req.params.studentId }).populate('event_id');
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE registration
router.post('/', async (req, res) => {
  const registration = new EventRegistration(req.body);
  try {
    const newRegistration = await registration.save();
    await newRegistration.populate('student_id').populate('event_id');
    res.status(201).json(newRegistration);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE registration
router.patch('/:id', async (req, res) => {
  try {
    const registration = await EventRegistration.findById(req.params.id);
    if (!registration) return res.status(404).json({ message: 'Registration not found' });
    
    Object.assign(registration, req.body);
    const updatedRegistration = await registration.save();
    await updatedRegistration.populate('student_id').populate('event_id');
    res.json(updatedRegistration);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE registration
router.delete('/:id', async (req, res) => {
  try {
    const registration = await EventRegistration.findById(req.params.id);
    if (!registration) return res.status(404).json({ message: 'Registration not found' });
    
    await EventRegistration.deleteOne({ _id: req.params.id });
    res.json({ message: 'Registration deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
