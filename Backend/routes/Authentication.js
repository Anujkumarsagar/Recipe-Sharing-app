const express = require("express");
const router = express.Router();


// Import controllers

const { signup, login, sendOtp } = require("../controllers/Auth");

// User routes

router.post("/signup", signup);
router.post("/login", login);
router.post("/otp", sendOtp);

module.exports = router;
