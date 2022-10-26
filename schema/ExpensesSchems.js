const mongoose = require("mongoose");

const { Schema } = mongoose;

// expenseGroup

// 	expensename : String
// 	groupId : groups
// 	createdon : ""
// 	shetteled : boolean
// 	shettel : [ {who : String, amount : number, whom : String }]
// 	expense : [ { giver : String, amount : number, taker : String}]
const date = new Date();

const ExpensesSchema = new Schema(
  {
    expensename: { type: String, required: true },

    groupid: { type: mongoose.Schema.Types.ObjectId, ref: "groups" },
    createdon: {
      date: { type: Number, default: date.getDate() },
      month: { type: Number, default: date.getMonth() },
      year: { type: Number, default: date.getFullYear() },
    },
    setteled: { type: Boolean, default: false },
    expense: [{ name: String, amount: Number, phone: Number }],

    chat: [
      {
        name: String,
        text: String,
        phone: Number,
        chatdate: {
          date: { type: Number, default: date.getDate() },
          month: { type: Number, default: date.getMonth() },
          year: { type: Number, default: date.getFullYear() },
          hour: { type: Number, default: date.getHours() },
          min: { type: Number, default: date.getMinutes() },
        },
      },
    ],
  },
  {
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model("expenses", ExpensesSchema);
