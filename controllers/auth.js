// DEPENDENCIES
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/user');

//ROUTES

// New login with setting of json token at local storage
router.get('/login', (req, res) => {
	res.send('new login');
});

// Logout - remove local storage json token
router.delete('/logout', (req, res) => {
	res.send('logout');
});

// EXPORT
module.exports = router;
