const mongoose = require('mongoose');

const membershipSchema = new mongoose.Schema({
  membership_id: {
    type: String,
    required: true,
    unique: true
  },
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  club_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Club',
    required: true
  },
  role: {
    type: String,
    enum: ['President', 'Vice-President', 'Secretary', 'Treasurer', 'Member'],
    default: 'Member'
  },
  join_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Membership', membershipSchema);
