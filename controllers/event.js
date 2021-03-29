const express = require("express");
const router = express.Router();
const Event = require("../models/event.js");
const User = require("../models/user.js");

//ROUTES

// Show events of interest with start date from selected date
router.get("/", (req, res) => {
	// If no date is selected, set selected date as today
    const filterDate = req.query.date || new Date();
    const startDate = new Date();
    startDate.setDate(filterDate.getDate() + 1);
    const endDate = new Date();
    endDate.setDate(filterDate.getDate() + 30);
    User.findById(req.user._id, (err, foundUser) => {
        Event.find(
            {
                eventType: { $in: foundUser.interests },
                dateTime: { //only return result in a range of 1 month
                    $gt: startDate,
                    $lt: endDate,
                },
            },
            (err, events) => {
                res.json(events);
            }
        );
    });
});

// Get All Events
// Show events of interest with start date from selected date
router.get("/all", (req, res) => {
	// If no date is selected, set selected date as today
    const filterDate = req.query.date || new Date();
    const startDate = new Date();
    startDate.setDate(filterDate.getDate() + 1);
    const endDate = new Date();
    endDate.setDate(filterDate.getDate() + 30);
    User.findById(req.user._id, (err, foundUser) => {
        Event.find(
            {
                dateTime: { //only return result in a range of 1 month
                    $gt: startDate,
                    $lt: endDate,
                },
            },
            (err, events) => {
                res.json(events);
            }
        );
    });
});

// Show individual event
router.get("/:id", (req, res) => {
    res.send("get individual event");
});

// Create a new event
router.post("/", (req, res) => {
    res.send("create an event");
});

// Update event details
router.put("/:id/edit", (req, res) => {
    res.send("edit an event");
});

// Add participant and decrement event limit
router.put("/:id/join", (req, res) => {
    res.send("add participant");
});

// Remove participant and increment event limit
router.put("/:id/drop", (req, res) => {
    res.send("drop participant");
});

// Add participant to event interested array
router.put("/:id/interested", (req, res) => {
    res.send("add user to interested array");
});

// EXPORT
module.exports = router;
