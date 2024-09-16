const express = require("express");
const Router = express.Router();
const sellerController = require("../controllers/seller.controller");
const upload = require("../helper/multer");
const Property = require("../models/property.model");

Router.post("/api/create/:id", sellerController.createProperty);

Router.post(
  "/api/upload/:id",
  upload.single("image"),
  sellerController.propertyImageUpload
);

Router.get("/api/get-property/:id", sellerController.getPropertyById);

Router.get("/api/get-all-property", async (req, res) => {
  const allProperty = await Property.find();
  res.send({
    message: "fetched specific property successfully",
    status: true,
    property: allProperty,
  });
});

module.exports = Router;
