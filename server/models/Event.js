const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  event_id: {
    type: String,
    required: true,
    unique: true
  },
  event_name: {
    type: String,
    required: true
  },
  venue: String,
  club_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Club',
    required: true
  },
  status: {
    type: String,
    enum: ['Upcoming', 'Ongoing', 'Completed', 'Cancelled'],
    default: 'Upcoming'
  },
  date: Date,
  time: String,
  description: String,
  image_url: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Event', eventSchema);
