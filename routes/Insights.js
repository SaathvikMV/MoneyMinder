const express = require('express')
const router = express.Router()
const Expense = require('../models/expense.js')

router.get('/', async (req, res) => {
  const userExpense = await Expense.findOne({ user: req.user.id }).populate('user');
  const expenses = userExpense.expense;
  let selectedYear = req.query.year ? parseInt(req.query.year) : 2023;
  monthlyExpenses = new Array(12).fill(0);
  for (const expense of expenses) {
    const expenseYear = expense.date.getFullYear();
    if (expenseYear === selectedYear) {
      const expenseMonth = expense.date.getMonth();
      monthlyExpenses[expenseMonth] += expense.Amount;
    }
  }
  const selectedMonth = req.query.month ? parseInt(req.query.month) : "2023-06";

  const categoryTotals = {};

  for (const expense of expenses) {
    const expenseMonth = expense.date.toISOString().substr(0, 7); // Get the month in "YYYY-MM" format

    if (expenseMonth !== selectedMonth) {
      continue;
    }

    const category = expense.category;
    const amount = expense.Amount;

    if (category in categoryTotals) {
      categoryTotals[category] += amount;
    } else {
      categoryTotals[category] = amount;
    }
  }
  console.log(categoryTotals);
res.render('insights', { user: req.user.username, monthly: monthlyExpenses, year: selectedYear,categoryTotals,selectedMonth});
});

router.post('/month', async (req, res) => {
  let selectedYear = req.body.year ? parseInt(req.body.year) : 2023;
  res.redirect("/" + req.user.username + "/insights?year=" + selectedYear);
});

router.post('/piechart', async (req, res) => {
  const selectedMonth = req.body.month ? parseInt(req.body.month) : "2023-06";
  console.log(selectedMonth);
  res.redirect(`/${req.user.username}/insights?month=${selectedMonth}`);
});


module.exports = router
