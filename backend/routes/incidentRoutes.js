const express = require('express');
const Incident = require('../models/Incident');
const auth = require('../middleware/auth');

const router = express.Router();

// Report Incident
router.post('/', auth, async (req, res) => {
  try {
    const incident = new Incident({
      ...req.body,
      userId: req.user._id
    });
    await incident.save();
    // Trigger emergency notification system here
    res.status(201).send(incident);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router; 