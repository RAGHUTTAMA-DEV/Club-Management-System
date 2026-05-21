const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const Membership = require('../models/Membership');

// GET all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single student with memberships
router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    
    const memberships = await Membership.find({ student_id: req.params.id }).populate('club_id');
    res.json({ student, memberships });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE new student
router.post('/', async (req, res) => {
  const body = { ...req.body };
  if (!body.student_id) {
    body.student_id = `STU${Date.now()}`;
  }
  const student = new Student(body);
  try {
    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE student
router.patch('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    
    Object.assign(student, req.body);
    const updatedStudent = await student.save();
    res.json(updatedStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE student
router.delete('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    
    // Delete related memberships and registrations
    await Membership.deleteMany({ student_id: req.params.id });
    await Student.deleteOne({ _id: req.params.id });
    
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
