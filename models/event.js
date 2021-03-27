// DEPENDENCIES
const mongoose = require('mongoose');

// SCHEMA
const eventSchema = new mongoose.Schema({
	eventTitle: { type: String, required: true },
	dateTime: { type: Date, required: true, default: Date.now },
	organiser: { type: Schema.Types.ObjectId, ref: 'User' },
	participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
	interested: [{ type: Schema.Types.ObjectId, ref: 'User' }],
	limit: { type: Number, required: true },
	isCancelled: { type: Boolean, default: false },
	description: String,
	location: String,
	zipCode: String,
	image: String,
	eventType: [String],
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
