const ExpensesSchema = require("../schema/ExpensesSchems");
const catchAsync = require("../utils/catchAsync");
const { Calculate } = require("./lib/Calculation");

const mongoose = require("mongoose");
const { simplifyExpense } = require("./lib/SimplifyExpense");

exports.getExpenses = catchAsync(async (req, res, next) => {
  console.log("inside get Expense");
  const data = await ExpensesSchema.find();
  res.status(200).json({ message: "data recieved successfully", data: data });
});

exports.showExpenses = catchAsync(async (req, res, next) => {
  // console.log("show Expenses", req.body);
  try {
    // console.log("insirde try");
    const { groupid } = req.body;
    // console.log("group id", groupid);

    let data = await ExpensesSchema.find({ groupid: groupid });

    let resultToShow = [];

    for (let inf of data) {
      const { result, avg } = Calculate(inf.expense);
      // let temp = {};
      // console.log(result, avg);
      // temp._id = inf._id;

      // console.log(result,avg)

      // temp.expensename = inf.expensename;
      // temp.groupid = inf.groupid;
      // temp.createdon = inf.createdon;
      // temp.setteled = inf.setteled;
      // temp.expense = inf.expense;
      // temp.result = result;
      // temp.avg = avg;
      // console.log("temp data is here >>>>>>>>>>>>>>>", temp);
      resultToShow.push(result);
    }
    // console.log(resultToShow);

    console.log(simplifyExpense(resultToShow));

    // console.log(Calculate(data.expense));

    // data.summary =
    // console.log(data);
    // console.log("Expenses`", resultToShow);
    let final = { data: data, result: simplifyExpense(resultToShow) };

    res.status(200).json({ message: "data recieved successfully", final });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "something went wrong" });
  }
});

exports.editExpense = catchAsync(async (req, res, next) => {
  try {
    const { _id, data } = req.body;
    const res = await ExpensesSchema.updateOne({ _id }, { data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "something went wrong" });
  }
});

exports.createExpenses = catchAsync(async (req, res, next) => {
  try {
    console.log("into craete Expense");
    const { expensename, groupid, expense } = req.body;

    console.log("expenses are here", expense);

    await ExpensesSchema.create({ expensename, groupid, expense });

    res.status(200).json({ message: "expenses created successfully" });
  } catch (err) {
    res.status(500).json({ message: "something went wrong" });
  }
});

exports.addChat = catchAsync(async (req, res, next) => {
  // chat: [{ name: String, text: String, phone: Number, chatdate: { type: Date, default: Date.now() } }],

  try {
    console.log("into addChat");
    const { name, text, phone, groupid } = req.body;

    await ExpensesSchema.findOneAndUpdate({ _id: groupid }, { $push: { chat: { name, text, phone } } });

    res.status(200).json({ message: "expenses created successfully" });
  } catch (err) {
    res.status(500).json({ message: "something went wrong" });
  }
});
