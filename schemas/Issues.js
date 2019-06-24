const mongoose = require('mongoose');


const issue = new mongoose.Schema({
	title: {
		type: String,
		required: false
	},
	text:  {
		type: String,
		required: false
	},
	creator: {
		type: String,
		required: false
	},
	assignee: {
		type: String,
		required: false
	},
	status: {
		type: String,
		required: false
	},
	open: {
		type: Boolean,
		required: true
	}
}, {timestamps: true})

const Issue = mongoose.model('issue', issue);