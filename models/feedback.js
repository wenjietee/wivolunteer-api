// DEPENDENCIES
const mongoose = require('mongoose');

// SCHEMA
const feedbackSchema = new mongoose.Schema({
	participant: { type: Schema.Types.ObjectId, ref: 'User' },
	event: { type: Schema.Types.ObjectId, ref: 'Event' },
	hasEnoughResources: [String],
	isWellOrganised: Number,
	isSatisfied: Number,
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
