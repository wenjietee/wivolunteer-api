const express = require('express');
const router = express.Router();
const Event = require('../models/event.js');

//ROUTES

// Show events of intererest with start date as Date.now()
router.get('/', (req, res) => {
	res.send('show all events');
});

// Show individual event
router.get('/:id', (req, res) => {
	res.send('get individual event');
});

// Create a new event
router.post('/', (req, res) => {
	res.send('create an event');
});

// Update event details
router.put('/:id/edit', (req, res) => {
	res.send('edit an event');
});

// Add participant and decrement event limit
router.put('/:id/join', (req, res) => {
	res.send('add participant');
});

// Remove participant and increment event limit
router.put('/:id/drop', (req, res) => {
	res.send('drop participant');
});

// Add participant to event interested array
router.put('/:id/interested', (req, res) => {
	res.send('add user to interested array');
});

// EXPORT
module.exports = router;
