const express = require('express');
const router = express.Router();
const Feedback = require('../models/feedback.js');

//ROUTES

// Fetch feedback info for the event
router.get('/feedback/:id', (req, res) => {
	res.send('fetch feedback');
});

// Create a new feedback for the event
router.post('/feedback/:id', (req, res) => {
	res.send('create a feedback');
});

// EXPORT
module.exports = router;
