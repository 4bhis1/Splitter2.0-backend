const UserSchema = require("../schema/UsersSchema");
const catchAsync = require("../utils/catchAsync");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.getUser = catchAsync(async (req, res, next) => {
  const data = await UserSchema.find();
  res.status(200).json({ message: "data recieved successfully", data: data });
});

exports.register = catchAsync(async (req, res, next) => {
  // console.log("Register got fired");

  try {
    // console.log(">>>?>?>?>?>?> requestBody", req.body);
    const { firstname, lastname, email, password, phone } = req.body;

    if (!(firstname & groupid & lastname && email && password && phone)) {
      // console.log("Cursor is here");
      res.status(400).json({ message: "all inputs is required", result: false });
    }

    const oldUser = await UserSchema.find({ phone });

    // console.log(">>>>>>?>>>> olduser", oldUser);
    if (oldUser[0]) {
      return res.status(409).send({ message: "User Already Exist. Please Login", result: false });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    await UserSchema.create({
      firstname,
      lastname,
      email: email.toLowerCase(),
      password: encryptedPassword,
      phone,
    });

    // const token = jwt.sign(
    //   { user_id: user._id, phone },
    //   process.env.TOKEN_KEY,
    //   {
    //     expiresIn: "2h",
    //   }
    // );

    // user.token = token;

    res.status(201).json({ message: "Succesfully Signed in", result: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong", result: false });
  }
});

exports.login = catchAsync(async (req, res, next) => {
  //getting email and password
  const { phone, password } = req.body;

  if (!(phone && password)) {
    res.status(400).json({ message: "All input is required", result: false });
  }
  let user = await UserSchema.findOne({ phone });

  if (!user) {
    res.status(400).json({ message: "User Not Found", result: false });
  }

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ user_id: user._id, phone }, process.env.TOKEN_KEY, {
      // expiresIn: "2h",
    });

    // will store a token into the local storage and whenever query will be sent it will be sent using toke

    // user
    res.status(200).json({ message: "Succesfully logedin", token, result: true });
  } else res.status(400).json({ message: "Password Not Correct", result: false });
});

exports.getdata = catchAsync(async (req, res, next) => {
  console.log("inside data");
  const { phone } = req.body;

  if (phone.length === 10) {
    let data = await UserSchema.findOne({ phone }, { firstname: 1, lastname : 1 });

    console.log(data);

    if (data) res.status(200).json({ data });
    else res.status(400).json({ message: "No phone found in database" });
  } else {
    res.status(400).json({ message: "Phone number is not valid" });
  }
});
