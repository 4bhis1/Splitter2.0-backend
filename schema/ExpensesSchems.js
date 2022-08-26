const mongoose = require("mongoose");

const { Schema } = mongoose;

// expenseGroup

// 	expensename : String
// 	groupId : groups
// 	createdon : ""
// 	shetteled : boolean
// 	shettel : [ {who : String, amount : number, whom : String }]
// 	expense : [ { giver : String, amount : number, taker : String}]

const ExpensesSchema = new Schema({
  expenseName: { type: String, required: true },

  groupId: { type: Schema.Types.ObjectId, ref: "groups" },
  createdon: { type: Date, default: Date.now() },
  setteled: { type: Boolean, default: false },
  settel: [{ who: String, amount: Number, whom: String }],
  expense: [{ giver: String, amount: Number, taker: String }],
});

module.exports = mongoose.model("expenses", ExpensesSchema);
