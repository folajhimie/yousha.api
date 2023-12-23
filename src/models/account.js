const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
  {
    accountNumber: {
        type: String,
        required: [true, "Please provide account number"],
        maxlength: 120,
        minlength: [3, "Minimum firstname length is 6 characters"],
        trim: true,
    },
    address: {
        type: String,
        required: [true, "Please provide address"],
        maxlength: 500,
        minlength: [3, "Minimum firstname length is 6 characters"],
        trim: true,
    },
    socialSecurityNumber: {
        type: String,
        required: [true, "Please provide social security number"],
        maxlength: 500,
        minlength: [3, "Minimum firstname length is 6 characters"],
        trim: true,
    },
    dateOfBirth: {
        type: String,
        required: [true, "Please provide social security number"],
        maxlength: 500,
        minlength: [3, "Minimum firstname length is 6 characters"],
        trim: true,
    },
    taxNumber: {
        type: String,
        required: [true, "Please provide tax number"],
        maxlength: 500,
        minlength: [3, "Minimum firstname length is 6 characters"],
        trim: true,
    },
    employerNumber: {
        type: String,
        required: [true, "Please provide employer number"],
        maxlength: 500,
        minlength: [3, "Minimum firstname length is 6 characters"],
        trim: true,
    },
    employerNumber: {
        type: String,
        required: [true, "Please provide employer number"],
        maxlength: 500,
        minlength: [3, "Minimum firstname length is 6 characters"],
        trim: true,
    },
    frontId: { type: Object, required: true },
    backId: { type: Object, required: true },
    selfieId: { type: Object, required: true },
    applicantId: { type: Object, required: true },
  },
  { timestamps: true }
);

const Account = mongoose.model("Account", accountSchema);

exports.Account = Account;
