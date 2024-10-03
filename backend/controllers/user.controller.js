const message = require("../constant/message");
const fs = require("fs");
// const users = require("../data/user.data");
const User = require("../models/user.model");
const emailSend = require("../helper/email-send");
const otpGenerator = require("otp-generator");
const { ObjectId } = require("mongodb");

const getUsers = async (req, res) => {
  res.send({
    message: "all users data fetched successfully",
    status: 1,
    users: users,
  }); //json data response
};

const getUserByUsername = async (req, res) => {
  const id = req.params.username;
  const userFind = await User.findOne({ username: id });
  if (userFind) {
    res.send({
      message: "specific user fetched successfully",
      status: 1,
      user: userFind,
    });
  } else {
    res.send({ message: "specific user not found successfully", status: 0 });
  }
};
const getUserById = async (req, res) => {
  const id = req.params.id;
  const userFind = await User.findOne({ _id: new ObjectId(id) });
  if (userFind) {
    res.send({
      message: "specific user fetched successfully",
      status: 1,
      user: userFind,
    });
  } else {
    res.send({ message: "specific user not found successfully", status: 0 });
  }
};

const userDelete = function (req, res) {
  let isFind = false; //false
  for (var i in users) {
    if (req.params.id == users[i].id) {
      isFind = true;
      break;
    }
  }
  if (isFind) {
    const user = users.filter((data) => {
      return data.id != req.params.id;
    });
    if (user.length > 0) {
      res.send({
        message: "delete specific user successfully",
        status: 1,
        user: user,
      });
    }
  } else {
    res.send({ message: `user not found with id ${req.params.id}`, status: 0 });
  }
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
    res.send({
      message: "otp sent in your email address,please check",
      status: 1,
    });
  }
};

const userEmailSend = async function (req, res) {
  const email = req.body.email;
  const message = await emailSend(email, "", "welcome");
  if (message) {
    res.send({ message: "message sent in your email address", status: 1 });
  }
};

const userUpload = async (req, res) => {
  const userFind = await User.findOne({ _id: new ObjectId(req.params.email) });
  if (userFind) {
    const userUpdate = await User.updateOne(
      { _id: new ObjectId(req.params.email) },
      { $set: { image: userFind._id.toString() + "-" + req.file.originalname } }
    );
    if (userUpdate) {
      res.send({
        message: "Updated successfully",
        status: 1,
        image: req.params.email + "-" + req.file.originalname,
      });
    } else {
      res.send({ message: " failed", status: 0 });
    }
  } else {
    res.send({ message: "user not found", statu: 0 });
  }
};

const profileDownload = async (req, res) => {
  const image = req.params.image;
  fs.readFile(`./uploads/${image}`, function (err, data) {
    if (data) {
      res.send(data);
    } else {
      res.send({ message: "something went srong!", status: 0 });
    }
  });
};

const profileDelete = async (req, res) => {
  const image = req.params.image;

  fs.unlink(`./uploads/${image}`, function (err, data) {
    if (err) {
      res.send({ message: "something went srong!", status: 0 });
    } else {
      res.send({ message: "old image deleted successfully", status: 1 });
    }
  });
};
module.exports = {
  getUsers,
  getUserByUsername,
  getUserById,
  userDelete,
  resetPassword,
  userEmailSend,
  userUpload,
  profileDownload,
  profileDelete,
};
