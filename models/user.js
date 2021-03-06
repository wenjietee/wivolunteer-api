// DEPENDENCIES
const mongoose = require("mongoose");

// SCHEMA
const userSchema = new mongoose.Schema({
	email: { type: String, unique: true, required: true },
	username: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	contact: String,
	interests: [String],
	pastEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
	interestedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
	address: String,
	image: {
		type: String,
		default: "https://image.flaticon.com/icons/png/128/1946/1946429.png",
	},
});

const User = mongoose.model("User", userSchema);

module.exports = User;
