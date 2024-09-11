const message = require("../constant/message");
const Property = require("../models/property.model");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcryptjs");
const { ObjectId } = require("mongodb");
const emailSend = require("../helper/email-send");
const User = require("../models/user.model");
const getPropertyById = async (req, res) => {
  const { id } = req.params;

  const isPropertyFindById = await Property.findOne({ _id: new ObjectId(id) });

  console.log("isPropertyFindById", isPropertyFindById);
  res.send({
    message: "fetch specific property successfully",
    status: true,
    property: isPropertyFindById,
  });
};

const resetPassword = async function (req, res) {
  const email = req.body.email;
  const otp = otpGenerator.generate(4, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  });
  console.log("otp", otp);
  const message = await emailSend(email, otp, "reset");
  if (message) {
    const userFind = await User.findOne({ username: email });
    console.log("userFind", userFind);
    const userUpdate = await User.updateOne(
      { username: email },
      { $set: { forgotOtp: otp } }
    );
    console.log("userUpdate", userUpdate);
    if (userUpdate.modifiedCount > 0) {
      res.send({
        message: "otp sent in your email address,please check",
        status: true,
      });
    } else {
      res.send({
        message: "otp sent failed,please check back later",
        status: false,
      });
    }
  } else {
    res.send({
      message: "otp sent failed,please check back later",
      status: false,
    });
  }
};

const newPasswordUpdate = async function (req, res) {
  console.log("** newPasswordUpdate controller calling **");

  const { email, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  console.log("hashPassword=", hashPassword);
  const userFind = await User.findOne({ username: email });
  console.log("userFind", userFind);
  const userUpdate = await User.updateOne(
    { username: email },
    { $set: { password: hashPassword } }
  );
  console.log("userUpdate", userUpdate);
  if (userUpdate.modifiedCount > 0) {
    res.send({
      message: "new password has been reset,please login now",
      status: true,
    });
  } else {
    res.send({
      message: "Reset failed , please try back later",
      status: false,
    });
  }
};

const otpVerify = async function (req, res) {
  console.log("** otpVerify controller calling **");
  const { email, otp } = req.body;

  const userFind = await User.findOne({ username: email });
  console.log("userFind", userFind);
  if (userFind.forgotOtp == otp) {
    res.send({ message: "otp verified successfully", status: true });
  } else {
    res.send({ message: "otp invalid", status: false });
  }
};

module.exports = {
  getPropertyById,
  resetPassword,
  otpVerify,
  newPasswordUpdate,
};
