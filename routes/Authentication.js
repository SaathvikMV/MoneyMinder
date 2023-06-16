const express = require('express')
const flash = require('connect-flash');
const router = express.Router()
const passport = require('passport')
const User = require('../models/user.js')
const Expenses = require('../models/expense.js')
const Friends = require('../models/friends.js')
router.get('/register', async (req, res) => {
  res.locals.messages = req.flash();
  res.render("register")
})
router.post('/register', async (req, res) => {
  try {
    const {
      email_or_phone,
      username,
      password
    } = req.body;

    // Check if the username is already taken
    const existingUser = await User.findOne({
      username: username
    });
    if (existingUser) {
      req.flash('error', 'Username is already taken');
      return res.redirect('/register');
    }

    // Check if the email is already registered
    const existingEmail = await User.findOne({
      email: email_or_phone
    });
    if (existingEmail) {
      req.flash('error', 'Email is already registered');
      return res.redirect('/register');
    }

    const user = new User({
      email: email_or_phone,
      username: username
    });

    const registeredUser = await User.register(user, password);

    req.logIn(registeredUser, err => {
      if (err) {
        return next(err);
      }
    });

    const expense = new Expenses({
      user: req.user._id,
      expense: []
    });
    await expense.save();

    const friend = new Friends({
      user: req.user._id,
      friends: []
    });
    await friend.save();

    res.redirect(`/${req.user.username}/dashboard`);
  } catch (error) {
    console.log(error);
    res.redirect('/register');
  }
});

router.get('/login', async (req, res) => {
  res.locals.messages = req.flash();
  res.render("login");
})
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (!user) {
      req.flash('error', info.message);
      return res.redirect('/login');
    }
    req.logIn(user, (err) => {
      return res.redirect(`/${user}/dashboard`);
    });
  })(req, res, next);
});
router.get('/logout', async (req, res) => {
  req.logOut(function(err) {
    if (err) {
      console.log(err)
    }
    res.redirect('/')
    return
  })
})
module.exports = router
