const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const Membership = require('../models/Membership');

// Simulate login - in production use proper auth
router.post('/login', async (req, res) => {
  try {
    const { student_id } = req.body;
    
    const student = await Student.findOne({ student_id });
    if (!student) {
      return res.status(401).json({ message: 'Student not found' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: student._id, studentId: student_id, role: 'student' },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    // Get memberships
    const memberships = await Membership.find({ student_id: student._id }).populate('club_id');

    res.json({
      token,
      student,
      memberships,
      message: 'Login successful'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get current user info
router.get('/me', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    res.json({ userId: decoded.userId, studentId: decoded.studentId });
  } catch (error) {
    res.status(403).json({ message: 'Invalid token' });
  }
});

module.exports = router;
