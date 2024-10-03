const Property = require("../models/property.model");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcryptjs");
const { ObjectId } = require("mongodb");
const emailSend = require("../helper/email-send");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const login = async function (req, res) {
  try {
    const { username, password } = req.body;
    if (username && password) {
      const userFind = await User.findOne({ username });
      if (userFind) {
        bcrypt.compare(password, userFind.password, function (err, result) {
          if (result) {
            var token = jwt.sign({ username: username }, "realState", {
              expiresIn: "1d",
            });
            res.send({
              message: "user login successfully",
              status: 1,
              role: userFind.role,
              token: token,
            });
          } else {
            res.send({
              message:
                "Entered Username or Password is invalid, please try again",
              status: 0,
            });
          }
        });
      } else {
        res.send({
          message: "user not found, please register first",
          status: 0,
        });
      }
    } else {
      res.send({
        message: message.error.loginMessage + "all fields are mandatory",
        status: 0,
      });
    }
  } catch (err) {
    console.log("error in catch block", err.message);
  }
};

const register = async function (req, res) {
  const { firstname, lastname, username, password, role } = req.body;
  if (firstname && lastname && username && password) {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    const userFind = await User.findOne({ username });
    if (userFind) {
      res.send({
        message: "This email is alredy registered, Please go to Login page",
        status: 0,
      });
    } else {
      const insertUser = new User({
        firstname,
        lastname,
        username,
        password: hashPassword,
        role,
        credits: 1000,
        status: 1, //1=Active,0=InActive
      });
      const isInserted = await insertUser.save();
      if (isInserted) {
        res.send({
          message: "Registration Successful, Redirecting to Login page...",
          status: 1,
          data: { firstname, lastname, username, password },
        });
      } else {
        res.send({
          message: "All fields are required",
          status: 0,
        });
      }
    }
  } else {
    res.send({ message: message.error.registerMessage, status: 0 });
  }
  //json data response
};

const getRole = async (req, res) => {
  const email = req.params.email;
  // const users = await dbConnect();
  const userFind = await users.findOne({ username: email });
  if (userFind) {
    res.send({
      message: "User role fetched successfully",
      status: 1,
      role: userFind.role,
    });
  } else {
    res.send({ message: "User role not fetched", status: 0 });
  }
};

const userUpdate = async (req, res) => {
  try {
    const email = req.params.email;
    const { firstname, lastname, address } = req.body;
    const userFind = await User.findOne({ username: email });
    const userUpdate = await User.updateOne(
      { username: email },
      { $set: { firstname: firstname, lastname: lastname, address: address } }
    );
    if (userUpdate) {
      res.send({ message: "User details updated successfully", status: true });
    } else {
      res.send({ message: "User details not updated", status: false });
    }
  } catch (error) {
    console.log("in catch block", error.message);
  }
};

const userDelete = async (req, res) => {
  const email = req.params.email;
  // const users = await dbConnect();
  const userDelete = await User.deleteOne({ username: email });
  if (userDelete) {
    res.send({ message: "User Deleted successfully", status: 1 });
  } else {
    res.send({ message: "User not Deleted", status: 0 });
  }
};

const getPropertyById = async (req, res) => {
  const { id } = req.params;

  const isPropertyFindById = await Property.findOne({ _id: new ObjectId(id) });

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
  const message = await emailSend(email, otp, "reset");
  if (message) {
    const userFind = await User.findOne({ username: email });
    if (userFind) {
      const userUpdate = await User.updateOne(
        { username: email },
        { $set: { forgotOtp: otp } }
      );
      if (userUpdate.modifiedCount > 0) {
        res.send({
          message: `Verification OPT is successfully sent to ${email},  please verify.`,
          status: true,
        });
      } else {
        res.send({
          message: "Entered usernme or email is incorrect, try again!",
          status: false,
        });
      }
    } else {
      res.send({
        message: "User not found, try again!",
        status: false,
      });
    }
  } else {
    res.send({
      message: "Entered usernme or email is incorrect, try again!!",
      status: false,
    });
  }
};

const newPasswordUpdate = async function (req, res) {
  const { email, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  const userFind = await User.findOne({ username: email });
  const userUpdate = await User.updateOne(
    { username: email },
    { $set: { password: hashPassword } }
  );
  if (userUpdate.modifiedCount > 0) {
    res.send({
      message: "Your password is reset successfully, Redirecting to login page",
      status: true,
    });
  } else {
    res.send({
      message: "Password reset proccess failed, please try again later",
      status: false,
    });
  }
};

const otpVerify = async function (req, res) {
  const { email, otp } = req.body;

  const userFind = await User.findOne({ username: email });
  if (userFind.forgotOtp == otp) {
    res.send({
      message: "OTP verified successfully, Create new password.",
      status: true,
    });
  } else {
    res.send({
      message: "Entered OTP is incorrect, please check or try agein later.",
      status: false,
    });
  }
};

module.exports = {
  login,
  register,
  getRole,
  userUpdate,
  userDelete,
  getPropertyById,
  resetPassword,
  otpVerify,
  newPasswordUpdate,
};
