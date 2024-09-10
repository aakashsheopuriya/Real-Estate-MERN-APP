const message = require("../constant/message");
const Property = require("../models/property.model");
const otpGenerator = require("otp-generator");
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

module.exports = { getPropertyById, resetPassword };
