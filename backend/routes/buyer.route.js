const express = require("express");
const Router = express.Router();
const sellerController = require("../controllers/seller.controller");
const upload = require("../helper/multer");
const Property = require("../models/property.model");
const Wishlist = require("../models/wishlist.property.model");

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

Router.post("/api/add-to-wishlist", async (req, res) => {
  const { propertyId, propertyStatus, userId, username } = req.body;
  const insertToWishlist = new Wishlist({
    username: username,
    propertyId: propertyId,
    buyerId: userId,
    status: propertyStatus,
  });
  const isInserted = await insertToWishlist.save();
  if (isInserted) {
    res.send({
      message: "Property Added to Wishlist",
      status: true,
      wishlist: isInserted,
    });
  } else {
    res.send({ message: "something went wrong !", status: false });
  }
});

module.exports = Router;
