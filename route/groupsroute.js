const express = require("express");

const {
  getGroup,
  createGroup,
  showGroup,
  editGroup,
  deleteGroup,
} = require("../controllers/groups");
const verifyToken = require("../utils/auth");

const router = express.Router();

// router.route("/getgroups").post(verifyToken, getGroup);
router.route("/creategroup").post(verifyToken, createGroup);
router.route("/showgroup").post(verifyToken, showGroup);
router.route("/deletegroup").post(verifyToken, deleteGroup);
router.route("/editgroup").post(verifyToken, editGroup);
module.exports = router;
