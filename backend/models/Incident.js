const mongoose = require('mongoose');

// Incident Report Schema
const incidentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: String,
  description: String,
  location: {
    latitude: Number,
    longitude: Number
  },
  timestamp: { type: Date, default: Date.now },
  status: { type: String, default: 'pending' },
  emergencyContactsNotified: { type: Boolean, default: false }
});

const Incident = mongoose.model('Incident', incidentSchema);
module.exports = Incident; 