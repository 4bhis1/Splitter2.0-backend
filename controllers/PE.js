const PESchema = require("../schema/PESchema");
const catchAsync = require("../utils/catchAsync");

// shoe expense
exports.showExpenses = catchAsync(async (req, res, next) => {
  console.log("inside show Personal Expense");
  try {
    const { userid } = req.body;

    let data = await PESchema.find({ userid });

    // console.log(data);

    res.status(200).json({ message: "data recieved successfully", data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "something went wrong" });
  }
});

exports.editExpense = catchAsync(async (req, res, next) => {
  try {
    const { _id, data } = req.body;
    const res = await PESchema.updateOne({ _id }, { data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "something went wrong" });
  }
});

// succesfully ho gya
exports.createExpenses = catchAsync(async (req, res, next) => {
  try {
    console.log("into create Expense of PE");
    const { userid, expensename, debit, credit, description } = req.body;

    await PESchema.create({ userid, expensename, debit, credit, description });

    res.status(200).json({ message: "expenses created successfully" });
  } catch (err) {
    res.status(500).json({ message: "something went wrong" });
  }
});
