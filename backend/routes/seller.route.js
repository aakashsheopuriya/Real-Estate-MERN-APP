const express = require("express");

const Router = express.Router();

const student = require("../controllers/student.controller");
const Property = require("../models/property.model");

Router.get("/", student.studentDashboard);

Router.get("/home", function (req, res) {
  res.sendFile(__dirname + "/home.html");
});

Router.get("/dashboard", function (req, res) {
  res.sendFile(__dirname + "/dashboard.html");
});

Router.post("/api/create",async(req,res)=>{
  console.log("create property calling");
  const {title,contact,description,address,price,services}=req.body;
  const insertProperty = new Property({
    title,
    propertyDetails:description,
    address,
    price,
    contactNumber:contact,
    services,
    status: "Active", //1=Active,0=InActive
    sellerId:"durgesh@gmail.com"
  });
  const isInserted=await insertProperty.save();
  console.log("isInserted",isInserted);
})

module.exports = Router;
