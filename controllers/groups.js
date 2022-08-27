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
  try {
    const { phone } = req.body;
    const data = await GroupsSchema.find();

    let dataAsPerPhone = [];

    for (let inf of data) {
      let temp = inf.members;
      for (let i of temp) {
        if (i.phone == phone) {
          dataAsPerPhone.push(inf);
        }
      }
    }

    res.status(200).json({ message: "Fetched all the data", dataAsPerPhone });
  } catch {
    res.status(500).json({ message: "Something went wrong" });
  }
});

exports.deleteGroup = catchAsync(async (req, res) => {
  console.log("into the delete group");

  const data = await GroupsSchema.deleteOne({ _id });

  res.status(200).json({ message: "Group deleted successfully", data });
});

exports.editGroup = catchAsync(async (req, res) => {
  try {
    const { _id, data } = req.body;
    const res = await GroupsSchema.updateOne({ _id }, { data });
  } catch {
    res.status(500).json({ message: "Something went wrong" });
  }
});
