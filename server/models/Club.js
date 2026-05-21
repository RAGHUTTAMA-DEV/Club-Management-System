const mongoose = require('mongoose');

const clubSchema = new mongoose.Schema({
  club_id: {
    type: String,
    required: true,
    unique: true
  },
  club_name: {
    type: String,
    required: true,
    unique: true
  },
  description: String,
  faculty_coordinator: String,
  logo: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Club', clubSchema);
