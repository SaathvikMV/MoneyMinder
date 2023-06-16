const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
})

userSchema.plugin(passportLocalMongoose, {
  errorMessages: {
    IncorrectUsernameError: 'Username not found',
    UserExistsError: 'Username not found',
    IncorrectPasswordError: 'Incorrect password'
  }
});

const User = new mongoose.model('User', userSchema)
module.exports = User
