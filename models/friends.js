const mongoose = require('mongoose')
const User = require('./user.js')
const friendsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    friends: [{
        date: {
            type: Date,
            default: Date.now
        },
        type: {
            type: String
        },
        name: {
            type: String,
            required: true,
        },
        reason: {
            type: String
        },
        amount: {
            type: Number,
            required: true,
            default: 0
        },

    }]
});
const Friends = new mongoose.model('Friend', friendsSchema)
module.exports = Friends