const express = require("express");
const router = express.Router();
const Event = require("../models/event.js");
const User = require("../models/user.js");
const setDateRange = require("./helper.js").setDateRange;

//ROUTES

// Show events of interest with start date from selected date
router.get("/", (req, res) => {
	// If no date is selected, set selected date as today
	const { startDate, endDate } = setDateRange(req);
	User.findById(req.user._id, (err, foundUser) => {
		Event.find({
			eventType: { $in: foundUser.interests },
			dateTime: {
				//only return result in a range of 1 month
				$gt: startDate,
				$lt: endDate,
			},
		})
			.populate("organiser", "username")
			.sort({ dateTime: 1 })
			.exec((err, events) => {
				res.json(events);
			});
	});
});

// Get All Events
// Show events of interest with start date from selected date
router.get("/all", (req, res) => {
	const { startDate, endDate } = setDateRange(req);
	User.findById(req.user._id, (err, foundUser) => {
		Event.find({
			dateTime: {
				//only return result in a range of 1 month
				$gt: startDate,
				$lt: endDate,
			},
		})
			.populate("organiser", "username")
			.sort({ dateTime: 1 })
			.exec((err, events) => {
				res.json(events);
			});
	});
});

// Get searched event
router.get("/find", (req, res) => {
	const { startDate, endDate } = setDateRange(req);
	const categories = JSON.parse(req.query.cat);
	User.findById(req.user._id, (err, foundUser) => {
		Event.find({
			eventType: { $in: categories },
			dateTime: {
				//only return result in a range of 1 month
				$gt: startDate,
				$lt: endDate,
			},
		})
			.populate("organiser", "username")
			.sort({ dateTime: 1 })
			.exec((err, events) => {
				res.json(events);
			});
	});
});

// Show individual event

router.get("/:id", (req, res) => {
	Event.findById(req.params.id)
		.populate("organiser", "username contact email")
		.populate("participants", "username contact email")
		.populate("interested", "username contact email")
		.exec()
		.then((event) => {
			if (!event) {
				return res.status(404).json({
					error: "Event not found",
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
router.post("/", (req, res) => {
	// Set organiser as current user
	req.body.organiser = req.user._id;
	// Create event
	Event.create(req.body, (err, createdEvent) => {
		if (err) res.status(500).json({ error: err });
		else {
			res.status(201).json(createdEvent);
		}
	});
});

// Update event details
router.put("/:id/edit", (req, res) => {
	// Check if current user match organiser
	Event.findOne({ organiser: req.user._id }, (err, foundEvent) => {
		if (!foundEvent)
			res.status(403).json({
				error: "Unable to edit event, organiser mismatch.",
			});
		else {
			// Update event details
			Event.findByIdAndUpdate(
				req.params.id,
				req.body,
				{ new: true },
				(err, updatedEvent) => {
					if (err) res.status(500).json({ error: err });
					else {
						res.status(201).json(updatedEvent);
					}
				}
			);
		}
	});
});

// Add participant
router.put("/:id/join", (req, res) => {
	// Update event by adding particpant
	Event.findByIdAndUpdate(
		req.params.id,
		{
			$push: { participants: req.user._id },
			$pull: { interested: req.user._id },
		},
		{ new: true },
		(err, updatedEvent) => {
			if (err) res.status(500).json({ error: err });
			else {
				// Add event to User profile
				User.findByIdAndUpdate(
					req.user._id,
					{ $push: { pastEvents: updatedEvent._id } },
					(err, foundUser) => {
						if (err) res.status(500).json({ error: err });
						else {
							res.status(201).json(updatedEvent);
						}
					}
				);
			}
		}
	);
});

// Remove participant
router.put("/:id/drop", (req, res) => {
	// Update event by removing particpant
	Event.findByIdAndUpdate(
		req.params.id,
		{
			$pull: { participants: req.user._id },
			$push: { interested: req.user._id },
		},
		{ new: true },
		(err, updatedEvent) => {
			if (err) res.status(500).json({ error: err });
			else {
				// Remove event from User profile
				User.findByIdAndUpdate(
					req.user._id,
					{ $pull: { pastEvents: updatedEvent._id } },
					(err, foundUser) => {
						if (err) res.status(500).json({ error: err });
						else {
							res.status(201).json(updatedEvent);
						}
					}
				);
			}
		}
	);
});

// Add participant to event interested array
router.put("/:id/interested", (req, res) => {
	Event.findByIdAndUpdate(
		req.params.id,
		{ $push: { interested: req.user._id } },
		{ new: true },
		(err, updatedEvent) => {
			User.findByIdAndUpdate(
				req.user._id,
				{ $push: { interestedEvents: updatedEvent._id } },
				(err, foundUser) => {
					if (err) res.status(500).json({ error: err });
					else {
						res.status(201).json(updatedEvent);
					}
				}
			);
		}
	);
});

// Remove participant from event interested array
router.put("/:id/uninterested", (req, res) => {
	Event.findByIdAndUpdate(
		req.params.id,
		{ $pull: { interested: req.user._id } },
		{ new: true },
		(err, updatedEvent) => {
			User.findByIdAndUpdate(
				req.user._id,
				{ $pull: { interestedEvents: updatedEvent._id } },
				(err, foundUser) => {
					if (err) res.status(500).json({ error: err });
					else {
						res.status(201).json(updatedEvent);
					}
				}
			);
		}
	);
});

// Delete Event
router.delete("/:id", (req, res) => {
	Event.findOne(
		{ _id: req.params.id, organiser: req.user._id },
		(err, foundEvent) => {
			if (!foundEvent) {
				res.status(403).json("not authorized to delete event");
			} else {
				Event.findByIdAndRemove(req.params.id, (err, deletedEvent) => {
					if (err) {
						res.status(500).json({ error: err });
					}
					res.status(200).json(deletedEvent);
				});
			}
		}
	);
});

// EXPORT
module.exports = router;
