const express = require("express");
const Router = express.Router();
const sellerController = require("../controllers/seller.controller");
const upload = require("../helper/multer");
const verifyToken = require("../helper/verify");

Router.post("/api/create/:id", sellerController.createProperty);

Router.post(
  "/api/upload/:id",
  upload.single("image"),
  sellerController.propertyImageUpload
);

Router.post("/api/property/update/remove-services/:id", sellerController.propertyUpdateRemoveServices);


Router.post("/api/property/update/:id", sellerController.propertyUpdate);

Router.get("/api/get-property/:id", sellerController.getPropertyById);

Router.get("/api/property-delete/:id", sellerController.propertyDelete);

Router.get("/api/get-all-seller", sellerController.getAllSeller);

Router.get(
  "/api/get-requested-properties/:email",
  sellerController.getRequestedProperties
);
Router.get(
  "/api/requested-user-Property-details/:id",
  sellerController.getRequestedUserPopertyDetail
);

module.exports = Router;
