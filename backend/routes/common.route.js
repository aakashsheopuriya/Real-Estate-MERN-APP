const express = require("express");
const Router = express.Router();
const dbConnect = require("../db/dbConnect");
const commonController = require("../controllers/common.controller");

Router.post("/api/login", commonController.login);

Router.post("/api/register", commonController.register);

Router.get("/api/get-role/:email", commonController.getRole);

Router.post("/api/user-update/:email", commonController.userUpdate);

Router.get("/api/delete/:email", commonController.userDelete);

Router.get("/api/get-property/:id", commonController.getPropertyById);

Router.post("/api/otp-sent", commonController.resetPassword);

Router.post("/api/otp-verify", commonController.otpVerify);

Router.post("/api/newpassword-update", commonController.newPasswordUpdate);

module.exports = Router;
