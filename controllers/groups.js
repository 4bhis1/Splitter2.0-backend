const GroupsSchema = require("../schema/GroupsSchema");
const catchAsync = require("../utils/catchAsync");

exports.getGroup = catchAsync(async (req, res, next) => {
//   console.log(">>>>>>>>>>");
  const data = await GroupsSchema.find();
  res.status(200).json({ message: "data recieved successfully", data: data });
});
