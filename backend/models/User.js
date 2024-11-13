const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: String,
  emergencyContacts: [{
    name: String,
    phone: String,
    relationship: String
  }],
  lastLocation: {
    latitude: Number,
    longitude: Number,
    timestamp: Date
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User; 