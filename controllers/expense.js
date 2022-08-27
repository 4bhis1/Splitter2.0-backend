const ExpensesSchema = require("../schema/ExpensesSchems");
const catchAsync = require("../utils/catchAsync");
const { Calculate } = require("./lib/Calculation");

exports.getExpenses = catchAsync(async (req, res, next) => {
  const data = await ExpensesSchema.find();
  res.status(200).json({ message: "data recieved successfully", data: data });
});

exports.showExpenses = catchAsync(async (req, res, next) => {
  console.log("Expenses");
  try {
    const { groupid } = req.body;

    let data = await ExpensesSchema.find({ groupid });

    let resultToShow = [];

    for (let inf of data) {
      const { result, avg } = Calculate(inf.expense);
      let temp = {};
      // console.log(result, avg);
      temp._id = inf._id;
      temp.expensename = inf.expensename;
      temp.groupid = inf.groupid;
      temp.createdon = inf.createdon;
      temp.setteled = inf.setteled;
      temp.expense = inf.expense;
      temp.result = result;
      temp.avg = avg;
      console.log("temp", temp);
      resultToShow.push(temp);
    }

    // console.log("Expenses`", resultToShow);

    res
      .status(200)
      .json({ message: "data recieved successfully", resultToShow });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "something went wrong" });
  }
});

exports.editExpense = catchAsync(async (req, res, next) => {
  try {

    const { _id, data } = req.body;
    const res = await ExpensesSchema.updateOne({ _id }, { data });

  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: "something went wrong" });
  }
})

exports.createExpenses = catchAsync(async (req, res, next) => {
  try {
    const { expensename, groupid, expense } = req.body;

    await ExpensesSchema.create({ expensename, groupid, expense });

    res.status(200).json({ message: "expenses created successfully" });
  } catch (err) {
    res.status(500).json({ message: "something went wrong" });
  }
});
