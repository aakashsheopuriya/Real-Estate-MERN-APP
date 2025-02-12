const express = require("express");
const userController = require("../controllers/user.controller");
const Router = express.Router();

const upload = require("../helper/multer");

Router.get("/", function (req, res) {
  res.send({
    message: "welcome to the user root",
    status: 1,
  });
});

// Router.get("/api/get-users", userController.getUsers);

Router.get("/api/user/:username", userController.getUserByUsername);

Router.get("/api/requested/user/:id", userController.getUserById);

Router.get("/api/user/delete/:id", userController.userDelete);

Router.post("/api/reset-password", userController.resetPassword);

Router.post("/api/emailsend", userController.userEmailSend);

Router.post(
  "/api/upload/:id",
  upload.single("image"),
  userController.userUpload
);

Router.get("/api/download/:image", userController.profileDownload);

Router.get("/api/profile/delete/:image", userController.profileDelete);

module.exports = Router;
