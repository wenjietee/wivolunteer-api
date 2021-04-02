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
            .populate("organiser", "username").sort({dateTime: 1})
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
            .populate("organiser", "username").sort({dateTime: 1})
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
            .populate("organiser", "username").sort({dateTime: 1})
            .exec((err, events) => {
                res.json(events);
            });
    });
});

// Show individual event

router.get("/:id", (req, res) => {
    Event.findById(req.params.id)
        .populate("organiser", "username contact")
        .populate("participants", "username contact")
        .populate("interested", "username contact")
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

// Add participant and decrement limit
router.put("/:id/join", (req, res) => {
    // Check if organiser attempts to join own event
    Event.findOne(
        {
            organiser: req.user._id,
        },
        (err, foundEvent) => {
            if (foundEvent)
                res.status(403).json({
                    error: "Organiser cannot be added to participants",
                });
            else {
                // Check if participant has joined event
                Event.findOne(
                    { participants: { $in: req.user._id } },
                    (err, foundEvent) => {
                        if (foundEvent)
                            res.status(403).json({
                                error: "Participant already joined event",
                            });
                        else {
                            // Update event by adding particpant and decrement limit
                            Event.findByIdAndUpdate(
                                req.params.id,
                                { $push: { participants: req.user._id } },
                                { new: true },
                                (err, updatedEvent) => {
                                    if (err)
                                        res.status(500).json({ error: err });
                                    else {
                                        res.status(201).json(updatedEvent);
                                    }
                                }
                            );
                        }
                    }
                );
            }
        }
    );
});

// Remove participant and increment event limit
router.put("/:id/drop", (req, res) => {
    // Update event by removing particpant and increment limit
    Event.findByIdAndUpdate(
        req.params.id,
        { $pull: { participants: req.user._id } },
        { new: true },
        (err, updatedEvent) => {
            if (err) res.status(500).json({ error: err });
            else {
                res.status(201).json(updatedEvent);
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
            if (err) res.status(500).json({ error: err });
            else {
                res.status(201).json(updatedEvent);
            }
        }
    );
});

// EXPORT
module.exports = router;
