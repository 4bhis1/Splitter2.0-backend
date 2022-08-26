const ExpensesSchema = require("../schema/ExpensesSchems");
const catchAsync = require("../utils/catchAsync");

exports.getExpenses = catchAsync(async (req, res, next) => {
  const data = await ExpensesSchema.find();
  res.status(200).json({ message: "data recieved successfully", data: data });
});
