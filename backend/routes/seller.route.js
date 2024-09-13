const express = require("express");
const Router = express.Router();
const sellerController = require("../controllers/seller.controller");
const upload = require("../helper/multer");

Router.post("/api/create/:id", sellerController.createProperty);

Router.post(
  "/api/upload/:id",
  upload.single("image"),
  sellerController.propertyImageUpload
);

Router.post("/api/property/update/:id", sellerController.propertyUpdate);

Router.get("/api/get-property/:id", sellerController.getPropertyById);

Router.get("/api/property-delete/:id", sellerController.propertyDelete);

module.exports = Router;
