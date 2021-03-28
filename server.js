// DEPENDENCIES
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const db = mongoose.connection;

// CONFIG
const PORT = process.env.PORT || 3000;
const MONGO_URI =
	process.env.MONGO_ATLAS || 'mongodb://localhost:27017/wivolunteer-api';
const CORS_OPTIONS = {
	origin: '*', // whitelist all for dev, to add client URL before deployment
	credentials: true,
	'Access-Control-Allow-Credentials': true,
	methods: 'GET,HEAD,PUT,POST,DELETE',
};

// MONGO DB
mongoose.connect(MONGO_URI, { useNewUrlParser: true }, () =>
	console.log('connected to MongoDB @', MONGO_URI)
);
// Error / Disconnection
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('disconnected', () => console.log('mongo disconnected'));

// MIDDLEWARE
app.use(cors(CORS_OPTIONS));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// ROUTES
const userController = require('./controllers/user.js');
app.use('/users', userController);

const authController = require('./controllers/auth.js');
app.use('/', authController);

const eventController = require('./controllers/event.js');
app.use('/events', eventController);

const feedbackController = require('./controllers/feedback.js');
app.use('/feedback', feedbackController);

// catch nonexistant route
app.get('*', (req, res) => {
	res.status(404).json('The server can not find the requested resource.');
});

// LISTEN
app.listen(PORT, () => {
	console.log(`WiVolunteer-API listening on port: ${PORT}`);
});
