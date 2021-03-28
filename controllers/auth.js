// DEPENDENCIES
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/user");

// Helper Functions
const {generateJsonToken} = require("./helper");

//ROUTES

// New login with sending json web token to front-end
router.post("/login", (req, res) => {
    User.findOne({ email: req.body.email }, (err, foundUser) => {
        if (!foundUser) {
            // Send error code if user not found
            res.status(404).json({ error: "no user found" });
        } else {
            // Check if password is correct
            if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                // Generate json web token
                generateJsonToken(foundUser, res);
            } else {
                res.status(401).json({ error: "wrong password" });
            }
        }
    });
});

// Logout - remove local storage json token
router.delete("/logout", (req, res) => {
    res.send("logout");
});

// EXPORT
module.exports = router;
