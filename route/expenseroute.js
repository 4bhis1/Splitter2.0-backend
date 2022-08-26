const express = require("express");

const { getExpenses } = require("../controllers/expense");

const router = express.Router();

router.route("/getexpenses").get(getExpenses);
module.exports = router;
