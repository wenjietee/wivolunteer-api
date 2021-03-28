// DEPENDENCIES
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user.js");

// ROUTES

// Get user profile data
router.get("/profile", (req, res) => {
    res.send("get user profile");
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
                res.json(createdUser); // To change to auto-sign in after sign-up
            });
        }
    });
});

// Update User profile
router.put("/profile", (req, res) => {
    res.send("update user profile");
});

// EXPORT
module.exports = router;
