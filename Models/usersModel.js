const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    fname: String,
    lname: String,
    email: String,
    password: String,
    phone: Number,
    gender: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);
