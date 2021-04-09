// DEPENDENCIES
const mongoose = require('mongoose');

// SCHEMA
const eventSchema = new mongoose.Schema({
	eventTitle: { type: String, required: true },
	dateTime: { type: Date, required: true, default: Date.now },
	organiser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
	interested: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
	limit: { type: Number, default: 1, required: true },
	isCancelled: { type: Boolean, default: false },
	description: String,
	location: String,
	zipCode: String,
	image: {type: String, default: "https://cdn.pixabay.com/photo/2017/02/10/12/12/volunteer-2055042_1280.png"},
	eventType: [String],
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
