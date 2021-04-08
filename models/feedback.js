// DEPENDENCIES
const mongoose = require("mongoose");

// SCHEMA
const feedbackSchema = new mongoose.Schema({
	participant: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	event: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
	hasEnoughResources: Number,
	isWellOrganised: Number,
	isSatisfied: Number,
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;
