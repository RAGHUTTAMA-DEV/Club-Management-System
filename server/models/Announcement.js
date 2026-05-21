const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  announcement_id: {
    type: String,
    required: true,
    unique: true
  },
  club_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Club',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  posted_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Announcement', announcementSchema);
