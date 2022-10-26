const mongoose = require("mongoose");
const { getCustomDate } = require("../controllers/lib/PureFunctions");

const { Schema } = mongoose;
const date = new Date();

const UserSchema = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: String,
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true, unique: true },
    password: { type: String, required: true },
    // createdon: { type: String, default: getCustomDate() },
    createdon: {
      date: { type: Number, default: date.getDate() },
      month: { type: Number, default: date.getMonth() },
      year: { type: Number, default: date.getFullYear() },
    },

    token: { type: String },
  },
  {
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true },
  }
);

UserSchema.virtual("phonefromusers", {
  ref: "groups",
  localField: "phone",
  foreignField: "members",
});

module.exports = mongoose.model("users", UserSchema);
