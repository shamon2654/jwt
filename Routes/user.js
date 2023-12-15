const express = require("express");
const router = express.Router();
const { signUp } = require("../Controller/user");


router.route("/signup").post(signUp);

module.exports=router