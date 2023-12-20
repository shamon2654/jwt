const express = require("express");
const router = express.Router();
const { signUp, login, userVerification, getUser } = require("../Controller/user");


router.route("/signup").post(signUp);
router.route("/login").post(login);
router.route("/verify").get(userVerification,getUser);

module.exports=router