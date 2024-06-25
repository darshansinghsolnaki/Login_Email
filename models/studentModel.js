const mongoose = require("mongoose");

const studentModel = new mongoose.Schema(
  {
    name : { type: String,required: [true, 'Name is required'], },
    email : { type: String },
    password : { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("student", studentModel);
