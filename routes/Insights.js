const express = require('express')
const router = express.Router()
const Expense = require('../models/expense.js')
var  monthlyExpenses,selectedYear // Initialize an array to store monthly expenses
router.get('/', async(req, res) => {
    res.render('insights',{user : req.user.username,monthly:monthlyExpenses,year:selectedYear})
})
router.post('/month', async (req, res) => {
  const userExpense = await Expense.findOne({ user: req.user.id }).populate('user');
  const expenses = userExpense.expense;
  selectedYear = parseInt(req.body.year);
  monthlyExpenses = new Array(12).fill(0);
  for (const expense of expenses) {
    const expenseYear = expense.date.getFullYear();
    if (parseInt(expenseYear) === selectedYear) { // Convert expenseYear to an integer
      const expenseMonth = expense.date.getMonth();
      monthlyExpenses[expenseMonth] += expense.Amount;
    }
  }
  res.redirect("/"+req.user.username+"/insights");
});
module.exports = router
