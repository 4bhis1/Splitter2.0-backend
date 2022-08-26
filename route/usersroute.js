const express = require("express");

const { getUser, register, login } = require("../controllers/users");
const { create } = require("../schema/GroupsSchema");

const router = express.Router();

router.route("/getusers").get(getUser);
router.route("/register").post(register);
router.route("/login").post(login);

module.exports = router;
