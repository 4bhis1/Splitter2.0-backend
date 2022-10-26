const mongoose = require("mongoose");

const { Schema } = mongoose;

const date = new Date();

const NotificationSchema = new Schema({
  receiverPhoneNumber: { type: Number, required: true },
  action: { type: String, required: true },
  createdon: {
    date: { type: Number, default: date.getDate() },
    month: { type: Number, default: date.getMonth() },
    year: { type: Number, default: date.getFullYear() },
    hour: { type: Number, default: date.getHours() },
    min: { type: Number, default: date.getMinutes() },
  },
});

module.exports = mongoose.model("notifications", NotificationSchema);
