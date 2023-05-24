const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../models/user.js')
const Expenses = require('../models/expense.js')
const Friends = require('../models/friends.js')
router.get('/register', async(req, res) => {
    res.render("register")
})
router.post('/register', async(req, res) => {
    try {
        const { email_or_phone, username, password } = req.body
        const user = new User({ email: email_or_phone, username: username })
        const registeredUser = await User.register(user, password)

        req.logIn(registeredUser, err => {
            if (err) {
                return next(err)
            }
        })
        const expense = new Expenses({ user: req.user._id, expense: [] })
        await expense.save()
        const friend = new Friends({ user: req.user._id, friends: [] })
        await friend.save()
        res.redirect('/:user/dashboard')

    } catch (error) {
        console.log(error)
        res.redirect('/register')
    }
})
router.get('/login', async(req, res) => {
    res.render("login");
})
router.post('/login', passport.authenticate('local', { failureFlash: false, failureRedirect: '/login' }), async(req, res) => {
    res.redirect('/:user/dashboard')
})
router.get('/logout', async(req, res) => {
    req.logOut(function(err) {
        if (err) { console.log(err) }
        res.redirect('/')
        return
    })
})
module.exports = router