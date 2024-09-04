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

Router.post("/api/create",async (req, res) => {
  console.log("create property calling");
  const { title, contact, description, address, price, services } = req.body;
  const image=req.file.originalname;
  const insertProperty = new Property({
    title,
    propertyDetails: description,
    address,
    price,
    contactNumber: contact,
    services,
    status: "Active", //1=Active,0=InActive
    sellerId: "durgesh@gmail.com",
    image:"durgesh@gmail.com"+image
  });
  const isInserted = await insertProperty.save();
  console.log("isInserted", isInserted);
  if (isInserted) {
    res.send({ message: "Property Created Successfully", status: true });
  } else {
    res.send({ message: "something went wrong !", status: false });
  }
});

Router.get("/api/get-property/:id", async (req, res) => {
  const userId = req.params.id;
  const isPropertyFind = await Property.find({ sellerId: userId });
  console.log("isPropertyFind", isPropertyFind);
  res.send({message:"fetched specific property successfully",status:true,property:isPropertyFind});
});

module.exports = Router;
