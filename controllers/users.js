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
  try {
    const { firstname, lastname, email, password, phone } = req.body;

    if (!(firstname && lastname && email && password && phone)) {
      res.status(400).json({ message: "all inputs is required" });
    }

    const oldUser = await UserSchema.find({ phone: phone });

    if (oldUser[0]) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    let user = await UserSchema.create({
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

    res.status(201).json({ message: "Succesfully Signed in" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "something went wrong" });
  }
});

exports.login = catchAsync(async (req, res, next) => {
  //getting email and password
  const { phone, password } = req.body;

  if (!(phone && password)) {
    res.status(400).send("All input is required");
  }
  let user = await UserSchema.findOne({ phone });

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign(
      { user_id: user._id, phone },
      process.env.TOKEN_KEY,
      {
        // expiresIn: "2h",
      }
    );

    // will store a token into the local storage and whenever query will be sent it will be sent using toke

    // user
    res.status(200).json({ message: "Succesfully logedin", token });
  } else res.status(200).json("Invalid credentials");
});
