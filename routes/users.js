const express = require("express");
const catchAsync = require("../utils/catchAsync");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");
const users = require("../controllers/users");

router
  .route("/register")
  .get(users.registerForm)
  .post(catchAsync(users.registerUser));

router
  .route("/login")
  .get(users.loginForm)
  .post(
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    users.loginUser
  );
router.get("/logout", users.logoutUser);
module.exports = router;
