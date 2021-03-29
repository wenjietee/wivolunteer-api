const express = require('express');
const router = express.Router();
const Event = require('../models/event.js');
const User = require('../models/user.js');

//ROUTES

// Show events of intererest with start date as Date.now()
router.get('/', (req, res) => {
	res.send('show all events');
});

// Show individual event
router.get('/:id', (req, res) => {
	Event.findById(req.params.id)
		.populate('organiser')
		.populate('participants')
		.populate('interested')
		.exec()
		.then((event) => {
			if (!event) {
				return res.status(404).json({
					error: 'Event not found',
				});
			}
			res.status(200).json(event);
		})
		.catch((err) => {
			res.status(500).json({
				error: err,
			});
		});
});

// Create a new event
router.post('/', (req, res) => {
	// get user id from jwt token ?? to confirm
	// set current user as organiser ?? to confirm
	// check cloudinary handled on front or back
	Event.create(req.body, (err, createdEvent) => {
		if (err) res.status(500).json({ error: err });
		else {
			res.status(201).json(createdEvent);
		}
	});
});

// Update event details
router.put('/:id/edit', (req, res) => {
	Event.findByIdAndUpdate(
		req.params.id.req.body,
		{ new: true },
		(err, updatedEvent) => {
			if (err) res.status(500).json({ error: err });
			else {
				res.status(201).json(updatedEvent);
			}
		}
	);
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
