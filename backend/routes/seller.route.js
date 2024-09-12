const express = require("express");

const multer = require("multer"); //multer is a middleware
const { ObjectId } = require("mongodb");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, req.params.id + "-" + file.originalname); //durgesh@gmail.com-wqeywqewtrwruewryewryew.png
  },
});
const upload = multer({ storage: storage });
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

Router.post("/api/create/:id", async (req, res) => {
  console.log("create property calling");
  const { title, contact, description, address, price, services } = req.body;
  const insertProperty = new Property({
    title,
    propertyDetails: description,
    address,
    price,
    contactNumber: contact,
    services,
    status: "Active", //1=Active,0=InActive
    sellerId: req.params.id,
  });
  const isInserted = await insertProperty.save();
  console.log("isInserted", isInserted);
  if (isInserted) {
    res.send({
      message: "Property Created Successfully",
      status: true,
      property: isInserted,
    });
  } else {
    res.send({ message: "something went wrong !", status: false });
  }
});

Router.post(
  "/api/upload/:id",
  upload.single("image"),
  async (req, res) => {
    console.log("req.params.email", req.params.id);
    console.log("req", req.file);

    const propertyUpdate = await Property.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { image: req.params.id + "-" + req.file.originalname } }
    );
    console.log("propertyUpdate", propertyUpdate);
    if (propertyUpdate) {
      res.send({
        message: "image uploaded successfully",
        status: 1,
        image: req.params.email + "-" + req.file.originalname,
      });
    } else {
      res.send({ message: "image uploaded failed", status: 0 });
    }
  }
);

Router.post("/api/property/update/:id", async (req, res) => {
  console.log("req.params.id", req.params.id);
  const { title, description, contact, address, price, services } = req.body;

  const propertyUpdate = await Property.updateOne(
    { _id: new ObjectId(req.params.id) },
    {
      $set: {
        title: title,
        contactNumber: contact,
        propertyDetails: description,
        price: price,
        services,
        address,
      },
    }
  );
  console.log("propertyUpdate", propertyUpdate);
  if (propertyUpdate) {
    res.send({
      message: "Propert details updated successfully",
      status: true,
    });
  } else {
    res.send({ message: "image uploaded failed", status: false });
  }
});

// Router.get("/api/download/:id",async(req,res)=>{
//   const id=req.params.id;

// })

Router.get("/api/get-property/:id", async (req, res) => {
  const userId = req.params.id;
  const isPropertyFind = await Property.find({ sellerId: userId });
  console.log("isPropertyFind", isPropertyFind);
  res.send({
    message: "fetched specific property successfully",
    status: true,
    property: isPropertyFind,
  });
});

Router.get("/api/property-delete/:id", async (req, res) => {
  const id = req.params.id;
  const isPropertyFind = await Property.find({ _id: new ObjectId(id) });

  const propertyDelete = await Property.deleteOne({ _id: new ObjectId(id) });

  console.log("isPropertyFind", propertyDelete);
  res.send({
    message: "delete property successfully",
    status: true,
  });
});

module.exports = Router;
