// DEPENDENCIES
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/user");
const jsonwebtoken = require("jsonwebtoken");

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
                // Set payload for json web token
                const user = {
                    _id: foundUser._id,
                    email: foundUser.email,
                    username: foundUser.username,
                };
                // Generate json web token and send to front end
                jsonwebtoken.sign(
                    { user },
                    process.env.JWT_SECRET,
                    { expiresIn: "1d" },
                    (err, jwtToken) => {
                        res.json({ jwtToken });
                    }
                );
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
