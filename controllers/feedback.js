const express = require('express');
const router = express.Router();
const Event = require('../models/event.js');
const User = require('../models/user.js');
const Feedback = require('../models/feedback.js');

//ROUTES

// Fetch feedback info for the event
router.get('/:eventId', (req, res) => {
	Feedback.find({ event: req.params.eventId })
		.populate('event', 'eventTitle')
		.populate('participant', 'username')
		.exec()
		.then((feedbacks) => {
			// if no feedback found return error
			if (!feedbacks || !feedbacks.length) {
				return res.status(404).json({
					error: 'No feedback avaliable.',
				});
			}
			// return feedbacks
			res.status(200).json(feedbacks);
		})
		.catch((err) => {
			res.status(500).json({
				error: err,
			});
		});
});

// Create a new feedback for the event
router.post('/:eventId', (req, res) => {
	// Set participant as current user
	req.body.participant = req.user._id;
	// Set event as params id
	req.body.event = req.params.eventId;
	// Create feedback
	Feedback.create(req.body, (err, createdFeedback) => {
		if (err) res.status(500).json({ error: err });
		else {
			res.status(201).json(createdFeedback);
		}
	});
});

// EXPORT
module.exports = router;
