const UserSchema = require("../schema/UsersSchema");
const catchAsync = require("../utils/catchAsync");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.getUser = catchAsync(async (req, res, next) => {
  const data = await UserSchema.find();
  res.status(200).json({ message: "data recieved successfully", data: data });
});

exports.register = catchAsync(async (req, res, next) => {
  // const data = req.body;
  // console.log("createUser data", data);
  // await UserSchema.create(data);
  // res.status(200).json({ message: "data recieved successfully", data: data });
  try {
    const { firstname, lastname, email, password, phone } = req.body;

    console.log(req.body);

    if (!(firstname && lastname && email && password && phone)) {
      res.status(400).json({ message: "all inputs is required" });
    }

    const oldUser = await UserSchema.find({ phone: phone });
    console.log("oldUser >>>", !!oldUser[0]);
    if (oldUser[0]) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    console.log("encryptedPassword: ", encryptedPassword);

    let user = await UserSchema.create({
      firstname,
      lastname,
      email: email.toLowerCase(),
      password: encryptedPassword,
      phone,
    });
    console.log("user >>>", user._id, phone);

    const token = jwt.sign(
      { user_id: user._id, phone },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );

    console.log("token here", token);

    user.token = token;

    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "something went wrong" });
  }
});

exports.login = catchAsync(async (req, res, next) => {
  //getting email and password
  const { phone, password } = req.body;

  const data = await UserSchema.find({ phone: phone }, { password: 1 });
  console.log("da>>>>>", data);

  res.status(200).json({ message: "data recieved successfully", data: data });
});
