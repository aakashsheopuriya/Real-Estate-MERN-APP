const express = require("express");
const userController = require("../controllers/user.controller");
const Router = express.Router();

const multer = require("multer"); //multer is a middleware
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, req.params.email+"-"+file.originalname);//durgesh@gmail.com-wqeywqewtrwruewryewryew.png
  },
});
const upload = multer({ storage: storage });

Router.get("/", function (req, res) {
  res.send({
    message: "welcome to the user root",
    status: 1,
  }); //json data response
});

Router.get("/api/get-users", userController.getUsers);

Router.get("/api/user/:id", userController.getUserById);

Router.get("/api/user/delete/:id", userController.userDelete);

Router.post("/api/reset-password", userController.resetPassword);

Router.post("/api/emailsend", userController.userEmailSend);

Router.post("/api/upload/:email", upload.single("image"), userController.userUpload);

Router.get("/api/download/:image",userController.profileDownload)

Router.get("/api/profile/delete/:image",userController.profileDelete)


module.exports = Router;
