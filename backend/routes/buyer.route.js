const express = require("express");
const Router = express.Router();
const { ObjectId } = require("mongodb");
const sellerController = require("../controllers/seller.controller");
const upload = require("../helper/multer");
const Property = require("../models/property.model");
const Wishlist = require("../models/wishlist.property.model");
const RequestProperty = require("../models/request.property.model");

Router.post(
  "/api/upload/:id",
  upload.single("image"),
  sellerController.propertyImageUpload
);

Router.get("/api/get-property/:id", sellerController.getPropertyById);

Router.get("/api/get-all-property", async (req, res) => {
  const { limit, offset } = req.params;
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


Router.post("/api/add-to-request", async (req, res) => {
  const { propertyId, userId, username,sellerId } = req.body;
  const insertToRequestProperty = new RequestProperty({
    username: username,
    propertyId: propertyId,
    buyerId: userId,
    status: "Requested",
    sellerId
  });
  const isInserted = await insertToRequestProperty.save();
  if (isInserted) {
    res.send({
      message: "Property Requested successfully, Please wait for the status",
      status: true,
      requestedProperty: isInserted,
    });
  } else {
    res.send({ message: "something went wrong !", status: false });
  }
});

Router.get("/api/get-wishlist/:email", async (req, res) => {
  const email = req.params.email;
  console.log("email in get-wishlist api", email);
  const wishlistProperty = await Wishlist.find();
  console.log(`wishlist property for buyer ${email} are ${wishlistProperty}`);
  let totalProperty = [];
  if (wishlistProperty.length > 0) {
    for (let i in wishlistProperty) {
      const propertyDetails = await Property.find({
        _id: new ObjectId(wishlistProperty[i].propertyId),
      });
      propertyDetails[0];
      const total = await Property.find();
      console.log("total number of property", total);

      totalProperty.push(propertyDetails[0]);
    }
    res.send({
      message: "fetched property successfully",
      status: true,
      property: totalProperty,
    });
  }
  return;
});


Router.get("/api/get-requested-property-status/:email/:propertyId", async (req, res) => {
  const {email,propertyId} = req.params;
  console.log("email in get-requested-property-status api", email , propertyId);
  const requestProperty = await RequestProperty.find({buyerId:email,propertyId});
  console.log(`wishlist property for buyer ${email} are ${requestProperty}`);
  if (requestProperty.length > 0) {
    res.send({
      message: "fetched property successfully",
      status: true,
      property: requestProperty,
    });
  }
  return;
});


module.exports = Router;
