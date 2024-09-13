const express = require("express");
const bcrypt = require("bcryptjs");
const Router = express.Router();
const message = require("../constant/message");
const dbConnect = require("../db/dbConnect");
// const student = require("../controllers/student.controller");
const commonController = require("../controllers/common.controller");
const User = require("../models/user.model");

Router.post("/api/login", async function (req, res) {
  console.log("req body data", req.body);
  const { username, password } = req.body;
  if (username && password) {
    const users = await dbConnect();
    const userFind = await User.findOne({ username });
    if (userFind) {
      bcrypt.compare(password, userFind.password, function (err, result) {
        console.log("error", err);
        console.log("result", result);
        if (result) {
          res.send({ message: "user login successfully", status: 1 });
        } else {
          res.send({
            message: "entered email or password is invalid,please check again",
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
});

Router.post("/api/register", async function (req, res) {
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
});

//get role api
Router.get("/api/get-role/:email", async (req, res) => {
  const email = req.params.email;
  const users = await dbConnect();
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
});

//user details update
Router.post("/api/user-update/:email", async (req, res) => {
  try {
    const email = req.params.email;
    console.log("email=", email);
    const { firstname, lastname, address } = req.body;
    const userFind = await User.findOne({ username: email });
    console.log("userFind", userFind);
    const userUpdate = await User.updateOne(
      { username: email },
      { $set: { firstname: firstname, lastname: lastname, address: address } }
    );
    console.log("userUpdate", userUpdate);
    if (userUpdate) {
      res.send({ message: "User details updated successfully", status: true });
    } else {
      res.send({ message: "User details not updated", status: false });
    }
  } catch (error) {
    console.log("in catch block", error.message);
  }
});

//user delete
Router.get("/api/delete/:email", async (req, res) => {
  const email = req.params.email;
  const users = await dbConnect();
  const userDelete = await users.deleteOne({ username: email });
  if (userDelete) {
    res.send({ message: "User Deleted successfully", status: 1 });
  } else {
    res.send({ message: "User not Deleted", status: 0 });
  }
});

//get sepcific property details by Id

Router.get("/api/get-property/:id", commonController.getPropertyById);

Router.post("/api/otp-sent", commonController.resetPassword);

Router.post("/api/otp-verify", commonController.otpVerify);
Router.post("/api/newpassword-update", commonController.newPasswordUpdate);

module.exports = Router;
