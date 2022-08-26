const mongoose = require("mongoose");

exports.connectToDatabase = () =>
  mongoose.connect(
    "mongodb://localhost:27017/splitter",
    () => {
      console.log("Connected to database posts and authors");
    },
    (e) => console.log(e)
  );
