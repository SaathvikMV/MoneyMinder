const express = require('express')
const router = express.Router()
const Expense = require('../models/expense.js')

router.get('/', async(req, res) => {
    const userExpense = await Expense.findOne({ user: req.user.id }).populate('user');
    const expenses = userExpense.expense;
    const expenDetails = { expenses: expenses, user: req.user.username, items: [] };
    res.render("dashboard", expenDetails);
  });
  
  router.post('/add', async(req, res) => {
    const added_date = req.body.date;
    const title = req.body.title;
    const amount = req.body.amount;
    const cat = req.body.category;
    const newExpense = {
      Amount: amount,
      description: title,
      date: added_date,
      category: cat
    };
  
    try {
      const expense = await Expense.findOne({ user: req.user.id }).populate('user');
      await expense.expense.push(newExpense);
      await expense.save();
  
      res.redirect(`/${req.params.user}/dashboard`);
    } catch (e) {
      console.log(e);
      res.redirect(`/${req.params.user}/dashboard`);
    }
  });
  

router.post('/delete', async(req, res) => {
    try {
        const expenseId = req.body.expenseId
        const userExpense = await Expense.findOne({ user: req.user.id }).populate('user')
        const expense = userExpense.expense
        for (let i = 0; i < expense.length; i++) {
            if (expense[i]._id == expenseId) {
                expense.splice(i, 1)
                break
            }
        }
        await userExpense.save()
        res.redirect(`/${req.params.user}/dashboard`);
    } catch (err) {
        console.log(err)
        res.redirect(`/${req.params.user}/dashboard`);
    }
})
module.exports = router
