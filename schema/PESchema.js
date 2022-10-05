// PE: [{ name: { type: String, required: true }, debit: Number, credit: Number, date: Date.now() }],

const mongoose = require("mongoose");

const { Schema } = mongoose;

const PESchema = new Schema(
  {
    userid: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    name: { type: String, required: true },
    debitType: String,
    debit: Number,
    creditType: String,
    credit: Number,
    createdon: { type: Date, default: Date.now() },
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
