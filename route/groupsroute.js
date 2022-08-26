const express = require("express");

const { getGroup } = require("../controllers/groups");

const router = express.Router();

router.route("/getgroups").get(getGroup);
module.exports = router;
