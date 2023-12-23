const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please provide firstname"],
      maxlength: 30,
      minlength: [3, "Minimum firstname length is 6 characters"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Please provide lastname"],
      maxlength: 30,
      minlength: [3, "Minimum firstname length is 6 characters"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error("Password should not contain word: password");
        }
      },
      minlength: [6, "Minimum password length is 4 characters"],
      select: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      trim: true,
    },
    confirmPassword: {
      type: String,
      minlength: [6, "Minimum password length is 4 characters"],
      select: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

exports.User = User;
