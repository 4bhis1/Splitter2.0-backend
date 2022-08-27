const GroupsSchema = require("../schema/GroupsSchema");
const UsersSchema = require("../schema/UsersSchema");
const catchAsync = require("../utils/catchAsync");

exports.getGroup = catchAsync(async (req, res, next) => {
  console.log(">>>>>>>>>> into get groups ");
  const data = await GroupsSchema.find();
  res.status(200).json({ message: "data recieved successfully", data: data });
});

exports.createGroup = catchAsync(async (req, res) => {
  console.log("into the create group");
  const { groupname, image, members } = req.body;
  const data = await GroupsSchema.create({ groupname, image, members });

  res.status(200).json({ message: "Group created successfully", data });
});

exports.showGroup = catchAsync(async (req, res) => {
  console.log("into the show group");

  const { phone } = req.body;

  const data = await UsersSchema.find().populate("phonefromusers");

  res.status(200).json({ message: "Fetched all the data", data });
});
