const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: String,
  email: { type: String, required: true, unique: true },
  phone: { type: Number, required: true, unique: true },
  password: { type: String, required: true },
  createdon: { type: Date, default: Date.now() },
  token: { type: String },
});

module.exports = mongoose.model("users", UserSchema);
