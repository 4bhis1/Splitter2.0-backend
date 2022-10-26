const express = require("express");

const { getExpenses, showExpenses, createExpenses, editExpense, addChat, showChat } = require("../controllers/expense");
const verifyToken = require("../utils/auth");

const router = express.Router();

// router.route("/getexpenses").post(verifyToken, getExpenses);
router.route("/showexpenses").post(verifyToken, showExpenses);
router.route("/createexpense").post(verifyToken, createExpenses);
router.route("/editexpense").post(verifyToken, editExpense);
router.route("/addchat").post(verifyToken, addChat);
router.route("/showchat").post(verifyToken, showChat);

module.exports = router;
