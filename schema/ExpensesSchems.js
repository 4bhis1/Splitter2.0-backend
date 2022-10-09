const mongoose = require("mongoose");

const { Schema } = mongoose;

// expenseGroup

// 	expensename : String
// 	groupId : groups
// 	createdon : ""
// 	shetteled : boolean
// 	shettel : [ {who : String, amount : number, whom : String }]
// 	expense : [ { giver : String, amount : number, taker : String}]

const ExpensesSchema = new Schema(
  {
    expensename: { type: String, required: true },

    groupid: { type: mongoose.Schema.Types.ObjectId, ref: "groups" },
    createdon: { type: Date, default: Date.now() },
    setteled: { type: Boolean, default: false },
    expense: [{ name: String, amount: Number, phone: Number }],
    chat: [{ name: String, text: String, phone: Number, chatdate: { type: Date, default: Date.now() } }],
  },
  {
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model("expenses", ExpensesSchema);
