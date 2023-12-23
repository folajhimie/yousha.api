const bcrypt = require("bcrypt");
const { User } = require("../models/user");
// const Joi = require("joi");
const express = require("express");
const generateAuthToken = require("../utils/generateAuthToken");
const router = express.Router();
// const { validateUser }= require('../validator/user')
const validateUser = require("../validator/user.js")


router.post("/", validateUser,  async (req, res) => {

  console.log("user started...");

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already exists...");

  console.log("here");

  const { firstName, lastName, email, password, confirmPassword } = req.body;

  user = new User({ firstName, lastName, email, password, confirmPassword });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

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

  console.log("created user...", user);

  // res.send(token);
  return res
    .status(200)
    .cookie("token", token, options)
    .json({
      status: true,
      message: "user created",
      user,
      token
    });
});

module.exports = router;
