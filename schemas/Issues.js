const mongoose = require('mongoose');


module.exports = new mongoose.Schema({
	issue_title: {
		type: String,
		required: true
	},
	issue_text:  {
		type: String,
		required: true
	},
	created_by: {
		type: String,
		required: true
	},
	assigned_to: {
		type: String,
		required: false
	},
	status_text: {
		type: String,
		required: false
	},
	open: {
		type: Boolean,
		required: true,
		default: true
	}
}, {timestamps: true, versionKey: false})

