const express = require("express");

const { showExpenses, createExpenses, editExpense } = require("../controllers/PE");
const verifyToken = require("../utils/auth");

const router = express.Router();

router.route("/showexpenses").post(verifyToken, showExpenses);
router.route("/createexpense").post(verifyToken, createExpenses);
router.route("/editexpense").post(verifyToken, editExpense);

module.exports = router;
