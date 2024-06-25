const studentModel = require("../models/studentModel");
const bcrypt = require("bcrypt");
const {sendMail} = require('../service/emailService')


const studentSignup = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    const newStudent = new studentModel(req.body);
    const emailExist = await studentModel.findOne({ email });
    const nameExist = await studentModel.findOne({ name });
    if (emailExist) {
      return res.status(409).json({
        success: false,
        message: "Email already exist",
      });
    }
    if (nameExist) {
      return res.status(409).json({
        success: false,
        message: "name already exist",
      });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "password and confirm password does not match",
      });
    }
    const salt = await bcrypt.genSalt(10);
    newStudent.password = await bcrypt.hash(password, salt);
    await newStudent.save();
    res.status(201).json({
      success: true,
      message: "Student registered successfully",
      data: newStudent,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const studentLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const findStudent = await studentModel.findOne({ email });
    if (!findStudent) {
      return res.status(404).json({
        success: false,
        message: "Email Not found",
      });
    }
    const isMatch = await bcrypt.compare(password, findStudent.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    const emailSubject = 'Thank you for logging in .. !';
    const emailText = `Hi ${findStudent.name},\n\nThank you for logging in to our website!\n\nBest regards,\n WOF Team`;
    sendMail(findStudent.email, emailSubject, emailText)
    return res.status(200).json({
      success: true,
      message: "Student login successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


module.exports = { studentSignup, studentLogin };
