// DEPENDENCIES
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user.js");
const generateJsonToken = require("./helper").generateJsonToken;

// ROUTES

// Get user profile data
router.get("/profile", (req, res) => {
    User.findById(req.user._id, "-password -pastEvents", (err, foundUser) => {
        res.json(foundUser);
    });
});

// Check if user is already authenticated
router.get("/authenticate", (req, res) => {
    const user = {};
    user._id = req.user._id;
    user.username = req.user.username;
    res.json(user);
});

// Create new user
router.post("/", (req, res) => {
    // Check if email address is unique
    User.findOne({ email: req.body.email }, (err, foundDuplicate) => {
        // If mail address already registered
        if (foundDuplicate) {
            res.status(409).json({ error: "email address already registered" });
        } else {
            // hash user pw and pass into db
            req.body.password = bcrypt.hashSync(
                req.body.password,
                bcrypt.genSaltSync(10)
            );
            req.body.username = req.body.email;
            User.create(req.body, (err, createdUser) => {
                // Auto-sign in after sign up. // To change to nodemailer for email confirmation
                generateJsonToken(createdUser, res);
            });
        }
    });
});

// Update User profile
router.put("/profile", (req, res) => {
    User.findByIdAndUpdate(
        req.user._id,
        { $set: req.body },
        { new: true, projection:"-password -pastEvents" },
        (err, updatedUser) => {
            res.json(updatedUser);
        }
    );
});

// EXPORT
module.exports = router;
