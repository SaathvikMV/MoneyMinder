const express = require('express')
const router = express.Router()
const Friend = require('../models/friends.js')
router.get('/', async(req, res) => {
    try {
        const userLoans = await Friend.findOne({ user: req.user.id }).populate('user')
        res.render("loan", { loans: userLoans.friends, user: req.user.username, items: [] })
    } catch (err) {
        console.log(err)
        res.redirect('/:user/dashboard')
    }
})
router.post("/add", async(req, res) => {
    const added_date = req.body.date;
    const loan_type = req.body.loan_type;
    const person = req.body.person;
    const amount = req.body.amount;
    const reason = req.body.reason;
    const friend = {
        date: added_date,
        type: loan_type,
        name: person,
        reason: reason,
        amount: amount
    };
    try {
        const userLoans = await Friend.findOne({ user: req.user.id }).populate('user')
        const friends = userLoans.friends
        friends.push(friend)
        await userLoans.save()
        res.redirect("/:user/loans")
    } catch (err) {
        console.log(err)
        res.redirect("/:user/loans")
    }
});
router.post("/delete", async(req, res) => {
    console.log('Inside delete route')
    try {
        const loanId = req.body.loanid
        const userLoans = await Friend.findOne({ user: req.user.id }).populate('user')
        const friends = userLoans.friends
        for (let i = 0; i < friends.length; i++) {
            if (friends[i]._id == loanId) {
                friends.splice(i, 1)
                break
            }
        }
        await userLoans.save()
        res.redirect("/:user/loans")
    } catch (err) {
        console.log(err)
        res.redirect("/:user/loans")
    }
});
module.exports = router