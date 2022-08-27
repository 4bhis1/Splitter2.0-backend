const mongoose = require("mongoose");

const { Schema } = mongoose;

/*
avg: (2) [300, 320]
expenses: (2) [{…}, {…}]
logo: {$$typeof: Symbol(react.element), key: null, ref: null, props: {…}, type: ƒ, …}
members: (3) ['Abhishek', 'Shubhum', 'topesh']
result: (2) [Array(2), Array(2)]

*/

/*
groups Schema
	
	average : Number
	groupname : String
	membersId : [ {membername : String, phone : Number, memebrId : users}]
	imageNumber : Number
	expenseGroupId : [expenseid]
	ceatedOn : Date

*/

const GroupsSchema = new Schema(
  {
    // average : Number,
    groupname: { type: String, required: true },
    members: [
      {
        membersfirstname: String,
        phone: Number,
        // memebrId: {
        //   firstname: { type: String, required: true },
        //   lastname: String,
        //   memberphone: { type: Number, required: true },
        //   memberId: { type: Schema.Types.ObjectId, ref: "users" },
        // },
      },
    ],
    image: { type: Number },
    // epxenses: [{ epenseId: { type: Schema.Types.ObjectId, ref: "expenses" } }],
    createdon: { type: Date, default: Date.now() },
  },
  {
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true },
  }
);



module.exports = mongoose.model("groups", GroupsSchema);
