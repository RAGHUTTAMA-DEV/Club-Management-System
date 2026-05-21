const mongoose = require('mongoose');

const eventRegistrationSchema = new mongoose.Schema({
  registration_id: {
    type: String,
    required: true,
    unique: true
  },
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  event_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  registration_date: {
    type: Date,
    default: Date.now
  },
  attendance_status: {
    type: String,
    enum: ['Registered', 'Attended', 'Absent', 'Cancelled'],
    default: 'Registered'
  }
});

module.exports = mongoose.model('EventRegistration', eventRegistrationSchema);
