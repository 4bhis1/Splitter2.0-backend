// PE: [{ name: { type: String, required: true }, debit: Number, credit: Number, date: Date.now() }],

const mongoose = require("mongoose");

const { Schema } = mongoose;

const date = new Date();

const PESchema = new Schema(
  {
    userid: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    expensename: { type: String, required: true },
    debit: Number,
    credit: Number,
    description: String,
    createdon: {
      date: { type: Number, default: date.getDate() },
      month: { type: Number, default: date.getMonth() },
      year: { type: Number, default: date.getFullYear() },
    },
  },
  {
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true },
  }
);

// PESchema.virtual("phonefromusers", {
//   ref: "groups",
//   localField: "phone",
//   foreignField: "members",
// });

module.exports = mongoose.model("personalExpense", PESchema);
