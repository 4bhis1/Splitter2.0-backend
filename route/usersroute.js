const express = require("express");

const { getUser, register, login, getdata } = require("../controllers/users");
const verifyToken = require("../utils/auth");

const router = express.Router();

router.route("/getusers").get(getUser);
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/getdata").post(verifyToken, getdata);

module.exports = router;
