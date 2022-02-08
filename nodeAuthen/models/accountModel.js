const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
	username:{
		type: 'string',
	},
	password:{
		type: 'string',
	},
	role:{
		type: 'string',
		enum: ['admin', 'user'],
		default: 'user'
	},
})

const model = new mongoose.model('account',accountSchema)

module.exports = model