const ExpensesSchema = require("../schema/ExpensesSchems");
const NotificationSchema = require("../schema/NotificationSchema");
const UserSchema = require("../schema/UsersSchema");
const GroupsSchema = require("../schema/GroupsSchema");

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
    const { groupid } = req.body;

    let data = await ExpensesSchema.find(
      { groupid: groupid },
      {
        expensename: 1,
        groupid: 1,
        createdon: 1,
        setteled: 1,
        expense: 1,
      }
    );

    let resultToShow = [];

    for (let inf of data) {
      const { result, avg } = Calculate(inf.expense);
      resultToShow.push(result);
    }

    console.log(simplifyExpense(resultToShow));

    let final = { data: data, result: simplifyExpense(resultToShow) };

    res.status(200).json({ message: "data recieved successfully", final });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "something went wrong" });
  }
});

exports.showChat = catchAsync(async (req, res, next) => {
  // console.log("into show chat", req.body);
  try {
    const { groupid } = req.body;

    let data = await ExpensesSchema.find({ _id: groupid }, { chat: 1 });

    console.log("????", data);

    res.status(200).json({ message: "data recieved successfully", data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "something went wrong" });
  }
});

/// Abhi ispe kaam nhi ho rha h
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
    const { expensename, groupid, expense, userPhone, groupname } = req.body;

    // console.log("expenses are here", expense);

    await ExpensesSchema.create({ expensename, groupid, expense });

    const Notification = [];

    let { firstname, lastname } = await UserSchema.findOne({ userPhone }, { firstname: 1, lastname: 1 });

    // console.log("firstName is here", firstname, Notification);

    for (let i of expense) {
      if (i.phone != userPhone) {
        console.log("i -=>", i);
        Notification.push({
          receiverPhoneNumber: i.phone,
          action: `${firstname} added ${expensename} in ${groupname}`,
        });
      }
    }

    // console.log("Notifications ", Notification);

    await NotificationSchema.insertMany(Notification);

    res.status(200).json({ message: "expenses created successfully" });
  } catch (err) {
    console.log("errror in createExpense", err);
    res.status(500).json({ message: "something went wrong" });
  }
});

exports.addChat = catchAsync(async (req, res, next) => {
  // chat: [{ name: String, text: String, phone: Number, chatdate: { type: Date, default: Date.now() } }],

  try {
    console.log("into addChat");
    const { name, text, phone, groupid } = req.body;

    await ExpensesSchema.findOneAndUpdate({ _id: groupid }, { $push: { chat: { name, text, phone } } });

    // const data = ExpensesSchema.find()

    // const name = GroupsSchema.find({_id:}) 

    res.status(200).json({ message: "expenses created successfully" });
  } catch (err) {
    res.status(500).json({ message: "something went wrong" });
  }
});
