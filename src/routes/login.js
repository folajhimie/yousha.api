const bcrypt = require("bcrypt");
const { User } = require("../models/user");
// const Joi = require("joi");
const express = require("express");
const generateAuthToken = require("../utils/generateAuthToken");
const router = express.Router();
const validateLogin = require("../validator/login.js")

router.post("/",validateLogin, async (req, res) => {


  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password...");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send("Invalid email or password...");

  const token = generateAuthToken(user);

  const options = {
    path: "/",
    expires: new Date(
      Date.now() + 1000 * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    sameSite: "none",
    secure: true,
  };

  return res
    .status(200)
    .cookie("token", token, options)
    .json({
      status: true,
      message: "user login successfully",
      user,
      token
    });
});

module.exports = router;
