// DEPENDENCIES
require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const db = mongoose.connection;

// CONFIG
const PORT = process.env.PORT || 3000;
const MONGOURI =
	process.env.MONGOATLAS || 'mongodb://localhost:27017/wivolunteer-api';

// MONGO DB
mongoose.connect(MONGOURI, { useNewUrlParser: true }, () =>
	console.log('connected to MongoDB @', MONGOURI)
);
// Error / Disconnection
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('disconnected', () => console.log('mongo disconnected'));

// LISTEN
app.listen(PORT, () => {
	console.log(`WiVolunteer-API listening on port: ${PORT}`);
});
