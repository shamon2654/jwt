const express = require("express");
const router = express.Router();
const { signUp, login, userVerification, getUser, refreshToken } = require("../Controller/user");


router.route("/signup").post(signUp);
router.route("/login").post(login);
router.route("/verify").get(userVerification, getUser);
router.route("/refreshTok").get(refreshToken,userVerification,getUser);

module.exports=router