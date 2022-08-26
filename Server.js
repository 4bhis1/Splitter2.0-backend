const express = require("express");
const { connectToDatabase } = require("./database/Connect");

const userRoute = require("./route/usersroute");
const groupRoute = require("./route/groupsroute");
const expenseRoute = require("./route/expenseroute");

// const postsandauthors = require("./Route/postsAnsAuthor");

let cors = require("cors");

const app = express();

app.use(cors());
//Middle ware
app.use(express.json());

//routes
app.use("/api/v1/users", userRoute);
app.use("/api/v1/groups", groupRoute);
app.use("/api/v1/expenses/", expenseRoute);

// app.use("/",postsandauthors);

app.use("*", (req, res, next) => {
  res.status(404).json({
    message: "Route not found",
  });
});

//Error Handler
app.use((err, req, res, next) => {
  console.log("Error", err);
  res.status(400).json({
    error: "Something Went Wrong",
  });
});

app.listen(4444, () => {
  console.log("Connected to server, connected on port 4444");
  connectToDatabase();
});
