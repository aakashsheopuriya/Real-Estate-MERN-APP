const Property = require("../models/property.model");
const User = require("../models/user.model");
const { ObjectId } = require("mongodb");
const requestedProperties = require("../models/request.property.model");

const createProperty = async (req, res) => {
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
  if (isInserted) {
    res.send({
      message: "Property Created Successfully",
      status: true,
      property: isInserted,
    });
  } else {
    res.send({ message: "something went wrong !", status: false });
  }
};

const propertyImageUpload = async (req, res) => {
  const propertyUpdate = await Property.updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: { image: req.file.path } }
  );
  if (propertyUpdate) {
    res.send({
      message: "Updated Successfully, Redirecting to my properties page",
      status: 1,
      image: req.file.path,
    });
  } else {
    res.send({ message: "Failed, try again later", status: 0 });
  }
};

const propertyUpdateRemoveServices = async (req, res) => {
  const propertyUpdate = await Property.updateOne(
    { _id: new ObjectId(req.params.id) },
    {
      $unset: {
        services: "",
      },
    }
  );
  if (propertyUpdate) {
    res.send({
      message: "removed previous services",
      status: true,
    });
  } else {
    res.send({ message: "failed", status: false });
  }
};

const propertyUpdate = async (req, res) => {
  const { title, description, contact, address, price, services } = req.body;

  await Property.updateOne(
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
  if (propertyUpdate) {
    res.send({
      message: "Propert details updated successfully",
      status: true,
    });
  } else {
    res.send({ message: "image uploaded failed", status: false });
  }
};

const getPropertyById = async (req, res) => {
  const userId = req.params.id;
  const isPropertyFind = await Property.find({ sellerId: userId });
  res.send({
    message: "fetched specific property successfully",
    status: true,
    property: isPropertyFind,
  });
};

const propertyDelete = async (req, res) => {
  const id = req.params.id;
  const isPropertyFind = await Property.find({ _id: new ObjectId(id) });
  if (isPropertyFind) {
    const isPropertyDelete = await Property.deleteOne({
      _id: new ObjectId(id),
    });
    if (isPropertyDelete) {
      res.send({
        message: "delete property successfully",
        status: true,
      });
    }
  }
};
const getAllSeller = async (req, res) => {
  const isFind = await User.find({ role: "seller" });
  if (isFind) {
    res.send({
      message: "fetched All seller",
      status: true,
      seller: isFind,
    });
  } else {
    res.send({ message: "failed", status: false });
  }
};

const getRequestedProperties = async (req, res) => {
  const email = req.params.email;
  const isPropertyFind = await requestedProperties.find({
    sellerId: email,
  });
  if (isPropertyFind) {
    res.send({
      message: "fetched All requested properties",
      status: true,
      property: isPropertyFind,
    });
  } else {
    res.send({ message: "failed", status: false });
  }
};

const getRequestedUserPopertyDetail = async (req, res) => {
  const id = req.params.id;
  const isPropertyFind = await requestedProperties.find({
    _id: new ObjectId(id),
  });
  if (isPropertyFind) {
    res.send({
      message: "fetched All requested properties",
      status: true,
      property: isPropertyFind,
    });
  } else {
    res.send({ message: "failed", status: false });
  }
};
module.exports = {
  createProperty,
  propertyImageUpload,
  propertyUpdate,
  getPropertyById,
  propertyDelete,
  getAllSeller,
  getRequestedProperties,
  getRequestedUserPopertyDetail,
  propertyUpdateRemoveServices,
};
