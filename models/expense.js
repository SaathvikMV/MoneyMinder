const mongoose = require('mongoose')
const User = require('./user.js')
const expenseScehma = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    expense: [{
        Amount: {
            type: Number,
            required: true
        },
        category: {
            type: String,
            default: "NA",
            required: true
        },
        description: {
            type: String
        },
        date: {
            type: Date,
            default: Date.now
        }
    }],
})
const Expense = new mongoose.model('Expense', expenseScehma)
module.exports = Expense
