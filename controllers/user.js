// DEPENDENCIES
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user.js');

// ROUTES

// Get user profile data
router.get('/profile', (req, res) => {
	res.send('get user profile');
});

// Create new user
router.post('/', (req, res) => {
	// hash user pw and pass into db
	// req.body.password = bcrypt.hashSync(
	// 	req.body.password,
	// 	bcrypt.genSaltSync(10)
	// );
});

// Update User profile
router.put('/profile', (req, res) => {
	res.send('update user profile');
});

// EXPORT
module.exports = router;
