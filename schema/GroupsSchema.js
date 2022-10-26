const mongoose = require("mongoose");

const { Schema } = mongoose;

const date = new Date();

const GroupsSchema = new Schema(
  {
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

module.exports = mongoose.model("groups", GroupsSchema);
